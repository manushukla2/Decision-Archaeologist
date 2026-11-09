"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Landmark, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
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

export default function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
    } else {
      setInfo("Account created. Check your email to confirm your address, then log in.");
    }
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
            Create your account
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "28px" }}>
            Start building your organization's decision memory.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={labelStyle}>Full name</label>
              <div style={inputWrap}>
                <User size={16} color="var(--text-muted)" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>
            </div>

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

            <div>
              <label style={labelStyle}>Password</label>
              <div style={inputWrap}>
                <Lock size={16} color="var(--text-muted)" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={16} color="var(--text-muted)" />
                  ) : (
                    <Eye size={16} color="var(--text-muted)" />
                  )}
                </button>
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
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: "14px", color: "var(--text-secondary)", marginTop: "24px" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ fontWeight: 500 }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
