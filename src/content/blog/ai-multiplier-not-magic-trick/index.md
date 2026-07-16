---
title: "AI Is a Multiplier, Not a Magic Trick"
date: "2026-07-16T03:05:49.413Z"
description: AI multiplies whatever you were already doing. If you were shipping careful, well-structured code, you now ship more of it. Here's what that looks like across four real projects.
category: AI & Machine Learning
---

A lot of people will tell you AI is a fad, or that everything it produces is slop.

They're half right. AI can absolutely produce slop. But that's not because it's AI. It's because AI multiplies whatever you were already doing. If you were shipping careful, well-structured code, you now ship more of it. If you were shipping garbage, congratulations — you now have a garbage firehose. The tool didn't change your standards. It just removed the friction that used to slow you down before you could do damage.

What gets lost in that argument is the part I actually care about: the time and effort it gives back. Not "AI wrote my app." More like — the thing that used to sit in my backlog for six months because it would take three weekends I didn't have now takes an evening. That's the real story, and nobody talks about it enough.

Since my last <a href="https://www.linkedin.com/company/engineer-in-the-loop/">Engineer In The Loop</a> episode, I've shipped four projects. They're worth walking through together, because they land at very different points on the "how much AI is in this thing" spectrum — and that's the point.

---

## Dahlia Dough

**<a href="https://dahliadough.com">dahliadough.com</a>**

My wife is a florist. Like most small business owners, her workflow lived in a mix of text messages, a notebook, and her memory. Orders, timelines, what's due when — all of it held together by sheer will.

So I built her a workflow management site.

Here's what's interesting about it: this is not an "AI app." It's a real application with real data and real business rules. The AI shows up in exactly one place — OCR on supplier invoices. She photographs an invoice, the model pulls the line items out of it, and those numbers flow into planning, profit, and reconciliation. That's it. That's the AI.

But it's the difference between the tool getting used and the tool sitting there. Nobody hand-keys an invoice at 9pm after a full day of arrangements, which means without OCR the invoices don't get entered, which means there's no cost data, which means there's no profit picture at all. Take the data entry out and suddenly you know what a wedding actually cost you, whether what you were charged matches what you ordered, and what to price the next one at.

One AI function. It unlocks the entire rest of the app.

The other 95% of the app is plain software engineering. That ratio is normal. That ratio is *good*. The most useful AI in most products is one or two functions doing something specific, sitting inside an otherwise conventional app.

The bigger win was in the building. This is the kind of project that never gets finished, because "helpful side project for my wife" loses every scheduling fight against a real job and a kid. AI agents collapsed the timeline enough that it actually shipped.

---

## Project X — Contract Management

**<a href="https://proud-moss-033883710.7.azurestaticapps.net/">Live demo</a>**

This one's the ambitious one, and it's still in progress.

The goal is full contract lifecycle management: redlining, renewals, the whole set of things a business actually needs to keep its agreements from turning into a liability. Not a document store with a search box.

Notice it starts the same way Dahlia Dough does — OCR. Contracts show up as scans and PDFs, and step one is always getting the text out. But this is where the two projects part company. Dahlia Dough reads a document and hands the numbers to conventional software. Project X reads a document and then has to *understand* it: evaluate the terms, compare them against what you'd expect, and pull the user's attention to the parts that look wrong. The clause that quietly auto-renews for three more years. The indemnity language that doesn't match the last four contracts you signed. The thing you'd catch on a careful read and miss on the fifth contract of the day.

That's not a regex problem. This is the far end of the spectrum, where the model isn't a convenience feature — it's the reason the product can exist at all.

But "AI-heavy" still doesn't mean "AI decides." The tool flags. The human rules. A contract tool that quietly hallucinates a clause is worse than no tool, so most of the engineering effort goes into the unglamorous scaffolding: grounding every flag in the actual text, showing exactly where it came from, and never letting the model be the last word on anything that matters. The model is the engine. Everything else is the brakes.

---

## Offline Assist

**<a href="https://github.com/Alec13355/OfflineAssist">GitHub</a> · <a href="https://marketplace.visualstudio.com/items?itemName=AlecHarrison.offline-assist">VS Code Marketplace</a>**

A VS Code extension that runs a Copilot-style assistant entirely on your machine. No code leaving your laptop. And it's backwards compatible with GitHub Copilot, so you're not choosing between the two.

This one exists because of a problem I kept running into with clients and community folks: plenty of engineers are in environments where sending source code to a hosted model is a non-starter. Regulated industries, air-gapped setups, or just an employer with a policy. The answer they were given was usually "then you don't get AI assistance." That's a bad answer.

So the extension is the fix. Local models, your machine, your code stays put.

It's on the Marketplace and has thousands of installs, which tells me the problem is more common than the discourse suggests. If you're in one of those environments, go grab it.

---

## AI Apply

**<a href="https://github.com/Alec13355/AIApply">GitHub</a>**

This one was pure fun, and it ends with me shutting it down.

The idea was an agent that could handle job applications end to end. Technically, it got further than I expected it to. That was the interesting part — right up until it wasn't.

Because the moment it started working, the question stopped being *can I* and became *should I*. Automating applications against a site whose terms you're agreeing to, while handing that site your real name and email, isn't a clever hack. It's a signed confession. And past the self-own, it's just not something I want to be doing. Every application system on the other end is trying to hold a signal-to-noise ratio that works for everyone, and I'd be the noise.

So I stopped. The repo's still up, because I think the honest version of this story — I built it, it worked, and I decided not to use it — is more useful than pretending I never tried.

Knowing when *not* to ship something is a skill too. AI makes it cheap to build things. It does not make it wise to build things.

---

## The Spectrum Is the Point

Look at those four projects together:

| Project | Where the AI actually sits |
|---|---|
| Dahlia Dough | One function — invoice OCR — feeding an otherwise conventional app |
| Project X | OCR plus evaluation. Load-bearing, wrapped in heavy guardrails |
| Offline Assist | The AI *is* the product, but as infrastructure, not a feature |
| AI Apply | AI as the whole engine — and a good reason to walk away |

None of these are "an AI app" in the way the term usually gets thrown around. They're software that solves a problem, and AI shows up wherever it's the right tool and stays out of the way where it isn't.

That's what I'd push back on hardest in the fad argument. The question was never "is AI good." The question is "where in this system does a model actually earn its place." Answer that honestly and you get real products. Skip it and you get a chatbot bolted onto a CRUD app and a press release.

All four of these were built with agents from <a href="https://www.anthropic.com">Anthropic</a> and <a href="https://www.linkedin.com/company/github/">GitHub</a>. Not because the agents wrote the code for me — I read every line, and I threw away plenty — but because they took the friction out of the parts that used to make side projects die in the backlog.

The slop was always possible. So was this.

---

*Go try <a href="https://marketplace.visualstudio.com/items?itemName=AlecHarrison.offline-assist">Offline Assist</a> if you're in an environment where your code can't leave the building. And if you want more of this, catch <a href="https://www.linkedin.com/company/engineer-in-the-loop/">Engineer In The Loop</a>.*
