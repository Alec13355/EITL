---
title: I Gave My Repo Its Own Local AI Code Reviewer (No Cloud, No Per-Token Bill)
date: "2026-08-11T23:45:00.000Z"
description: I built a self-hosted GitHub Actions runner that reviews every PR with a local LLM running on my Mac, no API keys, no per-token bill, and it took breaking it four separate ways before it actually worked.
category: AI & Machine Learning
---

I wrote about [Foundry Local](/blog/foundry-local) back in February: the pitch was "run real AI without paying the cloud tax." This is the follow-up where I actually put that to work on something I use every day: code review.

GitHub Copilot's code review is good, I [said as much a while back](/blog/ai-code-reviewer). But it's still a cloud call, still a subscription line item, and still something happening on someone else's infrastructure. I wanted to know: could I get a real LLM commenting on my pull requests using hardware I already own, with the model never leaving my machine? So I built [Self-Hosted-Code-Review-Agent](https://github.com/Alec13355/Self-Hosted-Code-Review-Agent), a self-hosted GitHub Actions runner that hits a local model through Foundry Local and posts a real review, summary plus inline comments, back on the PR.

Short version: it works. Longer version: getting it to actually work meant breaking it in four distinct ways first, and the most interesting part of this post is probably the breaking, not the building.

---

## The Part That's Actually Scary

Before any of the fun stuff: self-hosted runners plus public repos is a genuinely dangerous combination, and I don't think that gets said often enough outside of security circles. A self-hosted runner is just a process on your machine that polls GitHub for work and executes whatever a workflow tells it to. If anyone can open a PR against your repo, and your workflow checks out and runs that PR's code, you've handed a stranger a shell on your computer. Microsoft's own docs for this exact pattern say it outright: self-hosted runners are only recommended for private repos, full stop.

My repo is public. So the design constraint that shaped everything else was: **this job never executes anything the PR supplies.** It reads the diff as text through the GitHub API and posts a comment. That's it. No checkout of the PR branch for any executable purpose, no `npm install`, no build step. A few other things fell out of that same instinct:

- `pull_request_target` instead of `pull_request`, so the workflow definition that runs is always the trusted version from `main`: a PR can't rewrite the workflow that reviews it
- The token gets `pull-requests: write` and nothing else: it can't push, merge, or approve
- The review is hardcoded to post as a comment, never as an approval
- The runner is ephemeral: it registers, runs exactly one job, deregisters, and the container dies, so nothing persists between PRs
- GitHub's built-in setting requiring approval before a first-time contributor's workflow runs at all, which turned out to already be on by default

I wrote all of this up properly in [the repo's SECURITY.md](https://github.com/Alec13355/Self-Hosted-Code-Review-Agent/blob/main/docs/SECURITY.md) if you want the full threat model instead of the highlight reel.

## The Architecture

Two pieces that never touch each other directly:

```
PR pushed --> GitHub queues a job --> ephemeral runner (registers, runs one job, dies)
                                            |
                                            v  reads diff, posts review
                                    Foundry Local (long-lived, holds the model warm)
```

The runner is disposable and dumb: Docker container, git, `gh`, python, nothing else. The inference side is the opposite: it needs to stay warm, because reloading a 7B model from disk on every PR push would make this unusable. Today that's Foundry Local running natively on my Mac, talking to the runner container over `host.docker.internal`. Nothing about that split is Mac-specific, though: the runner is just a container that polls GitHub, so the same image runs unmodified as an Azure Container Apps Job (I've got the KEDA-based, scale-to-zero version documented and ready), or on any on-prem box that can run Docker and reach GitHub outbound. Swap the `FOUNDRY_LOCAL_ENDPOINT` and the rest of the pipeline doesn't know the difference.

## Where It Actually Broke

This is the part I want to actually be honest about, because "I built an AI code reviewer" is a much less interesting sentence than "here's everything that was wrong the first time I ran it."

**Foundry Local doesn't really run on Linux yet.** I'd planned to containerize the inference side for the Azure path. The install script a bunch of blog posts reference (`curl -fsSL https://aka.ms/foundry-local-install | bash`) doesn't serve an installer. It redirects to a Bing search results page, which then gets piped into bash and fails immediately. Not "broken," just... never existed the way it's described. Microsoft's own CLI docs only cover Windows and macOS right now. The Azure path uses a small Windows VM for inference instead.

**Ubuntu 24.04 blocks plain `pip install`.** PEP 668 ("externally managed environment") kills a bare `pip install` inside the runner container. Ephemeral container, so `--break-system-packages` is a fine trade, but it's a one-line fix I only found by actually running the workflow and reading the failure.

**The model name isn't the model name.** `foundry model list` gives you a friendly alias like `qwen2.5-coder-7b`. Hit the OpenAI-compatible endpoint with that alias directly and you get a 400. It wants the exact loaded model ID (`qwen2.5-coder-7b-instruct-generic-gpu:4`), which you only get from `foundry service list`. Also: it's `foundry service`, not `foundry server`, on the version I've got installed, despite that being what the current Microsoft docs show. And the port is assigned dynamically, not fixed at `:5272` like every example implies.

**Empty strings aren't unset variables.** GitHub Actions' `env:` block sets a key to `""` when the backing repo variable doesn't exist. It doesn't omit the key. `os.environ.get("MAX_DIFF_CHARS", "60000")` only falls back on an *absent* key, so `int("")` blew up the very first real run. Small bug, real crash, only visible once a real workflow actually executed.

**And then the fun one:** the very first PR I opened (the one that added the workflow file itself) never triggered anything. Zero runs, no errors, nothing. Turns out `pull_request_target` only ever uses the workflow definition that already exists on the default branch, which is the entire point of the security model, but it means the PR that introduces the workflow can't be the PR that tests it. Had to merge it to `main` first, then open a second PR to get an actual live run.

## Watching It Actually Work

Once all of that was sorted, [PR #2](https://github.com/Alec13355/Self-Hosted-Code-Review-Agent/pull/2) was the first real end-to-end test: an intentionally bad example file with a string-concatenated SQL query. The runner picked up the job, called the local model, and posted:

> 🤖 Automated review (local LLM)
> This example module contains a potential SQL injection vulnerability.
> 🔴 high — `examples/user_lookup.py` line 8

Plus an inline comment: *"SQL queries should use parameterized statements to prevent SQL injection."*

It caught the actual bug. I'll also be straight about the miss: it attached the comment to `conn.commit()` on line 8 instead of the query concatenation a couple lines up. Right diagnosis, slightly loose pointer. That's a prompt-tuning problem, not an architecture problem, and it's the kind of thing you only find by shipping the thing against a real PR instead of admiring the code.

## What's Next

The whole point of the runner/inference split is that "local" doesn't have to mean "stuck on my laptop." The same container that's polling GitHub from my Mac right now is a straight swap into an Azure Container Apps Job (scale-to-zero, KEDA watching the workflow queue, paying nothing while no PR is in flight) or onto a box sitting in a closet on-prem if that's more your speed. I've got the Azure path documented in the repo already; I just haven't pulled the trigger on standing it up yet.

For now it's reviewing its own PRs on my Mac, for free, without a single token leaving the building. Repo's here if you want to point it at something: [github.com/Alec13355/Self-Hosted-Code-Review-Agent](https://github.com/Alec13355/Self-Hosted-Code-Review-Agent).

Building this with Claude Code was its own small experiment in letting an agent drive. It's the same tool from [my last post](/blog/claude-code-beats-copilot-cli), and it's the reason the four bugs above got caught and fixed the same afternoon instead of discovered one at a time over the next month.

Running anything local-LLM in your own pipeline? DM me on [LinkedIn](https://www.linkedin.com/in/alec13355/). I want to hear what broke for you.
