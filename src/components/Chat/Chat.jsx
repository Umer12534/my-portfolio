import { useState, useRef, useEffect } from "react";
import "./Chat.css";

const BOT_NAME = "Umer's Assistant";
const SYSTEM_PROMPT = `You are a helpful AI assistant embedded in Umer's developer portfolio. 
Umer (Syed Umer Zubair) is a Full Stack Developer from Gujrat, Pakistan, skilled in the MERN stack, 
computer vision (YOLOv8, OpenCV, MediaPipe), and AI integration. 
He completed his BS in IT and is preparing for an MS in AI & Robotics.
Answer questions about Umer's skills, projects, and background in a friendly, concise way. 
If asked things unrelated to Umer or development, still help but keep it brief.`;

const SUGGESTIONS = [
  "What tech stack does Umer use?",
  "Tell me about his projects",
  "Is he open to work?",
];

function TypingDots() {
  return (
    <div className="pc-typing">
      <span />
      <span />
      <span />
    </div>
  );
}

function Message({ msg }) {
  const isBot = msg.role === "assistant";
  return (
    <div className={`pc-message-row ${isBot ? "pc-bot-row" : "pc-user-row"}`}>
      {isBot && (
        <div className="pc-avatar">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="3" y="8" width="18" height="13" rx="3" />
            <path d="M8 8V5a4 4 0 0 1 8 0v3" />
            <circle cx="9" cy="14" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="15" cy="14" r="1.2" fill="currentColor" stroke="none" />
            <path d="M9 18h6" strokeLinecap="round" />
          </svg>
        </div>
      )}
      <div
        className={`pc-bubble ${isBot ? "pc-bubble-bot" : "pc-bubble-user"}`}
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! I'm Umer's AI assistant. Ask me anything about his skills, projects, or background 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  async function sendMessage(text) {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      const reply =
        data.content?.find((b) => b.type === "text")?.text ||
        "Sorry, I couldn't respond.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        className={`pc-fab ${open ? "pc-fab-active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
            <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
            <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
          </svg>
        )}
        {!open && <span className="pc-fab-ping" />}
      </button>

      {/* ── Chat Window ── */}
      <div
        className={`pc-window ${open ? "pc-window-open" : ""}`}
        role="dialog"
        aria-label="Chat with Umer's assistant"
      >
        {/* Header */}
        <div className="pc-header">
          <div className="pc-header-avatar">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="8" width="18" height="13" rx="3" />
              <path d="M8 8V5a4 4 0 0 1 8 0v3" />
              <circle
                cx="9"
                cy="14"
                r="1.2"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="15"
                cy="14"
                r="1.2"
                fill="currentColor"
                stroke="none"
              />
              <path d="M9 18h6" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="pc-header-name">{BOT_NAME}</p>
            <p className="pc-header-status">
              <span className="pc-status-dot" />
              Online
            </p>
          </div>
          <button
            className="pc-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="pc-messages">
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}
          {loading && (
            <div className="pc-message-row pc-bot-row">
              <div className="pc-avatar">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="8" width="18" height="13" rx="3" />
                  <path d="M8 8V5a4 4 0 0 1 8 0v3" />
                  <circle
                    cx="9"
                    cy="14"
                    r="1.2"
                    fill="currentColor"
                    stroke="none"
                  />
                  <circle
                    cx="15"
                    cy="14"
                    r="1.2"
                    fill="currentColor"
                    stroke="none"
                  />
                  <path d="M9 18h6" strokeLinecap="round" />
                </svg>
              </div>
              <div className="pc-bubble pc-bubble-bot">
                <TypingDots />
              </div>
            </div>
          )}
          {error && <p className="pc-error">{error}</p>}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions (only at start) */}
        {messages.length === 1 && !loading && (
          <div className="pc-suggestions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="pc-suggestion-chip"
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="pc-input-row">
          <textarea
            ref={inputRef}
            className="pc-input"
            placeholder="Ask me anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            disabled={loading}
          />
          <button
            className="pc-send-btn"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            aria-label="Send"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 2 11 13" strokeLinecap="round" />
              <path
                d="M22 2 15 22 11 13 2 9l20-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
