---
title: "GitHub Copilot Is Changing: What Every Developer Needs to Know"
date: "2026-05-24T04:08:07.853Z"
description: GitHub Copilot has come a long way from its origins as an inline autocomplete tool. It now runs complex, multi-step agentic workflows, and GitHub's pricing is finally being updated to reflect that reality. Here's what's actually changing and why it matters.
---

GitHub Copilot has come a long way from its origins as an inline autocomplete tool. It now runs complex, multi-step agentic workflows, and GitHub's pricing is finally being updated to reflect that reality. Here's what's actually changing and why it matters.

---

## Flat-Rate Billing Is Going Away

Starting June 1, 2026, all GitHub Copilot plans move to usage-based billing. Instead of counting premium requests, every plan will include a monthly allotment of GitHub AI Credits, with paid plans having the option to purchase more. Usage is calculated based on token consumption — input, output, and cached — at the published API rate for whichever model you're running.

One AI Credit equals $0.01. Copilot Pro's $10/month buys 1,000 credits; Pro+ at $39 gets 3,900. The subscription prices aren't going up — but you'll get a lot less runway on heavy usage than you did before.

---

## What Still Doesn't Cost Anything

Code completions and Next Edit Suggestions remain free across all plans. If you use Copilot primarily for inline suggestions as you type, your bill under the new model will look almost identical to today's. Everything else draws from your credits.

---

## Why GitHub Is Making This Change

GitHub Copilot isn't the same product it was a year ago — it now powers far more complex, agentic workflows that consume significantly more compute. The shift to usage-based billing is GitHub's attempt to align pricing with actual costs and keep the platform sustainable.

The numbers tell the story. One developer found their April 2026 usage, projected at $39.07 under the old premium request model, came out to $902.72 in the preview billing tool. The old system didn't distinguish between a quick one-line fix and a two-hour autonomous refactor. This one does.

---

## Code Review Is Now Billed Twice

This one catches people off guard. Starting June 1, each Copilot code review will be billed in two ways: as AI Credits under the usage-based model, and as GitHub Actions minutes, since the code review agent runs on GitHub-hosted runners.

Until then, code reviews continue drawing from your existing premium request allowance without consuming Actions minutes. If your team reviews PRs with Copilot regularly, check your Actions spending limits before the switch.

---

## New Sign-Ups Are on Hold

GitHub also quietly paused new individual plan subscriptions. Sign-ups for Copilot Pro, Pro+, and Student plans are paused, and usage limits for individual plans are being tightened — to protect the experience for existing customers, according to GitHub.

The reason? Long-running, parallelized agentic workflows have stressed both infrastructure and pricing, to the point where a handful of requests can cost more than the price of the plan itself.

---

## Some Models Have Been Dropped

GitHub trimmed its model roster recently. All Gemini models, along with GPT-5.2 Codex and GPT-5.4 nano, have been removed from Copilot Chat on the web. OpenAI and Claude models remain available across plans.

On the enterprise side, GPT-5.3-Codex became the base model for Copilot Business and Enterprise organizations in May 2026, chosen for its high code survival rate among enterprise customers.

---

## What To Do Before June 1

- **Preview your costs.** GitHub has a preview billing tool that shows how the transition to usage-based billing will affect you before it kicks in.
- **Check your Actions budget.** If Copilot code review is part of your workflow, make sure your spending limits can absorb the new charges.
- **Be selective with agentic tasks.** GitHub recommends using plan mode in VS Code or the Copilot CLI to improve efficiency, and being careful with parallel workflows — tools like `/fleet` will consume tokens quickly if you're running close to your limits.

Have thoughts on the new billing model? Drop me a DM on [LinkedIn](https://www.linkedin.com/in/alec13355/).
