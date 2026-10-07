export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <article className={`chat-message ${isUser ? "user-message" : "assistant-message"}`}>
      <div className="message-avatar">{isUser ? "You" : "AI"}</div>

      <div className="message-body">
        <div className="message-label">{isUser ? "You" : "LearnFlow AI"}</div>
        <div className="message-content">{message.content}</div>

        {!isUser && message.sources?.length > 0 && (
          <div className="source-list">
            {message.sources.map((source, index) => (
              <span key={`${source.page}-${index}`}>Page {source.page}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
