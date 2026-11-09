"use client";
import { Search, Flag } from "lucide-react";
import type { DecisionStatus } from "@/types";

export type StatusFilter = DecisionStatus | "all";

export interface DecisionFilterState {
  query: string;
  status: StatusFilter;
  project: string;
  needsReviewOnly: boolean;
}

type Props = {
  filters: DecisionFilterState;
  projects: string[];
  onChange: (next: DecisionFilterState) => void;
};

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
  { value: "draft", label: "Draft" },
];

export default function DecisionFilters({ filters, projects, onChange }: Props) {
  const update = (patch: Partial<DecisionFilterState>) => onChange({ ...filters, ...patch });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: "0 14px",
        }}
      >
        <Search size={16} color="var(--text-muted)" />
        <input
          type="text"
          value={filters.query}
          onChange={(e) => update({ query: e.target.value })}
          placeholder="Search decisions, reasons or people"
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            padding: "12px 0",
            fontSize: "14px",
            color: "var(--text-primary)",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {statusOptions.map((opt) => {
            const active = filters.status === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => update({ status: opt.value })}
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "1px solid " + (active ? "var(--primary)" : "var(--border-strong)"),
                  backgroundColor: active ? "var(--primary-subtle)" : "transparent",
                  color: active ? "var(--primary)" : "var(--text-secondary)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto", flexWrap: "wrap" }}>
          <select
            value={filters.project}
            onChange={(e) => update({ project: e.target.value })}
            aria-label="Filter by project"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "8px 12px",
              fontSize: "13px",
              color: "var(--text-primary)",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="all">All projects</option>
            {projects.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => update({ needsReviewOnly: !filters.needsReviewOnly })}
            aria-pressed={filters.needsReviewOnly}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "var(--radius-md)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              border: "1px solid " + (filters.needsReviewOnly ? "var(--primary)" : "var(--border-strong)"),
              backgroundColor: filters.needsReviewOnly ? "var(--primary-subtle)" : "transparent",
              color: filters.needsReviewOnly ? "var(--primary)" : "var(--text-secondary)",
            }}
          >
            <Flag size={14} />
            Needs review
          </button>
        </div>
      </div>
    </div>
  );
}
