import DocumentStatus from "./DocumentStatus";
import UploadPanel from "./UploadPanel";

export default function Sidebar({
  document,
  uploadState,
  onUpload,
  onClearChat,
  onReset,
  hasMessages,
}) {
  return (
    <aside className="sidebar">
      <UploadPanel
        onUpload={onUpload}
        uploadState={uploadState}
        hasDocument={Boolean(document)}
      />

      <DocumentStatus document={document} />

      {document && (
        <div className="sidebar-actions">
          <button
            className="secondary-button"
            type="button"
            onClick={onClearChat}
            disabled={!hasMessages}
          >
            Clear chat
          </button>

          <button
            className="danger-button"
            type="button"
            onClick={onReset}
          >
            Reset document
          </button>
        </div>
      )}
    </aside>
  );
}
