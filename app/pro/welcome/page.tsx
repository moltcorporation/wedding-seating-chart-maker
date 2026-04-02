"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProWelcomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "success" | "error">("idle");

  async function activate() {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    setStatus("checking");
    try {
      const res = await fetch(`/api/pro/check?email=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (data.pro) {
        localStorage.setItem("pro_email", trimmed);
        localStorage.setItem("pro_plan", data.plan);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50">
      <div className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
        {status === "success" ? (
          <>
            <h1 className="text-2xl font-serif font-bold text-stone-800">
              Welcome to Pro!
            </h1>
            <p className="mt-3 text-sm text-stone-500">
              Your Pro features are now unlocked. Enjoy unlimited tables, all table types,
              and watermark-free PDF exports.
            </p>
            <Link
              href="/editor"
              className="mt-6 block rounded-lg bg-stone-800 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-stone-700"
            >
              Open Editor
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-serif font-bold text-stone-800">
              Activate Pro
            </h1>
            <p className="mt-3 text-sm text-stone-500">
              Enter the email address you used during checkout to unlock your Pro features.
            </p>
            {status === "error" && (
              <p className="mt-3 text-sm text-red-500">
                No Pro purchase found for that email. It may take a few minutes to process.
              </p>
            )}
            <div className="mt-6 flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && activate()}
                className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm"
              />
              <button
                onClick={activate}
                disabled={status === "checking"}
                className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
              >
                {status === "checking" ? "Checking..." : "Activate"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
