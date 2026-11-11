import { Building2, Users } from "lucide-react";

const cardStyle: React.CSSProperties = {
  backgroundColor: "var(--bg-surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-lg)",
  padding: "24px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--text-primary)",
  marginBottom: "6px",
};

const disabledInput: React.CSSProperties = {
  width: "100%",
  backgroundColor: "var(--bg-elevated)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  padding: "11px 14px",
  fontSize: "14px",
  color: "var(--text-primary)",
  opacity: 0.6,
  cursor: "not-allowed",
};

function ComingSoon() {
  return (
    <span
      style={{
        fontSize: "11px",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        color: "var(--primary)",
        backgroundColor: "var(--primary-subtle)",
        border: "1px solid var(--primary-border)",
        borderRadius: "var(--radius-sm)",
        padding: "2px 8px",
      }}
    >
      Coming soon
    </span>
  );
}

export default function OrgSettings() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <section style={cardStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "4px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Building2 size={18} color="var(--primary)" />
            <h3 style={{ fontSize: "16px", color: "var(--text-primary)" }}>Organization</h3>
          </div>
          <ComingSoon />
        </div>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.6 }}>
          Each organization keeps its own isolated decision memory. This becomes editable once the database
          is connected.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Organization name</label>
            <input type="text" disabled placeholder="Your organization" style={disabledInput} />
          </div>
          <div>
            <label style={labelStyle}>Your role</label>
            <input type="text" disabled value="Owner" readOnly style={disabledInput} />
          </div>
        </div>
      </section>

      <section style={cardStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "4px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Users size={18} color="var(--primary)" />
            <h3 style={{ fontSize: "16px", color: "var(--text-primary)" }}>Team members</h3>
          </div>
          <ComingSoon />
        </div>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Inviting teammates is planned for a later version.
        </p>
      </section>
    </div>
  );
}
