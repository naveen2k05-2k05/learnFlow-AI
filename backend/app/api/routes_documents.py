from uuid import uuid4

from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.core.config import settings
from app.core.session import session_manager
from app.models.schemas import UploadResponse

router = APIRouter(prefix="/api/documents", tags=["Documents"])


@router.post(
    "/upload",
    response_model=UploadResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_document(file: UploadFile = File(...)) -> UploadResponse:
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A PDF file is required.",
        )

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Only PDF files are supported.",
        )

    contents = await file.read()

    if not contents:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded PDF is empty.",
        )

    if len(contents) > settings.max_upload_size_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=(
                f"PDF exceeds the {settings.max_upload_size_mb} MB "
                "upload limit."
            ),
        )

    session_id = str(uuid4())
    session = session_manager.create(session_id)

    session.filename = file.filename
    session.file_size = len(contents)
    session.status = "uploaded"

    return UploadResponse(
        session_id=session_id,
        filename=file.filename,
        file_size=len(contents),
        pages=0,
        chunks=0,
        status="uploaded",
    )
