---
title: The Brittle Web: Why Everything Broke (and Why It Didn’t Have To)
subtitle: The internet isn’t fragile — we just built it that way.
---

### 💥 The Brittle Web: Why Everything Broke (and Why It Didn’t Have To)

Every time the internet hiccups, headlines make it sound like the web itself is collapsing.  
But here’s the uncomfortable truth — the web isn’t brittle by design.  
It’s brittle because **we cut corners, over-optimized for cost, and treated resilience as optional.**

---

### 🧨 Why Everything Went Down

When **us-east-1 sneezes**, half the internet catches a cold.  
It’s not entirely AWS’s fault — it’s ours.

Too many organizations put everything in a single region to “save money.”  
Few thought about **fallback regions**, **cross-region replication**, or **disaster recovery drills**.  
And when major platforms like Confluence or GitHub went dark, some companies couldn’t even *access* their own recovery plans — because the tools *holding* those plans were part of the outage.

That’s not resilience. That’s wishful thinking wrapped in a cost-optimization spreadsheet.

---

### 🧭 What Real Resilience Looks Like

True resilience doesn’t mean your system never fails — it means it *recovers gracefully when it does.*

- **Fallback Regions:** You can fail over automatically or quickly with minimal disruption.  
- **Disaster Recovery Drills:** You *test* the plan, not just document it.  
- **Multi-Regional Deployments:** You accept that “high availability” in one region isn’t high availability at all.  

Let’s touch on **multi-cloud** for a second.  
My take? It’s *usually* overkill.  
Running workloads across clouds sounds great on a slide deck, but in practice, it’s complex, expensive, and doubles your operational burden.  
If you build *truly* resilient, multi-region systems in a single cloud, you get 99% of the benefit without 200% of the cost.

---

### 💭 The Questions Worth Asking

Before you throw money at redundancy, stop and ask yourself:

1. **Is it really that big of a deal if this service goes down?**  
   Measure “care” in business terms — cost, forgone revenue, or SLA impact.  

2. **Is there ROI in going multi-region or multi-cloud?**  
   Not everything needs global failover. Be intentional.  

3. **Do you have the engineering maturity to maintain it?**  
   Multi-region isn’t a checkbox. It’s a practice.  

4. **Would you even *know* something broke?**  
   Solid alerting and observability are your best insurance policies.  

---

### 💡 My Suggestions

If you want to build systems that bend without breaking:

1. **Be redundant where it makes sense** — guided by *cost* and *business value*, not fear.  
2. **Keep your DR plans with your code** — not in a tool that might go down with you.  
3. **Have regular “what if” conversations** — ask, *“Do we care if this crashes?”* and answer honestly.

Resilience isn’t a budget line item. It’s a mindset.

---

### ⚙️ The Takeaway

The web isn’t fragile. It’s just been engineered like it’s disposable.  
If we start treating reliability as a feature — tested, maintained, and budgeted for — outages won’t feel like doomsday.  

So next time **us-east-1** goes dark, ask yourself:

> Do we even blink?

---

🧩 _Engineer in the Loop is where I share my thoughts on AI, cloud, and engineering culture — for developers who build with models (and resilience) in the mix._