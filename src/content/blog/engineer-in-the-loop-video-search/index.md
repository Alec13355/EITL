---
title: Engineer in the Loop - Turning Your Video Pile Into Something Actually Searchable
date: "2025-11-14T02:50:03.284Z"
description: Stop scrubbing through videos. Build a searchable video system using Azure AI services that lets you ask questions directly against video content—no data science cosplay required.
category: AI & Machine Learning
---

<div class="video-container my-8">
  <iframe width="100%" height="400" src="https://www.youtube.com/embed/76QZW6_7YLQ?si=OznDZYBW46i_BMco" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="rounded-lg shadow-lg"></iframe>
</div>

# 🛠️ Engineer in the Loop: Turning Your Video Pile Into Something Actually Searchable

Most teams are sitting on a mess of video content—training recordings, demos, walk-throughs, "quick" guides—that basically become a landfill the moment they're uploaded. If you've ever tried to find one repair step in a 20-minute video, you already know the pain. Scrubbing back and forth like it's 2008 isn't a strategy.

Here's the project where we finally stopped pretending video libraries are usable and built something that lets you ask questions directly against the video content—no data science cosplay, no custom LLM tinkering, and no magical thinking. Just practical AI services doing a job.

⸻

## The Problem: Videos Are Terrible Knowledge Bases

Video is great for humans, terrible for search.

* **Precision Hell:** Need the exact step when someone swaps a cable? Enjoy scrubbing.
* **Redundant Content:** Is this topic already covered in another video? Who knows—roll the dice.
* **Patience (or lack of it):** Nobody wants to watch 15 minutes to find a 15-second answer.

We wanted a system where you could just ask normal questions like, "Where do they describe configuring the NIC?" and get a direct link to the exact timestamp. No ceremony. No babysitting AI.

⸻

## 🚀 The Build: A Searchable Video System (Without Reinventing ML)

We assembled this using Azure's off-the-shelf AI services plus Python to glue everything together. It's not glamorous, but it works—and it scales.

### The Tech Stack (Straightforward, Not Cute)

| Component | Tech | Purpose |
|-----------|------|---------|
| Search & Indexing | Azure AI Search | Stores timestamped text chunks for semantic lookup |
| Embeddings + Chat | Azure OpenAI | Embeddings + a simple Q&A layer |
| Transcription | Azure AI Speech | Turns WAV audio into SRT transcripts |
| Front-End | Azure Static Web Apps | Lightweight HTML search UI |
| Data Prep | Python + youtube-dlp | Downloads, converts, and chunks videos |

⸻

## End-to-End Workflow (The Part People Actually Ask For)

Here's the pipeline, minus the marketing spin:

### 1. Deploy Everything
A PowerShell script spins up the Azure resources (via Bicep) and sets the environment variables for indexing.

### 2. Download the Videos
Python + youtube-dlp pulls the source MP4 files.

### 3. Convert MP4 → WAV
Azure's transcription behaves better with WAV, so we convert.

### 4. Transcribe to SRT
Azure AI Speech generates subtitle files—timestamps included.

### 5. Fix the SRT Garbage
SRTs often split the same timestamp into multiple entries. Useless.

So we consolidate all text for a continuous timestamp into one chunk.

**Result:** clean, non-redundant data that doesn't pollute search results.

### 6. Check/Create the Search Index
If the index doesn't exist, create it with the expected schema.

### 7. Push the Chunked Data
Upload the timestamped text chunks into Azure AI Search.

### 8. Deploy the Basic Front-End
A minimal Static Web App serves the search UI. Password optional, depending on how public your mess is.

⸻

## 💡 What You Get in the End

Now users can ask things like:

> "What's the second step for configuring the network interface?"

And instead of a generic LLM hallucination, they get:
* the exact transcript snippet
* the correct timestamp
* a direct link into the video at that moment

Which means you're not scrubbing through videos anymore. You jump straight to the context you need and move on with your life.

This is the EITL way: use the cloud AI tools that work, ignore the shiny distractions, and keep your Python scripts small enough to actually debug.
