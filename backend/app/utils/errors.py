class LearnFlowError(Exception):
    """Base application error."""


class InvalidDocumentError(LearnFlowError):
    """Raised when an uploaded document cannot be processed."""


class SessionNotFoundError(LearnFlowError):
    """Raised when a requested session does not exist."""


class RAGNotReadyError(LearnFlowError):
    """Raised when chat is requested before a document is ready."""
