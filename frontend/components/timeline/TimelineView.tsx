"use client";
import { useMemo, useState } from "react";
import { CalendarX } from "lucide-react";
import TimelineItem from "@/components/timeline/TimelineItem";
import { sampleTimeline } from "@/lib/sample-timeline";
import { sampleDecisions } from "@/lib/sample-data";

export default function TimelineView() {
  const [decisionId, setDecisionId] = useState<string>("all");

  const events = useMemo(() => {
    return sampleTimeline
      .filter((e) => decisionId === "all" || e.decisionId === decisionId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [decisionId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          {events.length} {events.length === 1 ? "event" : "events"}
        </span>

        <select
          value={decisionId}
          onChange={(e) => setDecisionId(e.target.value)}
          aria-label="Filter timeline by decision"
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "8px 12px",
            fontSize: "13px",
            color: "var(--text-primary)",
            cursor: "pointer",
            outline: "none",
            maxWidth: "320px",
          }}
        >
          <option value="all">All events</option>
          {sampleDecisions.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>
      </div>

      {events.length === 0 ? (
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
          <CalendarX size={28} color="var(--text-muted)" />
          <h4 style={{ fontSize: "15px", color: "var(--text-primary)", marginTop: "12px", marginBottom: "6px" }}>
            No events yet
          </h4>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            Events will appear here once documents are processed.
          </p>
        </div>
      ) : (
        <div>
          {events.map((event, index) => (
            <TimelineItem key={event.id} event={event} isLast={index === events.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}
