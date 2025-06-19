---
title: Automating Taxonomy Generation The Future is Here with Compound AI and Agents on Azure Databricks
date: "2025-06-18T22:10:03.284Z"
description: Recently, I had the privilege of attending an insightful session on "Automating Taxonomy Generation With Compound AI and Agents on Azure Databricks," presented by Sudhir Gajre, Managing Director of GenAI at Lovelytics. Sudhir, a recognized thought leader in the GenAI space and a frequent speaker at Data and AI conferences, shared how his team is revolutionizing one of the most historically challenging aspects of data management taxonomy.
category: AI & Machine Learning
---
# Automating Taxonomy Generation The Future is Here with Compound AI and Agents on Azure Databricks

Recently, I had the privilege of attending an insightful session on "Automating Taxonomy Generation With Compound AI and Agents on Azure Databricks," presented by Sudhir Gajre, Managing Director of GenAI at Lovelytics. Sudhir, a recognized thought leader in the GenAI space and a frequent speaker at Data and AI conferences, shared how his team is revolutionizing one of the most historically challenging aspects of data management: taxonomy.

## The Age-Old Challenge of Taxonomy

Taxonomy, the science of classification, has been a cornerstone of organizing information for centuries. In the business world, it's crucial for everything from product categorization to document management. Yet, as Sudhir aptly put it, "Taxonomy is hard because people see it like documenting code. It's not a lot of fun and hard." It's a meticulous process, prone to gaps, inconsistencies, and significant manual effort.

Consider the complexity of classifying a product like a pump:

* **Level 1:** Pump

* **Level 2:** Centrifugal Pump

* **Level 3:** Impeller

* **Level 4:** Stainless steel 8-inch

* **Level 5:** IMP-SSB-ACME

Filling in these granular details and ensuring consistency across vast inventories can be a monumental task. As the saying goes, "The first level of intelligence is calling something by its real name." Achieving this at scale is precisely where traditional methods fall short.

## Why Now? The Compound AI Opportunity

The advent of Large Language Models (LLMs) has transformed many aspects of AI, but the session highlighted a crucial point: **LLMs alone aren't enough.** While powerful, they are not all-knowing, and simply increasing model size doesn't always equate to better performance. They often come with high compute costs, limited reasoning capabilities, and a lack of external memory or tools, leading to issues like hallucinations.

This realization has led to a significant paradigm shift: **from monolithic models to modular systems**. This is the essence of **Compound AI**.

Compound AI combines LLMs with:

* External tools

* Retrievers (for accessing relevant information)

* APIs (for real-world interactions)

* Custom logic

By breaking down complex problems into smaller, manageable steps, Compound AI architectures significantly reduce hallucinations and unlock faster, cheaper, and more controllable Generative AI systems. This approach aligns perfectly with the insights from the UC Berkeley paper on Compound AI and Andrew Ng's profound statement: "You can match state-of-the-art performance with smaller models by reducing cognitive load and extending capability using tool use, retrieval, classic ML, and agents."

A great example shared was using tool calls for route planning in trucking: an AI agent could check weather APIs and automatically reroute a truck if a weather alert is issued.

## Lovelytics' GenAI Application Journey

Lovelytics has built a robust GenAI application journey, conceptualized as a pyramid of increasing business value:

![Pyramid](/assets/pyramid.png)

* **Top:** Compound AI Systems (incorporating tool calls, multi-modal capabilities) and Agents (building on Compound AI principles)
  
* **Middle:** Intelligent Information Platform, Reasoning and Acting Platform (e.g., insurance use cases)
  
* **Bottom:** Chatbot/RAG (Retrieval Augmented Generation) Pattern

This layered approach, built on the **Databricks Data Intelligence Platform** (which inherently provides data and governance), enables organizations to achieve remarkable results. Sudhir shared an impressive anecdote: they were able to fine-tune an AI system to achieve the human performance level of a 20-year insurance veteran adjustor in just two weeks! This underscores a critical truth for today's businesses: "In today's biz case any human workflow can be somewhat automated today."

## Core Components for Automated Taxonomy Generation

The Compound AI and Agent-based approach for taxonomy generation leverages a powerful ensemble of components:

* **Text + Multimodal LLMs:** Used for analyzing product descriptions, extracting features, and classifying items. Crucially, they handle both structured inputs (like CSVs) and unstructured data (PDFs, images).

* **Classic ML Models:** Support narrow, specific tasks such as attribute prediction or normalization. These are excellent for fast, rule-based mappings where LLMs might overgeneralize.

* **External APIs:** Integrate with external systems for real-time data or specific functionalities.

* **Internal Structured Data:** Leverages existing organizational data for context and accuracy.

* **Reviewers & Controllers/Planners:** Human-in-the-loop components to oversee, validate, and refine the AI's output, ensuring alignment with business needs.

## Why Databricks is the Platform of Choice

The Azure Databricks platform provides the ideal environment for building such sophisticated Compound AI systems:

* **Mosaic AI Agent Framework:** A dedicated framework for building and managing AI agents.

* **Foundation Model APIs + AI Gateway:** Provides unified access to leading LLMs from providers like OpenAI, Anthropic, and Meta.

* **`ai_query()`:** This powerful function allows users to run AI/ML models directly from SQL, enabling seamless batch or real-time inference. For instance, it can be used for batch product calls, efficiently processing large datasets.

* **Unity Catalog + MLflow 3.0:** Essential for tracking, versioning, and governing data, models, and all agent components, ensuring end-to-end lifecycle management.

* **Delta Lake + PySpark:** Offer robust capabilities for processing massive volumes of structured and unstructured data at scale.

This combination of tools makes Databricks a true "Agent Brick," simplifying the development and deployment of advanced AI solutions.

## The Power of Precision and Reduced Cognitive Load

The core principle behind Compound AI's success in taxonomy generation is **precision**. By having the LLM make smaller, specific calls to various components (Pyfunc wrappers for AI APIs, classic ML models, external tools), the "cognitive load" on the LLM is significantly reduced. This specialized division of labor leads to remarkably better and more precise outputs. The demo showcased how this architecture, combined with both batch and real-time inference capabilities, brings automated taxonomy generation to life within the Databricks App UI.

## What's Next? Deep Dive into Enabling Technologies

For those looking to explore these concepts further, two areas that warrant deeper study emerged from the session:

* **K-means clustering:** A fundamental unsupervised machine learning algorithm for grouping data points.

* **Neural Symbolic Architecture:** An exciting field that combines the strengths of neural networks (for pattern recognition) with symbolic AI (for reasoning and knowledge representation). Some think it will be the next big leap forward in AI.

## Conclusion

Automating taxonomy generation is no longer a futuristic dream. With the innovative combination of Compound AI and AI Agents on Azure Databricks, businesses can now achieve more accurate, comprehensive, and adaptable taxonomies that genuinely align with their needs. This modular, tool-augmented approach to AI represents a powerful leap forward in managing and leveraging an organization's most valuable asset: its data.