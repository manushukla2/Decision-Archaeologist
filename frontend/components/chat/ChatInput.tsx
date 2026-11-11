"use client";
import { useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

type Props = {
  onSend: (text: string) => void;
  disabled: boolean;
};

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const canSend = value.trim().length > 0 && !disabled;

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
    if (ref.current) ref.current.style.height = "auto";
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",
        backgroundColor: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "10px 10px 10px 16px",
      }}
    >
      <textarea
        ref={ref}
        rows={1}
        value={value}
        maxLength={1000}
        placeholder="Ask about a past decision"
        onChange={(e) => {
          setValue(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        style={{
          flex: 1,
          resize: "none",
          background: "none",
          border: "none",
          outline: "none",
          padding: "8px 0",
          fontSize: "14px",
          lineHeight: 1.5,
          color: "var(--text-primary)",
          fontFamily: "inherit",
        }}
      />
      <button
        type="button"
        onClick={submit}
        disabled={!canSend}
        aria-label="Send message"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "var(--radius-md)",
          border: "none",
          backgroundColor: "var(--primary)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: canSend ? "pointer" : "not-allowed",
          opacity: canSend ? 1 : 0.5,
          flexShrink: 0,
        }}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
