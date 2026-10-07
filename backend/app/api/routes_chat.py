from fastapi import APIRouter, HTTPException

from app.core.session import session_manager
from app.models.schemas import ChatRequest, ChatResponse, SessionResponse

router = APIRouter(prefix="/api", tags=["Chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    session = session_manager.get(request.session_id)

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Session not found. Upload a document first.",
        )

    if session.vector_store is None:
        raise HTTPException(
            status_code=409,
            detail="The document is not ready for questions yet.",
        )

    raise HTTPException(
        status_code=501,
        detail="RAG chat pipeline is not implemented in this phase.",
    )


@router.post("/chat/clear", response_model=SessionResponse)
async def clear_chat(request: ChatRequest) -> SessionResponse:
    session = session_manager.get(request.session_id)

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Session not found.",
        )

    session_manager.clear_chat(request.session_id)

    return SessionResponse(
        session_id=request.session_id,
        status=session.status,
        message="Conversation history cleared.",
    )


@router.post("/session/reset", response_model=SessionResponse)
async def reset_session(request: ChatRequest) -> SessionResponse:
    session_manager.reset(request.session_id)

    return SessionResponse(
        session_id=request.session_id,
        status="reset",
        message="Session and document state reset.",
    )
