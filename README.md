# LearnFlow AI

LearnFlow AI is a local AI-powered PDF question-answering application built around Retrieval-Augmented Generation (RAG).

## Current Status

Phase 1 — Application foundation.

Included:
- React + Vite frontend
- FastAPI backend
- PDF upload validation
- Session management foundation
- Responsive AI-product-style interface
- Backend health monitoring
- Clear chat/reset controls
- Environment configuration
- GitHub-ready project structure

The complete RAG pipeline is added in subsequent phases.

## Planned RAG Pipeline

```text
PDF
 ↓
PyPDFLoader
 ↓
Document Extraction
 ↓
Recursive Character Text Splitting
 ↓
Hugging Face Embeddings
 ↓
FAISS
 ↓
Similarity Search
 ↓
Top 3 Chunks
 ↓
Context Construction
 ↓
Ollama
 ↓
Llama 2
 ↓
Context-Aware Answer
```

## Technology Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Python
- FastAPI
- Pydantic

### AI / RAG
- LangChain
- PyPDFLoader
- Hugging Face embeddings
- FAISS
- Ollama
- Llama 2

## Requirements

- Python 3.11+
- Node.js 20.19+ or 22.12+
- npm
- Ollama
- Llama 2 model

## Installation

### Backend

```bash
cd backend
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
```

Then:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend:
`http://127.0.0.1:8000`

Health:
`http://127.0.0.1:8000/api/health`

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
`http://127.0.0.1:5173`

## Ollama

Install Ollama separately and pull the requested model:

```bash
ollama pull llama2
```

## Usage

1. Start Ollama.
2. Start the FastAPI backend.
3. Start the React frontend.
4. Upload a PDF.
5. Continue with questions after the RAG pipeline is enabled.

## Performance

The intended architecture processes and embeds a document once during upload, builds a FAISS index once, and reuses it for subsequent questions.

## Limitations

- Local inference depends on available hardware.
- Very large documents can take significant time to process.
- Scanned/image-only PDFs require OCR support, which is not included in Phase 1.
- Session state is currently in memory.
- Production-scale multi-user deployment is outside the scope of the initial version.

## Future Improvements

- Persistent document storage
- Redis-backed sessions
- PostgreSQL metadata
- Streaming responses
- Retrieval evaluation
- Reranking
- Hybrid retrieval
- OCR
- Citation highlighting
- Authentication
- Background processing
- Production vector database

## License

MIT License.
