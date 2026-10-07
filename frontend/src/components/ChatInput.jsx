import { useState } from "react";

export default function ChatInput({ onSubmit, disabled, isAnswering }) {
  const [question, setQuestion] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const value = question.trim();

    if (!value || disabled) return;

    onSubmit(value);
    setQuestion("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return (
    <form className="chat-input-wrapper" onSubmit={handleSubmit}>
      <textarea
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          disabled
            ? "Upload a PDF to start asking questions..."
            : "Ask a question about your document..."
        }
        disabled={disabled}
        rows={1}
        aria-label="Ask a question"
      />

      <button
        className="send-button"
        type="submit"
        disabled={disabled || isAnswering || !question.trim()}
      >
        {isAnswering ? "..." : "Send"}
      </button>
    </form>
  );
}
