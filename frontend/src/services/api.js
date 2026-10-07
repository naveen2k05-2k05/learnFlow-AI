const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return { detail: await response.text() };
}

async function request(url, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${url}`, options);
  } catch {
    throw new Error(
      "Unable to connect to the backend. Make sure FastAPI is running."
    );
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data?.detail || "The request could not be completed.");
  }

  return data;
}

export async function checkHealth() {
  return request("/api/health");
}

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  return request("/api/documents/upload", {
    method: "POST",
    body: formData,
  });
}

export async function sendQuestion(sessionId, question) {
  return request("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, question }),
  });
}

export async function clearChat(sessionId) {
  return request("/api/chat/clear", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      question: "clear",
    }),
  });
}

export async function resetSession(sessionId) {
  return request("/api/session/reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      question: "reset",
    }),
  });
}
