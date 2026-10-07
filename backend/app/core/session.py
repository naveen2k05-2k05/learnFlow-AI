from dataclasses import dataclass, field
from typing import Any


@dataclass
class SessionState:
    session_id: str
    filename: str | None = None
    file_size: int | None = None
    page_count: int = 0
    chunk_count: int = 0
    vector_store: Any | None = None
    conversation: list[dict[str, str]] = field(default_factory=list)
    status: str = "empty"


class SessionManager:
    def __init__(self) -> None:
        self._sessions: dict[str, SessionState] = {}

    def create(self, session_id: str) -> SessionState:
        session = SessionState(session_id=session_id)
        self._sessions[session_id] = session
        return session

    def get(self, session_id: str) -> SessionState | None:
        return self._sessions.get(session_id)

    def get_or_create(self, session_id: str) -> SessionState:
        existing = self.get(session_id)
        if existing is not None:
            return existing
        return self.create(session_id)

    def clear_chat(self, session_id: str) -> SessionState:
        session = self.get_or_create(session_id)
        session.conversation.clear()
        return session

    def reset(self, session_id: str) -> None:
        self._sessions.pop(session_id, None)


session_manager = SessionManager()
