---
title: Spec-Driven Development & Spec Kit
date: "2025-11-08T18:22:59.284Z"
description: Building software with intent using structured specifications and AI-assisted implementation with GitHub Spec Kit.
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/on6LBuu_MbI?si=VKZURAVJXW2LcZC1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

# Spec-Driven Development & Spec Kit: Building Software With Intent

A live walkthrough of Spec-Driven Development using Spec Kit, GitHub Copilot, and agent-assisted implementation.

Modern software development is evolving fast. The days of vague requirements, fragmented documentation, and reactive coding are giving way to a more intentional, AI-assisted era — one where specifications drive implementation rather than code being the first draft of thinking.

In the session, Kevin Kraus from Microsoft demonstrates how developers can move from:

idea → structured spec → implementation → automated testing

…with AI doing the heavy lifting in between.

## 🧠 Why Spec-Driven Development?

"LLMs like structure, they don't like ambiguity." — Kevin Kraus

Without a defined spec, AI tends to:
- Misinterpret intent
- Hallucinate architecture decisions
- Go off track mid-implementation
- Require lots of correction

Specs create guardrails, clarity, and predictable automation.

## 🧰 What Is GitHub Spec Kit?

Spec Kit is a GitHub CLI tool and prompt framework that helps you generate structured specifications directly inside your repository.

| Command | Purpose |
|---------|---------|
| `specify init` | Bootstraps Spec Kit in your repo |
| `/specify` | Converts an idea into a structured spec |
| `/clarify` | Removes ambiguity via guided questions |
| `/plan` | Generates a technical implementation plan |
| `/tasks` | Breaks work into actionable tasks |
| `/implement` | Executes via Copilot or GitHub Agents |

## 🧩 The Spec-Driven Development Flow

### 🧠 Who writes the spec?

Everyone — collaboratively and iteratively.

| Stage | Who contributes |
|-------|-----------------|
| Initial idea | Product / stakeholder |
| Refinement & clarification | Developer + Copilot + Product |
| Implementation plan | Copilot / Spec Kit |
| Execution | Copilot or GitHub Agent |
| Validation | Developer / reviewer |

### 🤖 After the spec is written

GitHub coding agents will:
- Generate code
- Write Playwright tests
- Capture UI screenshots
- Open a PR
- Attach evidence for review

Developers shift from typing code → validating outcomes.

## ⚙️ Example workflow

```bash
# Install Spec Kit
npm install -g @github/spec-kit

# Initialize inside a repo
specify init

# Generate a spec
/specify "Add notification bell with unread badge + dropdown"

/clarify
/plan
/tasks
/implement
```

## ✅ Benefits

| Traditional Dev | Spec-Driven Dev |
|----------------|-----------------|
| Code first, figure it out later | Clarity before code |
| Vague tickets | Structured specifications |
| AI generates snippets | AI builds entire features |
| Testing added afterward | Tests auto-generated |
| High rewrite risk | Predictable, repeatable automation |

## The Big Shift

"We're moving from generation to verification." — Kevin Kraus

You're no longer typing the system into existence — you're designing the blueprint that AI builds from.
