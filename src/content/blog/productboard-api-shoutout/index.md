---
title: "A Shoutout to productboard and Alex Degregori for Amazing API Support"
date: "2026-07-17T14:30:00.000Z"
description: A quick thank-you to productboard and support engineer Alex Degregori for clearing up a confusing corner of the v2 API — the line between a "user" and a "customer" — while I was wiring AI-flagged negative feedback into productboard as notes.
category: AI & Machine Learning
---

Not every post here is a deep technical dive or a hot take on the AI industry. Sometimes it's just a genuine thank-you, and this is one of those times.

---

## What I Was Building

I've been working on a piece of our AI feedback loop: when our system detects that a user gave us negative feedback, I wanted it to automatically create a note in productboard so the product team sees it without anyone having to manually triage it. The important part wasn't just "make a note" — I wanted that note's customer field linked to the actual person who gave the feedback, using their email, so it's tied to a real account instead of floating in as an anonymous blob of text.

---

## Where I Got Stuck

I went digging through productboard's v2 API swagger docs looking for how to reference a customer on a note. What I found instead was a "user" entity, and my own test user showed up as a "member," not a "customer." There was no clear reference for customers anywhere in the docs, and I couldn't tell if I needed a separate customer object, if "member" and "customer" were the same thing under the hood, or if I was just looking in the wrong place entirely.

To make it trickier, I didn't have admin access to our productboard instance. I didn't want to start creating test notes and guessing my way through the data model, only to end up polluting real data with the wrong links. I wanted a clear answer before I touched anything.

---

## The Fix

I reached out to productboard support, and Alex Degregori got back to me and cleared it up fast: in productboard's model, an entity of type "user" *is* the customer. There's no separate customer object to hunt for in the v2 API — you link a note to the user entity, and that's what shows up as the customer. Once I understood that, wiring up note creation with the customer link was straightforward.

---

## Why I'm Writing This

I didn't have to file a support ticket into a void and wait days for a canned response. I got a clear, correct, and fast answer from someone who clearly knew the API cold, and it kept me from either guessing my way into messy data or stalling the whole feature. That's not something I take for granted.

All I did to get their attention was tag the company in a LinkedIn post — no escalation, no account rep, nothing fancy. Any company that responds to that with genuinely helpful, technical support deserves a public shoutout. So: thanks, productboard, and thanks, Alex — glad I got unstuck so quickly.

Got a support story of your own, good or bad? I'd love to hear it on [LinkedIn](https://www.linkedin.com/in/alec13355/).
