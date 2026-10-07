# LearnFlow AI

> AI-powered PDF Question Answering using Retrieval-Augmented Generation (RAG), FAISS, Hugging Face embeddings, and a local Llama 2 model through Ollama.

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.14+-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/LangChain-RAG-1C3C3C?style=for-the-badge" />
  <img src="https://img.shields.io/badge/FAISS-Vector%20Search-0467DF?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Ollama-Local%20LLM-black?style=for-the-badge" />
</p>

---

## Overview

**LearnFlow AI** is a local AI-powered document assistant that allows users to upload PDF documents and interact with them using natural language.

Instead of manually searching through lengthy documents, LearnFlow AI uses **Retrieval-Augmented Generation (RAG)** to find the most relevant sections of the uploaded document and provide context-aware answers using a locally running **Llama 2** model.

### What it solves

| Problem | LearnFlow AI |
|---|---|
| Searching long PDFs manually | Semantic document retrieval |
| Finding relevant information | FAISS vector similarity search |
| Understanding document context | Hugging Face embeddings |
| Generating answers | Local Llama 2 via Ollama |
| Follow-up questions | Conversational context |
| Sending documents to external AI APIs | Local processing |

---

## How It Works

```text
                    ┌─────────────────────┐
                    │      PDF Upload     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    PyPDFLoader      │
                    │   Extract Content   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Text Splitter       │
                    │ Chunks + Overlap    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Hugging Face        │
                    │ Embeddings          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      FAISS          │
                    │  Vector Database    │
                    └──────────┬──────────┘
                               │
                     User Question
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Similarity Search   │
                    │    Top-K Chunks     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Ollama + Llama 2  │
                    │   Local Generation  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Contextual Answer   │
                    └─────────────────────┘
