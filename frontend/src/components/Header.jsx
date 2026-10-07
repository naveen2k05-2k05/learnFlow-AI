export default function Header({ backendOnline }) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark">L</div>
        <div>
          <div className="brand-name">LearnFlow AI</div>
          <div className="brand-subtitle">Learn from your documents</div>
        </div>
      </div>

      <div className="connection-status">
        <span className={`status-dot ${backendOnline ? "online" : "offline"}`} />
        <span>{backendOnline ? "System ready" : "Backend offline"}</span>
      </div>
    </header>
  );
}
