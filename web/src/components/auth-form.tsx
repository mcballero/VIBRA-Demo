"use client";

import { useState } from "react";
import { api } from "../lib/api";

type Mode = "login" | "signup";

const defaultInterests = ["fitness", "tech", "food"];

export function AuthForm({ mode }: { mode: Mode }) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const result = await api.signup({
          email: String(formData.get("email")),
          password: String(formData.get("password")),
          name: String(formData.get("name")),
          city: String(formData.get("city") || "New York"),
          interests: defaultInterests
        });
        setMessage(`Welcome ${result.user.name}. JWT issued successfully.`);
      } else {
        const result = await api.login({
          email: String(formData.get("email")),
          password: String(formData.get("password"))
        });
        setMessage(`Welcome back ${result.user.name}. JWT issued successfully.`);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit(new FormData(event.currentTarget));
      }}
      className="glass-panel mx-auto flex w-full max-w-md flex-col gap-4 p-8 shadow-card"
    >
      <h1 className="font-display text-4xl">{mode === "signup" ? "Create account" : "Welcome back"}</h1>
      <p className="text-sm text-ink/70">
        {mode === "signup"
          ? "Set up your taste profile and start discovering your next third space."
          : "Sign in to continue your personalized local feed."}
      </p>
      {mode === "signup" ? (
        <input
          name="name"
          placeholder="Full name"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
          required
        />
      ) : null}
      {mode === "signup" ? (
        <input
          name="city"
          placeholder="City"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
        />
      ) : null}
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-ink px-4 py-3 text-white transition hover:bg-ocean disabled:opacity-50"
      >
        {loading ? "Working..." : mode === "signup" ? "Create account" : "Login"}
      </button>
      {message ? <p className="text-sm text-ink/70">{message}</p> : null}
    </form>
  );
}
