import { useEffect, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

import { checkHealth } from "./services/api";
import { useLearnFlow } from "./hooks/useLearnFlow";

export default function App() {
  const {
    document,
    messages,
    uploadState,
    chatState,
    error,
    handleUpload,
    handleQuestion,
    handleClearChat,
    handleReset,
  } = useLearnFlow();

  const [backendOnline, setBackendOnline] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkBackend() {
      try {
        await checkHealth();
        if (mounted) setBackendOnline(true);
      } catch {
        if (mounted) setBackendOnline(false);
      }
    }

    checkBackend();

    const interval = window.setInterval(checkBackend, 15000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="app-shell">
      <Header backendOnline={backendOnline} />

      <div className="app-layout">
        <Sidebar
          document={document}
          uploadState={uploadState}
          onUpload={handleUpload}
          onClearChat={handleClearChat}
          onReset={handleReset}
          hasMessages={messages.length > 0}
        />

        <section className="workspace">
          <div className="workspace-header">
            <div>
              <span className="eyebrow">CONVERSATION</span>
              <h1>{document ? "Explore your document" : "Start with a document"}</h1>
            </div>

            {document && (
              <div className="active-document">
                <span className="status-dot online" />
                <span>{document.filename}</span>
              </div>
            )}
          </div>

          {error && (
            <div className="error-banner" role="alert">
              <strong>Something went wrong.</strong>
              <span>{error}</span>
            </div>
          )}

          <ChatWindow messages={messages} hasDocument={Boolean(document)} />

          <ChatInput
            onSubmit={handleQuestion}
            disabled={!document || uploadState !== "ready" || !backendOnline}
            isAnswering={chatState === "answering"}
          />
        </section>
      </div>
    </div>
  );
}
