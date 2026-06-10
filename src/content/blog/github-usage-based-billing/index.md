---
title: "GitHub's New Usage-Based Billing — And Why It Stung Less Than I Expected"
date: "2026-06-09T15:32:10.000Z"
description: GitHub Copilot moved to usage-based billing for AI requests. Here's what changed, how it reshaped my day-to-day workflow, and why the pooled-credit model might actually be a win for big orgs.
category: AI & Machine Learning
---

I'll admit upfront that I lean pro-Microsoft. If you've read this blog, listened to the podcast, sat through one of my Azure Cloud talks, or caught an episode of Azure Barista, that's not exactly a secret. But I also don't pull punches — not long ago I wrote that [Claude Code beats Copilot CLI](/blog/claude-code-beats-copilot-cli) right out of the box, and I stand by that.

So take it as a real signal when I say this: GitHub's move to usage-based billing for Copilot stung a lot less than I thought it would.

---

## What Actually Changed

If you haven't been following along, here's the short version. GitHub Copilot used to feel like an all-you-can-eat buffet — one flat monthly price, and use as much chat and agent functionality as you wanted. That's gone. Every AI request now draws from a pool of "premium requests."

Not all models cost the same out of that pool. Smaller, cheaper models might consume a fraction of a premium request — or none at all — while the bigger frontier models can burn through several in a single response. Each plan comes with a monthly allowance of premium requests baked in, and once you burn through it, either you or your organization is paying for the overage.

In other words, GitHub took something that used to feel infinite and put a meter on it. That's the part everyone online is mad about. It's also, weirdly, the part that ended up changing my habits for the better.

---

## What Changed for My Day-to-Day

I have to admit, I was one of those "just use Claude's latest Sonnet model for everything" people. But with the rising cost of doing that on every request, I've become an "auto" user instead.

What "auto" does is let GitHub pick whichever model it thinks is the best fit for the job. Before the recent wave of Codex and GPT models, that meant rolling the dice — if it didn't land on a Claude model, I'd usually end up frustrated with the response quality. Now? I'm honestly shocked at how well the GPT mini models hold up for a lot of day-to-day tasks.

---

## The Results

My first week back, I burned through roughly 200 premium requests — and that was just from living in my terminal all week. The second week, I got a lot more deliberate about my prompts instead of repeatedly pulling the hypothetical slot machine lever and hoping for a good result. Here's what I changed.

---

## The Habits I Had to Break

### Stop Prompting Blind

I used to just tell Copilot to "do something" without giving it any sense of where the relevant files actually lived. That meant burning tokens just having it scan my repo to find the right file before it could even start working.

Now I give it a relative path to the file I think is the right starting point. That lets it read that one file first and discover outward from there only if it actually needs to. This change alone has cut my credit usage dramatically.

The same applies to pattern matching. In most of the codebases I work in, I already have a rough idea where a similar pattern lives. Tossing a vague prompt at Copilot and making it scan the entire repo to find that pattern was always a waste of time — now it's a waste of credits, too.

### Stop Reaching for the Ferrari Every Time

Another anti-pattern: assuming I always knew the "best" model for the job. I'd default to the latest Claude Sonnet for everything, and it would work great — but it also meant I stopped paying attention to what other models were capable of. With costs changing the way they have, defaulting to the Ferrari for every trip to the grocery store just isn't sustainable anymore unless you want to burn a lot of money.

### Stop Over-Planning Simple Work

I was also overusing plan-then-act workflows. If a change isn't complex, just let the AI do it. There's no reason to pay for a bunch of extra planning output when your prompt is already well-scoped and you already understand what needs to happen.

Plan-and-execute modes absolutely have their place for genuinely complex changes. But in general, if you find yourself reaching for "plan" mode on every request, it's worth asking whether your requirements were actually too vague for the size of the change you're asking for. Tools that force you to clarify your ask up front — something like a "grill me" style prompt that interrogates your requirements before any code gets written — can fix that without burning a planning pass on every request.

### Stop Hauling Around a Bloated Context

The last one is context overload — overly verbose `copilot-instructions.md` / `agent.md` files, and reaching for an MCP server for everything.

Agents in Copilot retain some memory within a session, but that's wiped the moment you start a new one. Every new session means re-reading your instructions and re-discovering whatever MCP tools are configured, and that's a fixed credit cost before any actual work gets done. Models have gotten good enough that we don't need sprawling instruction files describing our entire project structure anymore. I now favor lightweight CLI tools over MCP servers where I can, and for most things I'm aiming for K.I.S.S. — Keep It Simple, Stupid.

---

## The Upside Nobody's Talking About

A lot of people on the internet are mad the free lunch is over. Anyone paying attention to the industry could have told you this was coming — model providers are all operating at a loss, and at some point that bill comes due.

But there's a real upside to this shift that's getting drowned out by the complaining. Most organizations adopting AI tooling buy seats for everyone, with wildly varying levels of actual adoption. That means you're paying full price for engineers who never touch the tooling, while your power users are the ones actually hitting their limits.

Under the new model, credits are pooled at the organization level. If I've got engineers who want nothing to do with AI tooling, their unused capacity can go toward the engineers who are actually using it. That's potentially a lot more bang for your buck at the org level. You can still set user- and department-level limits if you want guardrails, but it gets you a lot closer to actually using what you're paying for, instead of leaving it on the table.

---

## Conclusion

I liked being able to drive my hypothetical Ferrari everywhere. But in reality, that's just not practical — or necessary — for most of my day-to-day work. Turns out the skateboard gets me there just fine most of the time, and I've got more left in the tank for when I actually need the Ferrari.

What's your take on usage-based billing? Drop me a note on [LinkedIn](https://www.linkedin.com/in/alec13355/).
