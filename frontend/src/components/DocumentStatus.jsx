function formatBytes(bytes) {
  if (!bytes) return "—";
  const megabytes = bytes / (1024 * 1024);
  return `${megabytes.toFixed(1)} MB`;
}

export default function DocumentStatus({ document }) {
  if (!document) {
    return (
      <div className="document-empty">
        <span className="document-icon">PDF</span>
        <div>
          <strong>No document loaded</strong>
          <span>Upload a PDF to begin.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="document-card">
      <div className="document-card-header">
        <span className="document-icon">PDF</span>
        <span className="ready-badge">Ready</span>
      </div>

      <div className="document-name" title={document.filename}>
        {document.filename}
      </div>

      <div className="document-meta">
        <span>{formatBytes(document.fileSize)}</span>
        <span>{document.pages ? `${document.pages} pages` : "Processing metadata"}</span>
      </div>
    </div>
  );
}
