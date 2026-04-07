---
title: Claude Code Beats Copilot CLI
date: "2026-04-06T06:13:37.550Z"
description: I switched from Gemini to Claude Code and gave it a real test against GitHub Copilot CLI on a brownfield .NET project. Here's what happened.
---

I've been using Claude Code more and more lately. As a Microsoft (Azure) and Apple fan, I used to think the discourse around it was the same as the old Mac vs. PC debates — "I'm a Mac and I'm a PC" has basically become "I'm Copilot and I'm Claude." Turns out I couldn't have been more wrong.

On a whim, I decided to cancel my Gemini subscription (Google, if you're reading this — HMU for a sponsorship so I can use your products again) in favor of a Claude Code subscription. Both were $20, so I was literally just moving money from one bucket to another. I do this occasionally to see where each product stands.

---

## My Current Toolbox

It's worth calling out what my setup looks like since I'll be talking about tooling — and the ridiculous amount of cash I might be spending on it all. Right now I'm running Cursor, Claude Code, Copilot, and ChatGPT.

I'll get ahead of it: no, I don't think ChatGPT is amazing. But I got my wife hooked on AI and she loves the mobile app, so that's staying for now — maybe it'll eventually move to Claude or back to Gemini (again, Google, let's talk). Copilot is the Microsoft tool I actively try to use since my day job client has licenses for it, so I lean into it there. Cursor is great for smaller projects. Claude Code is the new addition.

---

## Brownfield Development

On a couple of greenfield projects I've experimented with spec-driven development using Spec Kit, but it's hard to establish standards on a massive existing codebase when you're still getting up to speed. In this case I was using GitHub Copilot CLI to implement features on a large .NET app — and that's where things went sideways.

Overall, I'd give GitHub Copilot an **8/10**. It consistently got me where I needed to go, though it often required extra prompting. I had it implement 80–90% of a full epic with minimal guidance and it held up well. Copilot feels like a solid Swiss Army knife — indispensable when you're in a pinch, but you quickly discover what was trimmed for form factor and start learning its quirks.

I ran into one of those quirks head-on. I had an enum defined as 1–5, and my app was setting a date based on its value. No matter how many times I re-prompted, Copilot insisted the code was fine. It started to feel like being gaslit in a bad relationship. "The code is 100% working as it should." "The code is fine." I never got told I was dumb outright, but that's exactly how I felt. So I started debugging manually, asked Copilot to help me add some logs, got frustrated, and decided to give Claude a shot.

I was skeptical going in. How was a new agent going to help me untangle a bug with almost no context, when Copilot had just built the whole epic? But it actually did exceptionally well. I told it I was logging because something was off and pointed it at the file I suspected. Unlike Copilot, it walked me through the process — adding logs step by step and asking what the console output was. Turned out I had a data integrity issue in my dev environment: the enum value in the database was set to 0, which was technically impossible per the schema. Claude laid out a few options — default the 0 to a valid value, or update the database directly — and then handed me the script to do it.

Copilot wasn't wrong, technically. Its code was fine. But it completely fell apart when it came to figuring out why things weren't working in practice, and I was left feeling like the problem was me. Claude jumped in alongside me and it genuinely felt like we debugged it together.

---

## The Verdict

So do I think Copilot is trash? No. Up until this edge case I genuinely enjoyed using it. But I got a clear look at the gap between the current best and the current second-best. I'll keep everyone posted on how using both shakes out.

What's your go-to AI agent? Drop me a DM on [LinkedIn](https://www.linkedin.com/in/alec13355/).
