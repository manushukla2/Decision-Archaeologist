"use client";
import { useState } from "react";
import Link from "next/link";
import { Landmark, Mail, Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

const inputWrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor: "var(--bg-elevated)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  padding: "0 14px",
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  background: "none",
  border: "none",
  outline: "none",
  padding: "12px 0",
  fontSize: "14px",
  color: "var(--text-primary)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--text-primary)",
  marginBottom: "6px",
};

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setInfo("If an account exists for this email, a reset link has been sent. Check your inbox.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundColor: "var(--bg-base)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <Landmark size={24} color="var(--primary)" />
          <span style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Decision Archaeologist
          </span>
        </div>

        <div
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)",
            padding: "32px",
          }}
        >
          <h1 style={{ fontSize: "24px", color: "var(--text-primary)", marginBottom: "8px" }}>
            Reset your password
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "28px" }}>
            Enter your email and we will send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={labelStyle}>Email</label>
              <div style={inputWrap}>
                <Mail size={16} color="var(--text-muted)" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  style={inputStyle}
                />
              </div>
            </div>

            {error && (
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--danger)",
                  border: "1px solid var(--danger)",
                  borderRadius: "var(--radius-md)",
                  padding: "10px 12px",
                }}
              >
                {error}
              </div>
            )}

            {info && (
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--success)",
                  border: "1px solid var(--success)",
                  borderRadius: "var(--radius-md)",
                  padding: "10px 12px",
                }}
              >
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-md)",
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Sending link..." : "Send reset link"}
            </button>
          </form>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
          <Link
            href="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={14} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
