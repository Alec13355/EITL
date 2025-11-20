---
title: "The World of IQ: Microsoft's New \"Brain\" for AI Agents"
date: "2025-11-20T18:02:09.035Z"
description: A human-written guide to Work IQ, Fabric IQ, and Foundry IQ
---

If you watched the announcements out of Microsoft Ignite 2025, you probably noticed something subtle: the vocabulary changed. We're done gawking at "chatbots that sound surprisingly human." The industry has shifted to something less flashy but far more consequential—Agentic AI, or AI that actually gets work done.

But here's the catch: an AI agent can't be useful if it only has a large language model bolted on top. LLMs are clever, but they're clueless without context. They don't know your role, your team, your data, or the rules of your business.

Microsoft's answer is a new intelligence layer—three of them, actually—called Work IQ, Fabric IQ, and Foundry IQ. Think of them as three different "brains" that give agents memory, meaning, and the ability to actually DO things rather than just talk about them.

Below is the straight, no-nonsense breakdown.

⸻

## 1. Work IQ: The "Context" Brain

**Scope: You, your team, your patterns (Microsoft 365)**

### What it actually is

Work IQ sits under Microsoft 365 like an invisible assistant who has been quietly studying how you work for years. It pulls from the Microsoft Graph—your emails, meetings, contacts, projects—to give AI agents a sense of your habits and relationships.

This isn't "AI that knows everything." This is "AI that finally knows you."

### What it's good for
- **Personalizing agent behavior**  
When you say, "Set up a meeting with the product team," Work IQ knows you mean Sarah and David, not thirty people in the org chart.
- **Relevant summaries**  
Instead of summarizing every email in your inbox, it highlights the ones tied to your deadlines or ongoing projects.
- **Delegating busywork**  
Tell an agent, "Handle this email thread," and it uses Work IQ to craft a reply that actually matches your writing style and the history of the conversation.

⸻

## 2. Fabric IQ: The "Business" Brain

**Scope: Your company's data, but with actual meaning (Microsoft Fabric)**

### What it actually is

If Work IQ knows people, Fabric IQ knows data. Raw datasets are worthless to an LLM—they might as well be hieroglyphics. Fabric IQ turns cryptic table names and disconnected databases into clear business concepts: customers, orders, SKUs, churn, revenue.

It's the semantic layer your data team has always wanted but didn't have the tooling to maintain at scale.

### What it's good for
- **Grounding business agents**  
Ask, "Why is churn up in Q3?" and your agent uses your company's definition of churn—not whatever math the model improvises.
- **Unifying data sources**  
Operational systems, telemetry, geospatial data—Fabric IQ stitches them together into a single mental model.
- **Preventing hallucinations**  
By tying everything back to governed business definitions, the AI can't wander off and invent numbers out of thin air.

⸻

## 3. Foundry IQ: The "Builder" Brain

**Scope: Developers, custom agents, orchestration (Azure AI Foundry)**

### What it actually is

If Work IQ is personal and Fabric IQ is analytical, Foundry IQ is connective tissue. It's the layer that developers use to build custom agents that pull from multiple systems without having to reinvent the plumbing every time.

Foundry IQ creates a single grounding API that can talk to:
- your email (Work IQ)
- your governed data (Fabric IQ)
- your files and apps
- your security permissions

It's effectively the "router" for your agent's intelligence.

### What it's good for
- **Advanced RAG**  
When your agent needs to read a policy PDF and check a SQL database and query Work IQ, Foundry IQ handles the retrieval logic so you don't have to.
- **Routing tasks to the right model**  
Developers no longer need custom glue code to decide "which model handles what." Foundry IQ does the dispatching.
- **Respecting permissions**  
Agents don't magically gain access to secret HR docs—Foundry IQ enforces the security boundaries that already exist.

⸻

## Which IQ Should You Use?

**Short answer:**
- **Work IQ** → Make Copilot smarter about people, calendars, and office workflows.
- **Fabric IQ** → Make an agent actually understand your business data.
- **Foundry IQ** → Build custom agents that need to pull from multiple sources without juggling APIs.

**Long answer:**  
We're entering an era where AI without context is just a party trick. These three "IQs" are Microsoft's attempt to fix that by giving agents memory, meaning, and the ability to take action responsibly.

⸻

## Bonus: Ignite 2025 – Foundry IQ, Model Router & Agent Factory

If you want the deeper technical dive, the Ignite session breaks down how Foundry IQ plugs into the broader "Agent Factory" concept—routing, grounding, and managing AI workloads. It's worth a watch if you're building anything beyond a toy agent.

<iframe width="560" height="315" src="https://www.youtube.com/embed/9sXc_NtEwlk?si=cDVhkqBsR2AWQgBt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
