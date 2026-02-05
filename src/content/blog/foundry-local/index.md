---
title: Foundry Local - Run Real AI Without Paying the Cloud Tax
date: "2026-02-05T05:54:45.794Z"
description: AI demos are great until the bill shows up thirty days later. Foundry Local allows you to run production-grade LLMs, embeddings, and agents locally without Azure subscriptions, invoices, rate limits, or vendor lock-in.
category: AI & Machine Learning
---

AI demos are great until the bill shows up thirty days later.

If you've shipped anything using OpenAI, Azure OpenAI, or Copilot Studio, you know the reality: Your app scales faster than your budget.

Foundry Local attempts to fix this. It allows you to run production-grade LLMs, embeddings, and agents locally. No Azure subscription, no invoices, no rate limits, and no vendor lock-in.

You still use the Azure AI Foundry APIs and SDKs. You just swap the runtime. It is cloud-native AI, minus the cloud bill.

## What is Foundry Local?

Foundry Local is Microsoft's local execution runtime for the Azure AI Foundry stack.

It provides:
 * Local LLM hosting
 * Local embeddings
 * Vector search
 * Tool calling + agents
 * OpenAI-compatible REST APIs
 * Offline & air-gapped execution

It runs on your laptop, dev box, or on-prem server. Build once, run anywhere.

## Why Use It?

### 1. Zero inference cost
No per-token fees. Your GPU is the cloud.

### 2. Regulated & offline workloads
Healthcare, manufacturing, defense, and finance become viable targets when you don't need a constant internet connection to Redmond.

### 3. Full parity with Azure AI Foundry
Same code. Same patterns. Different runtime.

### 4. Model Control
Swap Phi → Llama → Mistral → Qwen without rewriting your business logic.

## Mental Model

The architecture is simple:

```
Your App -> Foundry SDK / REST -> Foundry Runtime (Local) -> LLM + Embeddings + Vector Store + Tools
```

## Getting Started

### 1. Install Foundry Local

```bash
brew install foundry
# or
winget install microsoft.foundry
```

Verify the install:

```bash
foundry --version
```

### 2. Start the Runtime

```bash
foundry local start
```

### 3. Run a Model

```bash
foundry model run qwen2.5-0.5b
```

Check the service status to get your endpoint:

```bash
foundry service status
```

Example output: `http://127.0.0.1:52733`

This is your `FOUNDRY_ENDPOINT`.

## The Implementation

Most "AI" features boil down to three things:
 * Chat completions
 * Embeddings
 * RAG (Embeddings + Retrieval + Chat)

Since Foundry Local exposes OpenAI-compatible REST endpoints, your existing code usually just works.

### Chat Completions (C#)

**appsettings.json**

```json
{
  "Foundry": {
    "Endpoint": "http://127.0.0.1:52733",
    "Model": "qwen2.5-0.5b"
  }
}
```

**DI + HttpClient**

```csharp
public sealed class FoundryOptions
{
    public required string Endpoint { get; init; }
    public required string Model { get; init; }
}

builder.Services.Configure<FoundryOptions>(
    builder.Configuration.GetSection("Foundry"));

builder.Services.AddHttpClient("Foundry", (sp, client) =>
{
    var opt = sp.GetRequiredService<IOptions<FoundryOptions>>().Value;
    client.BaseAddress = new Uri(opt.Endpoint);
});
```

**Chat call (/v1/chat/completions)**

```csharp
public async Task<string> AskAsync(string prompt)
{
    var req = new
    {
        model = _opt.Model,
        messages = new[]
        {
            new { role = "system", content = "You are a helpful assistant." },
            new { role = "user", content = prompt }
        },
        temperature = 0.2
    };

    var resp = await _http.PostAsJsonAsync("/v1/chat/completions", req);
    resp.EnsureSuccessStatusCode();

    var json = await resp.Content.ReadFromJsonAsync<ChatCompletionsResponse>();
    return json?.choices?.FirstOrDefault()?.message?.content ?? "";
}
```

### Embeddings

```csharp
public async Task<float[]> EmbedAsync(string text)
{
    var req = new
    {
        model = "phi-embed",
        input = text
    };

    var resp = await _http.PostAsJsonAsync("/v1/embeddings", req);
    resp.EnsureSuccessStatusCode();

    var json = await resp.Content.ReadFromJsonAsync<EmbeddingsResponse>();
    return json?.data?.FirstOrDefault()?.embedding ?? Array.Empty<float>();
}
```

Once you have vectors, you have semantic search, clustering, and RAG.

### Local RAG

```csharp
public async Task<string> RagAsync(string question, IReadOnlyList<string> chunks)
{
    var qVec = await EmbedAsync(question);

    var ranked = chunks
        .Select(async c => (chunk: c, score: CosineSimilarity(qVec, await EmbedAsync(c))))
        .Select(t => t.Result)
        .OrderByDescending(x => x.score)
        .Take(4)
        .Select(x => x.chunk);

    var context = string.Join("\n---\n", ranked);

    return await AskAsync($"""
    Use the following context to answer the question:

    {context}

    Question: {question}
    """);
}
```

Two endpoints. Zero cloud.

## Native API vs REST

Foundry Local supports a native .NET API that runs without HTTP for performance, but REST is better for demos (curl + Postman). I use REST to prototype and native for production.

## Working Examples

I use this pattern in my meetup demos. You can view the source code here:

[github.com/Alec13355/JanDotNetUG](https://github.com/Alec13355/JanDotNetUG)

The repo includes local LLM demos, embedding pipelines, and RAG patterns.

## Summary

Foundry Local is what cloud AI should have been: portable, predictable, and controlled by the engineer.

You choose where it runs. You choose the models. You control the costs. This is how you build systems that don't expire when your credits run out.
