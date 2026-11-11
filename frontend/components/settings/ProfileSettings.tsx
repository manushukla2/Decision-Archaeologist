"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

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

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "var(--bg-elevated)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  padding: "11px 14px",
  fontSize: "14px",
  color: "var(--text-primary)",
  outline: "none",
};

const buttonStyle = (disabled: boolean): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "var(--primary)",
  color: "white",
  border: "none",
  borderRadius: "var(--radius-md)",
  padding: "10px 20px",
  fontSize: "14px",
  fontWeight: 500,
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.7 : 1,
  alignSelf: "flex-start",
});

function Message({ kind, text }: { kind: "error" | "success"; text: string }) {
  const color = kind === "error" ? "var(--danger)" : "var(--success)";
  return (
    <div
      style={{
        fontSize: "13px",
        color: color,
        border: "1px solid " + color,
        borderRadius: "var(--radius-md)",
        padding: "10px 12px",
      }}
    >
      {text}
    </div>
  );
}

export default function ProfileSettings() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  const [savingName, setSavingName] = useState(false);
  const [nameMsg, setNameMsg] = useState<{ kind: "error" | "success"; text: string } | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ kind: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      if (user) {
        setEmail(user.email ?? "");
        setFullName((user.user_metadata?.full_name as string) ?? "");
      }
      setLoadingUser(false);
    });
  }, []);

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameMsg(null);

    const trimmed = fullName.trim();
    if (!trimmed) {
      setNameMsg({ kind: "error", text: "Name cannot be empty." });
      return;
    }

    setSavingName(true);
    const { error } = await supabase.auth.updateUser({ data: { full_name: trimmed } });
    setSavingName(false);

    if (error) {
      setNameMsg({ kind: "error", text: error.message });
      return;
    }
    setFullName(trimmed);
    setNameMsg({ kind: "success", text: "Name updated. The sidebar will show it after a refresh." });
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 8) {
      setPasswordMsg({ kind: "error", text: "Password must be at least 8 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ kind: "error", text: "Passwords do not match." });
      return;
    }

    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);

    if (error) {
      setPasswordMsg({ kind: "error", text: error.message });
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMsg({ kind: "success", text: "Password updated." });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <section style={cardStyle}>
        <h3 style={{ fontSize: "16px", color: "var(--text-primary)", marginBottom: "4px" }}>Profile</h3>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>
          Your name is shown in the sidebar and on decisions you create.
        </p>

        <form onSubmit={handleSaveName} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Full name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loadingUser}
              placeholder={loadingUser ? "Loading..." : "Your name"}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              disabled
              style={{ ...inputStyle, opacity: 0.6, cursor: "not-allowed" }}
            />
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>
              Email cannot be changed here.
            </p>
          </div>

          {nameMsg && <Message kind={nameMsg.kind} text={nameMsg.text} />}

          <button type="submit" disabled={savingName || loadingUser} style={buttonStyle(savingName || loadingUser)}>
            {savingName && <Loader2 size={16} className="animate-spin" />}
            {savingName ? "Saving..." : "Save changes"}
          </button>
        </form>
      </section>

      <section style={cardStyle}>
        <h3 style={{ fontSize: "16px", color: "var(--text-primary)", marginBottom: "4px" }}>Password</h3>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>
          Choose a new password with at least 8 characters.
        </p>

        <form onSubmit={handleSavePassword} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>New password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              style={inputStyle}
            />
          </div>

          {passwordMsg && <Message kind={passwordMsg.kind} text={passwordMsg.text} />}

          <button type="submit" disabled={savingPassword} style={buttonStyle(savingPassword)}>
            {savingPassword && <Loader2 size={16} className="animate-spin" />}
            {savingPassword ? "Updating..." : "Update password"}
          </button>
        </form>
      </section>
    </div>
  );
}
