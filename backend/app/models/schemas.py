from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str
    service: str


class ChatRequest(BaseModel):
    session_id: str = Field(min_length=1, max_length=100)
    question: str = Field(min_length=1, max_length=4000)


class SourceInfo(BaseModel):
    page: int | None = None


class ChatResponse(BaseModel):
    session_id: str
    answer: str
    sources: list[SourceInfo] = []


class UploadResponse(BaseModel):
    session_id: str
    filename: str
    file_size: int
    pages: int
    chunks: int
    status: str


class SessionResponse(BaseModel):
    session_id: str
    status: str
    message: str
