"use client";
import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import DecisionCard from "@/components/decisions/DecisionCard";
import DecisionFilters, { type DecisionFilterState } from "@/components/decisions/DecisionFilters";
import { sampleDecisions } from "@/lib/sample-data";

const defaultFilters: DecisionFilterState = {
  query: "",
  status: "all",
  project: "all",
  needsReviewOnly: false,
};

export default function DecisionList() {
  const [filters, setFilters] = useState<DecisionFilterState>(defaultFilters);

  const projects = useMemo(() => {
    const set = new Set<string>();
    sampleDecisions.forEach((d) => {
      if (d.project) set.add(d.project);
    });
    return Array.from(set).sort();
  }, []);

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return sampleDecisions
      .filter((d) => {
        if (filters.status !== "all" && d.status !== filters.status) return false;
        if (filters.project !== "all" && d.project !== filters.project) return false;
        if (filters.needsReviewOnly && !d.needsReview) return false;
        if (!q) return true;
        const haystack = [d.title, d.description, d.project ?? "", ...d.reasons, ...d.people]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filters]);

  const filtersActive =
    filters.query !== "" ||
    filters.status !== "all" ||
    filters.project !== "all" ||
    filters.needsReviewOnly;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <DecisionFilters filters={filters} projects={projects} onChange={setFilters} />

      <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
        {results.length} {results.length === 1 ? "decision" : "decisions"}
        {filtersActive ? " found" : ""}
      </div>

      {results.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "48px 16px",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <SearchX size={28} color="var(--text-muted)" />
          <h4 style={{ fontSize: "15px", color: "var(--text-primary)", marginTop: "12px", marginBottom: "6px" }}>
            No decisions match
          </h4>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>
            Try a different search or remove some filters.
          </p>
          {filtersActive && (
            <button
              type="button"
              onClick={() => setFilters(defaultFilters)}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-strong)",
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {results.map((d) => (
            <DecisionCard key={d.id} decision={d} />
          ))}
        </div>
      )}
    </div>
  );
}
