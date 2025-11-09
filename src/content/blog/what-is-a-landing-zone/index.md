---
title: Understanding Landing Zones in Azure
date: "2025-11-08T12:00:00.000Z" 
description: A landing zone in Microsoft Azure is a foundational, well-architected environment built to host your workloads—apps, data, services—in a safe, consistent, scalable and governed way.
---

# Understanding Landing Zones in Azure

![Azure Landing Zone Hub-Spoke Architecture](/assets/LandingZone/azure-landing-zone-architecture-diagram-hub-spoke.svg)

![Hub-Spoke Network Topology](/assets/LandingZone/hub-spoke.png)

![Azure Landing Zone Design Areas](/assets/LandingZone/alz-design-areas.svg)

## What is a Landing Zone?

A landing zone in Microsoft Azure is a foundational, well-architected environment built to host your workloads—apps, data, services—in a safe, consistent, scalable and governed way. According to Microsoft, it is:

> "a standardized and recommended approach for all organizations utilizing Azure. It provides a consistent way to set up and manage your Azure environment at scale."

At its core, an Azure landing zone helps you put in place the essential building blocks before you deploy your workloads: subscription and management-group design, identity and access management, network connectivity, governance & policy, security, monitoring, cost management.

In the Azure Cloud Adoption Framework (CAF) terminology, you'll often see two types of landing zones:

- **A Platform Landing Zone:** provides the shared foundational services (identity, connectivity, management, security, logging, etc.) that many application workloads will use.

- **An Application Landing Zone:** provides the environment for a specific workload or set of workloads (for example dev/test/prod for an application), inheriting the platform services and aligned governance.

## Why You Need One

Moving to the cloud is more than "lift & shift" – it's establishing a new operational model, and that new model needs guardrails. Without a thoughtfully built landing zone, you risk:

- **Inconsistent governance and security:** Every team spinning up resources ad-hoc leads to sprawl, uncontrolled costs, unknown risks. A landing zone ensures policy, identity, monitoring are in place from the start.

- **Poor scalability and manageability:** As cloud adoption grows, you need a consistent multi-subscription, multi-environment architecture. A landing zone gives you repeatable patterns and ensures you're not reinventing for each workload.

- **Delays in value delivery:** If foundational work is deferred until after workloads are deployed, you'll struggle to retrofit governance, connectivity, identity, costing. Landing zones help you "build the runway" before high-velocity innovation.

- **Fragmented cost & billing:** Without standardized resource organization (management groups, subscriptions, tagging), tracking, managing and optimizing cost becomes hard.

- **Non-compliance or security gaps:** Many organizations must meet regulatory or internal standards. A landing zone architecture embeds many of those design areas up front.

In short: a landing zone is your enterprise-scale blueprint for cloud adoption, enabling migration, modernization and innovation at scale. As one blog puts it:

> "Azure landing zones are the output of a multi-subscription Azure environment that accounts for scale, security governance, networking, and identity. Azure landing zones enable application migration, modernization, and innovation at enterprise-scale in Azure."

## Key Benefits

Here are the main benefits you'll get when you apply a landing-zone approach:

| Benefit | Description |
|---------|-------------|
| **Scalability & repeatability** | Once you've defined the landing zone architecture, you can roll out new subscriptions/environments/workloads quickly with the same guardrails in place. |
| **Governance & compliance built-in** | Policies, identity, access controls and resource organisation are defined up front, reducing risk of drift or "shadow IT". |
| **Operational efficiency** | By centralising platform services (in the Platform Landing Zone) you avoid duplication and give workload teams clear boundaries. |
| **Better cost management** | With structure (subscriptions mapped to business units, environments) plus tagging and policies, you gain cost visibility earlier. |
| **Faster time-to-value** | Because the foundational plumbing is in place, your teams can deploy workloads faster and spend more time innovating. |
| **Security and network posture improved** | Network topology, connectivity (hub-spoke, express routes), identity controls, monitoring are accounted for. |

## Key Design Areas & Principles

Microsoft breaks down landing zone design into eight design areas (identity, management groups/subscriptions, network & connectivity, security, governance, platform automation/DevOps, operations/monitoring, costing).

Some core design principles that underpin landing zones include:

- **Subscription democratization:** Use subscriptions as units of management, aligned to business units/environments, enabling delegation while staying within governance.

- **Cloud-native orientation:** Design for dynamic infrastructure, automation, resilient operations—not just lift-and-shift.

- **Governance by design not by retrospective fixes:** Build in controls early rather than bolt them on later.

- **Modularity:** Your landing zone architecture should be modular, adaptable, able to evolve.

## Extending the Concept To AI

![AI Landing Zone with Platform](/assets/LandingZone/AI-Landing-Zone-with-platform.png)

![AI Landing Zone without Platform](/assets/LandingZone/AI-Landing-Zone-without-platform.png)

With the rise of artificial intelligence and generative AI workloads, the same rigorous landing-zone mindset remains highly relevant. The team at Microsoft Azure has published the AI Landing Zones reference architecture (on GitHub) which is described as:

> "a secure, resilient and scalable reference architecture and reference implementation … to deploy secure and resilient AI Apps & Agents solutions in Azure."

Specifically:

- It is an application-landing-zone style building block, meant to sit on top of a platform landing zone (or operate standalone) for AI workloads.

- It supports generative and non-generative AI use cases, based on the CAF AI scenario guidance.

- It provides IaC (Infrastructure as Code) in Bicep & Terraform, so you can deploy standardized architectures.

### Why the landing-zone methodology still applies for AI

Even though AI workloads may feel "new" and "fast-moving", you still benefit from applying the landing zone approach:

- **Governance & safety:** AI introduces new risks—model drift, data leakage, permission explosion, uncontrolled inference costs. A landing zone helps you define controls early (identity, access, secrets, model versioning, monitoring).

- **Scalability & repeatability:** AI projects often begin small and expand quickly. If you have the landing zone patterns, you can scale out additional workloads or agents without re-inventing each time.

- **Separation of concerns:** AI workloads often consume data, models, compute, memory, pipelines. Having a dedicated application landing zone for AI ensures you can manage them as workloads while relying on shared platform services.

- **Resilience and reliability:** AI agents may be always-on, have high throughput, need golden paths for monitoring, alerting, rollback. The architecture patterns in AI Landing Zone address this.

- **Putting guardrails around emerging tech:** Still many unknowns with generative AI: cost explosion, ethical/misuse risk, service updates. A landing-zone approach mitigates by providing "safe zones" to operate.

### What does the AI Landing Zone look like?

From the GitHub repo:

- It supports two options: with a platform landing zone (i.e., relying on shared services) and without (standalone application landing zone for AI workloads).

- It features modules around identity, connectivity, Azure services (e.g., Azure AI Foundry, Azure OpenAI, Key Vault, App Service) and is designed to act as "application landing zone".

- It includes design checklists in the repo to walk you through readiness, design areas, and alignment with the CAF and Well-Architected Framework.

- It's intended for Azure Public Cloud, but can also be used in Azure Government or Sovereign Cloud.

### Suggested Architecture

Here is a high-level summary of the architecture from the repo:

- A hub/spoke style network topology (connectivity subscription) feeding into application landing-zone subscription(s).

- Shared identity & platform services living in the platform-zone (if used) so that the workload teams focus on building AI services.

- Within the AI landing zone subscription: resource groups for compute (model training/inferencing), data storage, orchestration pipelines (e.g., Semantic Kernel or Azure AI Foundry), Key Vault, logging/monitoring solutions.

- Governance & policy definitions applied to ensure the workload meets enterprise standards from the start.

- IaC templates (Bicep/Terraform) to deploy repeatably.

### Applying the Same Methodology — Practical Steps

Here are the key steps you might follow when applying the landing-zone approach for an AI workload:

#### Define your scope & business context

- What AI scenario are you enabling (chatbot, agent, document processing, etc.)?

- What regulatory, security, data-sensitivity, cost constraints apply?

- What will the scale look like (number of users, regions, model size)?

#### Choose landing zone type

- If your organization already has an enterprise platform landing zone, you can build the AI landing zone as an application landing zone on top of it.

- If not, you might deploy the AI landing zone standalone first, and then integrate later.

#### Architect your environment

- Resource organization: management groups → subscriptions → resource groups.

- Network topology: hub/spoke, VNet peering, private endpoints.

- Identity and access: assign roles, manage service principals, apply least-privilege.

- Governance & policies: auditing, tagging, cost controls, model governance.

- Data & compute separation: training vs inference vs data store.

- Logging, monitoring, operations: pipeline health, model drift, alerts.

#### Deploy via infrastructure as code

- Use the AI Landing Zones repo templates (or customize) as a starting point.

- Automate deployment and environment provisioning so you can replicate for dev/test/prod.

#### Operate & iterate

- Monitor cost, performance, security posture.

- As your AI workloads evolve (new models, increased usage, new regions), use the modular architecture of the landing zone to scale.

- Update policies and guardrails as new AI services/features emerge.

#### Govern the AI-specific elements

- Model versioning, continuous evaluation, bias/ethics checks.

- Data lineage, data governance for model training.

- Responsible access to pre-trained models, prompt logging, inference tracking.

- Cost per inference, model refresh strategy, scale-down policies.

## Summary

- A landing zone in Azure is your enterprise-grade foundational environment for cloud workloads, enabling scale, governance, security and operational efficiency.

- The benefits are clear: repeatability, cost control, governance, faster time-to-value.

- The methodology applies equally to AI workloads. With the AI Landing Zones reference architecture from Microsoft, you can extend the same landing-zone discipline to your generative/non-generative AI applications.

- Even though AI is fast-moving, you don't skip the fundamentals—rather you build on them, enabling innovation inside a controlled, repeatable, scalable environment.
