import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me any disaster-related question in English." },
  ]);
  const [loading, setLoading] = useState(false);

  // 🔑 Replace this with your real Gemini API key
  const GEMINI_API_KEY = "AIzaSyAB6-Z5g6RlTAleDsBiYpKf7zEmSnLeZIA";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  async function handleSend() {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setLoading(true);

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: input }],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
        "Sorry, I couldn't get an answer.";

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `Error: ${error.message}` },
      ]);
    }

    setInput("");
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="container" style={{ maxWidth: "700px", marginTop: "40px" }}>
      <h2 className="mb-4 text-center">AI Disaster Assistant</h2>
      <div
        className="border rounded p-3 mb-3"
        style={{ height: "400px", overflowY: "auto", backgroundColor: "#f8f9fa" }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`d-flex mb-3 ${
              msg.from === "user" ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <div
              className={`p-2 rounded ${
                msg.from === "user" ? "bg-primary text-white" : "bg-light text-dark"
              }`}
              style={{ maxWidth: "70%", whiteSpace: "pre-wrap" }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-center text-muted">Typing...</div>}
      </div>

      <textarea
        className="form-control mb-2"
        rows={3}
        placeholder="Ask your disaster-related question here (in English)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button
        className="btn btn-primary w-100"
        onClick={handleSend}
        disabled={loading || !input.trim()}
      >
        Send
      </button>
    </div>
  );
}
