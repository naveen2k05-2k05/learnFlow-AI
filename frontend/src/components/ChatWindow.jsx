import ChatMessage from "./ChatMessage";
import EmptyState from "./EmptyState";

export default function ChatWindow({ messages, hasDocument }) {
  if (messages.length === 0) {
    return (
      <main className="chat-window">
        <EmptyState hasDocument={hasDocument} />
      </main>
    );
  }

  return (
    <main className="chat-window">
      <div className="messages-list">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </main>
  );
}
