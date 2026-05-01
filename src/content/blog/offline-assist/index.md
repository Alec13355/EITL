---
title: Free AI Coding Assistance, Right in VS Code — Introducing OfflineAssist
date: "2026-05-01T21:49:06.744Z"
description: OfflineAssist plugs local AI models from Microsoft Foundry Local directly into VS Code's chat interface — no API key, no subscription, no cloud required.
category: AI & Machine Learning
---

*No API key. No subscription. No cloud required.*

If you've been following the local AI wave, you already know the pitch: powerful language models that run entirely on your machine, keep your code private, and cost you absolutely nothing to use. What's been missing is a dead-simple way to plug those models directly into your VS Code workflow — without wrestling with configuration files or abandoning the editor experience you already love.

That's exactly the gap I built **OfflineAssist** to fill.

---

## The Problem With "Free" AI Coding Tools

Most "free" AI coding assistants aren't actually free. They're free tiers — capped at a certain number of requests per month, throttled when demand is high, and backed by cloud infrastructure that means your code is leaving your machine. For developers working on sensitive projects, proprietary codebases, or in regulated industries, that's a non-starter.

Even the paid options come with a creeping concern: you're renting intelligence. The moment your subscription lapses or the pricing changes, your workflow breaks.

There's a better way.

---

## Enter Microsoft AI Foundry Local

Microsoft Foundry Local is a runtime that lets you discover, download, and run quantized AI models directly on your device — Windows or macOS. It handles the heavy lifting of model management: dynamically checking whether a model is already cached locally, downloading the right variant if not, and loading it into memory ready to serve requests. Once a model is running, it exposes a standard OpenAI-compatible API on localhost, which means any tool that speaks to an AI can speak to *your* local model instead.

The model catalog is broad. You get access to models like Microsoft's Phi family (lightweight, optimized for reasoning and code generation), Qwen models built for multilingual tasks, and more — all running 100% on your hardware. No tokens consumed, no data transmitted, no monthly bill.

The key benefits that make this compelling for developers:

- **Your data stays on your device.** Code you paste into a chat prompt never touches an external server.
- **Works offline.** Airplane, conference wifi, corporate firewall — doesn't matter.
- **No usage costs.** Run as many completions as your hardware can handle.
- **Hardware acceleration.** Foundry Local leverages DirectML to use your GPU or NPU where available, so you're not just grinding through completions on CPU.

---

## What OfflineAssist Does

Foundry Local is great infrastructure, but until now you still needed to wire it up yourself to get it talking to VS Code's chat interface. OfflineAssist is that wire.

The extension does three things:

1. **Discovers your local models.** It queries the Foundry Local catalog and surfaces every chat-capable model you have available — no manual configuration required.

2. **Registers them in VS Code's language model picker.** The models show up under the `Offline Assist` vendor in the same model picker you already use. Switch between them just like you'd switch between cloud models.

3. **Lazy-loads models on demand.** The first time you send a chat request to a model, OfflineAssist downloads the execution providers if needed and loads the model. You can also pre-download any model ahead of time using the `OfflineAssist: Download Chat Model` command — useful before a flight or when you know you'll be working without a reliable connection.

That's it. No separate UI, no new panel to learn. Just open the chat view, pick a model under Offline Assist, and start coding.

---

## Getting Started

**Prerequisites:**
- VS Code Insiders (required for the proposed `chatProvider@4` API)
- <a href="https://github.com/microsoft/foundry-local">Foundry Local</a> installed on your machine
- Node.js 18+

**Install Foundry Local on macOS:**
```bash
brew install microsoft/foundrylocal/foundrylocal
```

**Install the extension** from the <a href="https://marketplace.visualstudio.com/items?itemName=AlecHarrison.offline-assist">VS Code Marketplace</a>, then:

1. Open the chat view in VS Code.
2. Open the model picker.
3. Choose any model listed under **Offline Assist**.
4. Send a prompt — OfflineAssist handles the rest.

If you want to pre-download a model before you need it, run `OfflineAssist: Download Chat Model` from the Command Palette.

---

## Why This Matters

The conversation around AI tooling has been dominated by cloud providers and subscription tiers for long enough. Foundry Local proved that the models themselves can run locally at a quality that genuinely helps with real development work. OfflineAssist takes that capability and makes it a first-class citizen in the editor where most of us actually spend our time.

This isn't a workaround. It's not a hack. It's AI coding assistance the way it should have been all along — private, free, and always available.

**<a href="https://marketplace.visualstudio.com/items?itemName=AlecHarrison.offline-assist">Install OfflineAssist →</a>**

---

*Have feedback, ideas, or ran into an issue? Open an issue or drop a comment — I'd love to hear how you're using it.*
