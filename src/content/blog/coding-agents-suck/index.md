---
title: Coding Agents Suck
date: "2025-12-07T06:46:59.933Z"
description: Until they suddenly don't. A reflection on how coding agents went from frustrating to genuinely useful, told through my Advent of Code journey.
---

(Until they suddenly don't.)

If you hang around engineers long enough, you'll hear some version of the title muttered under someone's breath. Usually it comes from the senior folks who've lived through enough "revolutionary" tools to know they all end the same way: a rewrite, a migration, and a wiki page nobody updates. Fatigue is earned.

Still, let's be honest—coding agents aren't fading into the sunset. And I've got an unusual test case that convinced me: Advent of Code.

## Last Year: Pushing a Boulder Uphill

Last year I made myself a promise: solve each Advent of Code problem manually, then call in AI only when properly stuck. I was using Cursor and a handful of their agents. The plan was simple—warm up on part one, wrestle with part two, and let AI shove me across the finish line when I needed a kick.

This was optimistic.

I ran head-first into three problems:
1. Context windows were tiny. I couldn't fit the whole problem, my code, and input data. The model was basically guessing.
2. Generated code was a mess. Slow, unoptimized, and hard to debug.
3. Prompts had to be so compact they were borderline haiku.

If you've ever written code without really understanding the ticket, you know how this goes. You get code that technically "runs," but you can't trust it, can't reason about it, and definitely can't optimize it. That was me and the agent—two people squinting at a problem neither of us had the full picture of.

By December 6th, I tapped out. AI hadn't helped me ship faster; it had just made my confusion multiline.

## This Year: Everything Changed

Yes, yes, Advent of Code says "don't use AI."
Are you my parent? No? Then I'm moving on.

This year I did something different. I wrote a first pass for days 1–3. If the code didn't work—assuming the bug wasn't something embarrassing like resetting a counter inside a loop—I dropped the full problem, sample input, and a short explanation into Claude Code.

And the experience was honestly jarring.

For the first time, I could hand it the entire problem: prompt, explanation, sample data—everything. The agent looked at my repo, figured out the language, picked the right file, walked through the reasoning, and produced runnable code.

It was about 50% correct on the first try.
As in: run, submit, done.

That felt borderline illegal.

The other 50%? That was on me. Either I forced the model to work around my half-baked solution, or I didn't give it enough context to do its job. If I wiped my code and said "solve it clean," it usually did.

## The Real Shift: Driver vs. Navigator

The surprising part wasn't that AI wrote working code. It was that I understood the code. It was clean. Predictable. Idiomatic. And then I, human that I am, inevitably made it worse.

Trying to shoehorn AI's solution into my half-finished version felt like when a kid asks you to help finish their LEGO set but refuses to let you undo the crooked pieces they placed earlier. The model will contort itself to preserve your mistakes.

And that's when it clicked: AI isn't the junior developer in this pairing session anymore.
It's closer to the person who just wants to finish the ticket and go home, but keeps getting slowed down because you won't let them refactor the weird stuff you wrote at midnight.

The tool landscape changed while we weren't looking. The "AI is just a toy" narrative already feels dated. Whatever you think of the hype cycle, coding agents are becoming another tool in the standard kit—and eventually, the question won't be should you use them, but why aren't you?
