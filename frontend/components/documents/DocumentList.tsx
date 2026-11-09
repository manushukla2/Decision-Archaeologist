"use client";
import { useState } from "react";
import { FileText } from "lucide-react";
import DocumentUpload from "@/components/documents/DocumentUpload";
import DocumentCard from "@/components/documents/DocumentCard";
import type { DocumentItem, DocumentFileType } from "@/types";

function getFileType(name: string): DocumentFileType {
  const ext = name.toLowerCase().split(".").pop() ?? "";
  return (["pdf", "docx", "txt", "md", "csv"].includes(ext) ? ext : "txt") as DocumentFileType;
}

export default function DocumentList() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  const handleFilesSelected = (files: File[]) => {
    const items: DocumentItem[] = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      fileType: getFileType(file.name),
      sizeBytes: file.size,
      status: "uploaded",
      uploadedAt: new Date().toISOString(),
    }));
    setDocuments((prev) => [...items, ...prev]);
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <DocumentUpload onFilesSelected={handleFilesSelected} />

      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <h3 style={{ fontSize: "16px", color: "var(--text-primary)" }}>Your documents</h3>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            {documents.length} {documents.length === 1 ? "file" : "files"}
          </span>
        </div>

        {documents.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "40px 16px",
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <FileText size={28} color="var(--text-muted)" />
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "12px" }}>
              No documents yet. Upload your first file above.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {documents.map((doc) => (
              <DocumentCard key={doc.id} document={doc} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
