"use client";
import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import type { DocumentFileType } from "@/types";

const ALLOWED: DocumentFileType[] = ["pdf", "docx", "txt", "md", "csv"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

type Props = {
  onFilesSelected: (files: File[]) => void;
};

function getExtension(name: string): string {
  const parts = name.toLowerCase().split(".");
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

export default function DocumentUpload({ onFilesSelected }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;

    const valid: File[] = [];
    const problems: string[] = [];

    Array.from(list).forEach((file) => {
      const ext = getExtension(file.name);
      if (!ALLOWED.includes(ext as DocumentFileType)) {
        problems.push(file.name + ": unsupported file type");
      } else if (file.size > MAX_SIZE_BYTES) {
        problems.push(file.name + ": larger than 10 MB");
      } else if (file.size === 0) {
        problems.push(file.name + ": file is empty");
      } else {
        valid.push(file);
      }
    });

    setErrors(problems);
    if (valid.length > 0) onFilesSelected(valid);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "48px 24px",
          borderRadius: "var(--radius-lg)",
          border: "2px dashed " + (dragging ? "var(--primary)" : "var(--border-strong)"),
          backgroundColor: dragging ? "var(--primary-subtle)" : "var(--bg-surface)",
          cursor: "pointer",
          transition: "background 0.15s, border-color 0.15s",
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
            marginBottom: "16px",
          }}
        >
          <UploadCloud size={24} color="var(--primary)" />
        </div>
        <h4 style={{ fontSize: "16px", color: "var(--text-primary)", marginBottom: "6px" }}>
          Drag and drop files here
        </h4>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>
          or <span style={{ color: "var(--primary)", fontWeight: 500 }}>browse your computer</span>
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          PDF, DOCX, TXT, Markdown or CSV. Up to 10 MB each.
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt,.md,.csv"
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: "none" }}
        />
      </div>

      {errors.length > 0 && (
        <div
          style={{
            marginTop: "12px",
            border: "1px solid var(--danger)",
            borderRadius: "var(--radius-md)",
            padding: "10px 14px",
            fontSize: "13px",
            color: "var(--danger)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {errors.map((err, i) => (
            <div key={i}>{err}</div>
          ))}
        </div>
      )}
    </div>
  );
}
