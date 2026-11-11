"use client";
import { useState } from "react";
import { Bot, User, Info, ChevronDown, ChevronUp } from "lucide-react";
import CitationCard from "@/components/chat/CitationCard";
import type { ChatMessageItem } from "@/types";

export default function ChatMessage({ message }: { message: ChatMessageItem }) {
  const [open, setOpen] = useState(true);
  const isUser = message.role === "user";
  const citations = message.citations ?? [];

  return (
    <div style={{ display: "flex", gap: "12px", flexDirection: isUser ? "row-reverse" : "row" }}>
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isUser ? "var(--bg-elevated)" : "var(--primary-subtle)",
          border: "1px solid " + (isUser ? "var(--border)" : "var(--primary-border)"),
        }}
      >
        {isUser ? <User size={16} color="var(--text-secondary)" /> : <Bot size={16} color="var(--primary)" />}
      </div>

      <div
        style={{
          maxWidth: "85%",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: isUser ? "flex-end" : "flex-start",
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "var(--radius-lg)",
            fontSize: "14px",
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            backgroundColor: isUser ? "var(--primary)" : "var(--bg-surface)",
            color: isUser ? "white" : "var(--text-primary)",
            border: isUser ? "none" : "1px solid var(--border)",
          }}
        >
          {message.content}
        </div>

        {!isUser && message.uncertain && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "var(--primary)",
            }}
          >
            <Info size={13} />
            Not fully certain. Please verify with the sources.
          </span>
        )}

        {!isUser && citations.length > 0 && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                alignSelf: "flex-start",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--text-secondary)",
              }}
            >
              Sources ({citations.length})
              {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {open &&
              citations.map((c, i) => <CitationCard key={c.id} citation={c} index={i + 1} />)}
          </div>
        )}
      </div>
    </div>
  );
}
