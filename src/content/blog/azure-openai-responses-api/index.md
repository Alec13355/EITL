---
title: Using Azure OpenAI's Responses API for Grounded Q&A (Without the Hand-Wavy Nonsense)
date: "2025-11-15T02:05:09.992Z"
description: A straightforward guide to building grounded Q&A with Azure OpenAI's Responses API and Azure AI Search. No fluff, just a clean C# example that actually works.
category: Azure
---

Most tutorials about RAG read like marketing copy. This one doesn't.

If you're trying to ship something real, you don't need poetry about "unlocking intelligence." You need a clean way to ask an Azure OpenAI model a question, get an answer based on your data, and know exactly which file the model pulled the answer from.

This walkthrough shows a minimal C# example that does exactly that. No SDKs, no frameworks, no ceremony.

---

## What We're Actually Doing

We'll hit the Azure OpenAI Responses API directly, with a deployment wired to Azure AI Search. The model answers the user's question, and Azure injects the citations—including the document IDs from your search index—into the response.

**The goal:**
You ask a question → the model replies → you get a list of source documents → you turn them into clickable links in your UI.

That's it. Grounded Q&A without the drama.

---

## What You Need

Before you copy/paste anything, make sure you have:

- An Azure OpenAI deployment (gpt-4-turbo, gpt-35-turbo, etc.)
- An Azure AI Search index that actually contains your documents
- A field in the index (e.g., `ContentItemId`) holding the exact file name you want to use as the citation
- The usual keys:
  - `<AzureOpenAIKey>`
  - `<AzureOpenAIStartURL>`
  - `<ModelDeploymentName>`
  - `<AI Search API Key>`
  - `<AISearchResourceName>`
  - `<Your index name>`
  - `<blob URI>` — the base path for your document storage

**If your index doesn't expose the file name, nothing in this guide will behave the way you expect. Fix the index first.**

---

## Minimal C# Example

A single function that sends the request, parses the response, and maps the citations into real links.

```csharp
using System.Text;
using System.Text.Json;

class CustomResult
{
    public string Content { get; set; }
    public List<string> MappedUrls { get; set; }
}

async Task<CustomResult> PostToAzureOpenAIAsync()
{
    HttpClient _httpClient = new HttpClient();
    _httpClient.DefaultRequestHeaders.Add("api-key", "<AzureOpenAIKey>");

    var openAiUrl =
        "<AzureOpenAIStartURL>/openai/deployments/<ModelDeploymentName>/chat/completions?api-version=2024-02-01";

    var body = new
    {
        temperature = 0,
        max_tokens = 1000,

        data_sources = new[]
        {
            new
            {
                type = "azure_search",
                parameters = new
                {
                    authentication = new {
                        type = "api_key",
                        key = "<AI Search API Key>"
                    },
                    in_scope = true,
                    endpoint = $"https://<AISearchResourceName>.search.windows.net",
                    index_name = "<Your index name>",
                    fields_mapping = new
                    {
                        url_field = "ContentItemId" 
                    }
                }
            }
        },

        messages = new[]
        {
            new { role = "system", content = "Answer using only the provided data sources." },
            new { role = "user", content = "What is the font-size specified in my data?" }
        }
    };

    var content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");
    var response = await _httpClient.PostAsync(openAiUrl, content);

    string responseString = await response.Content.ReadAsStringAsync();
    using var doc = JsonDocument.Parse(responseString);

    var resultContent = doc.RootElement
        .GetProperty("choices")[0]
        .GetProperty("message")
        .GetProperty("content")
        .GetString();

    var citations = doc.RootElement
        .GetProperty("choices")[0]
        .GetProperty("message")
        .GetProperty("context")
        .GetProperty("citations");

    var mappedUrls = new List<string>();
    foreach (var citation in citations.EnumerateArray())
    {
        var urlValue = citation.GetProperty("url").GetString();
        mappedUrls.Add($"<blob URI>/{urlValue}");
    }

    return new CustomResult
    {
        Content = resultContent,
        MappedUrls = mappedUrls
    };
}
```

---

## How the Citations Work

When RAG is enabled, Azure OpenAI adds a context block:

```json
{
  "context": {
    "citations": [
      { "url": "document_1.pdf", "chunk_id": "0" }
    ]
  }
}
```

The important line from the request:

```csharp
fields_mapping = new { url_field = "ContentItemId" }
```

**This is the whole trick.**

It tells Azure OpenAI:

> "Use the ContentItemId field from my index as the citation URL."

So if your index holds `"ContentItemId": "layout-specs.docx"`, the model's response cites:

```json
{ "url": "layout-specs.docx" }
```

Then you simply glue it to your blob path:

```csharp
$"<blob URI>/{urlValue}"
```

It's boring, predictable, and exactly what you want.

---

## Final Notes

This pattern is a reliable way to build grounded Q&A without chasing hallucinations all day. It also scales well—once you have citation mapping working, everything else (front-end UI, clickable references, auditing, logging) becomes straightforward.

No magic. No vendor lock-in to a heavy SDK. Just HTTP requests and JSON parsing.

If you're shipping real products with Azure OpenAI, this is the foundation you need.
