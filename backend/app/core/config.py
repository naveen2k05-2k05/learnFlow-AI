from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "LearnFlow AI"
    app_env: str = "development"

    backend_host: str = "127.0.0.1"
    backend_port: int = 8000

    ollama_base_url: str = "http://127.0.0.1:11434"
    ollama_model: str = "llama2"

    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    embedding_device: str = "cpu"

    retrieval_k: int = 3
    chunk_size: int = 1000
    chunk_overlap: int = 150

    max_upload_size_mb: int = 25

    frontend_origin: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def max_upload_size_bytes(self) -> int:
        return self.max_upload_size_mb * 1024 * 1024


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
