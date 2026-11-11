"use client";
import { useEffect, useRef, useState } from "react";
import { Info, Loader2, MessageSquare, RotateCcw } from "lucide-react";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { getDemoReply, suggestedQuestions } from "@/lib/sample-chat";
import type { ChatMessageItem } from "@/types";

export default function ChatView() {
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSend = (text: string) => {
    const userMessage: ChatMessageItem = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    timerRef.current = setTimeout(() => {
      const reply = getDemoReply(text);
      const assistantMessage: ChatMessageItem = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: reply.content,
        citations: reply.citations,
        uncertain: reply.uncertain,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 700);
  };

  const handleClear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessages([]);
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", height: "calc(100vh - 150px)", minHeight: "460px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          backgroundColor: "var(--primary-subtle)",
          border: "1px solid var(--primary-border)",
          borderRadius: "var(--radius-md)",
          padding: "10px 14px",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-primary)", lineHeight: 1.5 }}>
          <Info size={15} color="var(--primary)" style={{ flexShrink: 0 }} />
          Demo mode: answers come from built-in sample data, not a real AI yet.
        </span>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-secondary)",
              whiteSpace: "nowrap",
            }}
          >
            <RotateCcw size={13} />
            Clear chat
          </button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px", paddingRight: "4px" }}>
        {messages.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "12px",
              padding: "24px 0",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "var(--primary-subtle)",
                border: "1px solid var(--primary-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageSquare size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: "18px", color: "var(--text-primary)" }}>Ask your decision memory</h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "420px", lineHeight: 1.6 }}>
              Ask why something was decided, who was involved, or whether old reasons still hold. Every answer
              shows its sources.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px", width: "100%", maxWidth: "460px" }}>
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSend(q)}
                  disabled={loading}
                  style={{
                    textAlign: "left",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-strong)",
                    backgroundColor: "var(--bg-surface)",
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => <ChatMessage key={m.id} message={m} />)
        )}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-secondary)" }}>
            <Loader2 size={16} color="var(--primary)" className="animate-spin" />
            Searching your documents...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
