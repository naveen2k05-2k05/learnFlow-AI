import { useCallback, useState } from "react";

import {
  clearChat,
  resetSession,
  sendQuestion,
  uploadDocument,
} from "../services/api";

export function useLearnFlow() {
  const [sessionId, setSessionId] = useState(null);
  const [document, setDocument] = useState(null);
  const [messages, setMessages] = useState([]);

  const [uploadState, setUploadState] = useState("idle");
  const [chatState, setChatState] = useState("idle");
  const [error, setError] = useState(null);

  const handleUpload = useCallback(async (file) => {
    setError(null);
    setUploadState("uploading");

    try {
      const result = await uploadDocument(file);

      setSessionId(result.session_id);
      setDocument({
        filename: result.filename,
        fileSize: result.file_size,
        pages: result.pages,
        chunks: result.chunks,
        status: result.status,
      });

      setMessages([]);
      setUploadState("ready");
    } catch (err) {
      setUploadState("error");
      setError(err.message);
    }
  }, []);

  const handleQuestion = useCallback(
    async (question) => {
      if (!sessionId || !question.trim()) return;

      const userMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: question.trim(),
      };

      setMessages((current) => [...current, userMessage]);
      setChatState("answering");
      setError(null);

      try {
        const result = await sendQuestion(sessionId, question.trim());

        const assistantMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: result.answer,
          sources: result.sources || [],
        };

        setMessages((current) => [...current, assistantMessage]);
        setChatState("idle");
      } catch (err) {
        setChatState("error");
        setError(err.message);
      }
    },
    [sessionId]
  );

  const handleClearChat = useCallback(async () => {
    if (!sessionId) return;

    try {
      await clearChat(sessionId);
      setMessages([]);
      setError(null);
      setChatState("idle");
    } catch (err) {
      setError(err.message);
    }
  }, [sessionId]);

  const handleReset = useCallback(async () => {
    if (sessionId) {
      try {
        await resetSession(sessionId);
      } catch {
        // Local reset still happens if the backend session disappeared.
      }
    }

    setSessionId(null);
    setDocument(null);
    setMessages([]);
    setUploadState("idle");
    setChatState("idle");
    setError(null);
  }, [sessionId]);

  return {
    sessionId,
    document,
    messages,
    uploadState,
    chatState,
    error,
    handleUpload,
    handleQuestion,
    handleClearChat,
    handleReset,
  };
}
