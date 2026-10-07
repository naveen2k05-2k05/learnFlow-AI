export default function EmptyState({ hasDocument }) {
  if (hasDocument) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✦</div>
        <h2>Ask anything about your document</h2>
        <p>
          Ask for a summary, explanation, key points, or specific information
          from the uploaded PDF.
        </p>

        <div className="suggestion-grid">
          <div>What is this document about?</div>
          <div>Summarize the main points.</div>
          <div>What are the key conclusions?</div>
        </div>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <div className="empty-icon">L</div>
      <h2>Your document, ready to explore</h2>
      <p>
        Upload a PDF from the panel to create a searchable knowledge base and
        start a conversation.
      </p>
    </div>
  );
}
