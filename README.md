# LearnFlow AI

LearnFlow AI is a local AI-powered PDF question-answering application built using **Retrieval-Augmented Generation (RAG)**.

It allows users to upload PDF documents and interact with them through natural-language questions. The application extracts document content, creates semantic embeddings, stores them in a FAISS vector index, retrieves the most relevant content, and generates context-aware responses using a local **Ollama + Llama 2** model.

## Overview

LearnFlow AI is designed to make long PDF documents easier to understand and query without manually searching through hundreds of pages.

The application provides:

- PDF document upload
- Automatic PDF text extraction
- Document chunking
- Hugging Face embeddings
- FAISS vector indexing
- Semantic similarity search
- Top-3 relevant chunk retrieval
- Local LLM inference using Ollama
- Llama 2-powered responses
- Conversational follow-up questions
- Session-based conversation context
- Clear chat functionality
- Document/session reset
- Responsive modern AI-product interface

## RAG Pipeline

```text
PDF Upload
    ↓
PyPDFLoader
    ↓
Document Text Extraction
    ↓
Recursive Character Text Splitting
    ↓
Hugging Face Embeddings
    ↓
FAISS Vector Store
    ↓
Similarity Search
    ↓
Top 3 Relevant Chunks
    ↓
Context Construction
    ↓
Conversation Context
    ↓
Ollama
    ↓
Llama 2
    ↓
Context-Aware Answer
