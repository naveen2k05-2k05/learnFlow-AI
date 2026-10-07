import { useRef } from "react";

export default function UploadPanel({ onUpload, uploadState, hasDocument }) {
  const inputRef = useRef(null);
  const isProcessing = uploadState === "uploading";

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (file) onUpload(file);
    event.target.value = "";
  }

  return (
    <section className="upload-panel">
      <div className="section-heading">
        <span className="eyebrow">DOCUMENT</span>
        <h2>Add a PDF</h2>
        <p>Upload a document and start asking questions about its contents.</p>
      </div>

      <button
        className="upload-dropzone"
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isProcessing}
      >
        <span className="upload-icon">↑</span>
        <strong>
          {isProcessing
            ? "Processing document..."
            : hasDocument
              ? "Upload another PDF"
              : "Choose a PDF"}
        </strong>
        <span>
          {isProcessing
            ? "Preparing your document"
            : "PDF files up to 25 MB"}
        </span>
      </button>

      <input
        ref={inputRef}
        className="visually-hidden"
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFileChange}
      />
    </section>
  );
}
