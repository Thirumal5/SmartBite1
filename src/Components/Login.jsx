import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();

    
    if (email === "" || password === "") {
      return setError("Please fill all fields");
    }

    
    localStorage.setItem("user", JSON.stringify({ email }));

    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081017] p-6 text-white">
      <div className="max-w-md w-full p-8 rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] backdrop-blur-xl">

        <h1 className="text-3xl font-bold text-[var(--primary)] mb-6 text-center">
          SmartBite Login
        </h1>

        {error && (
          <div className="text-sm text-red-400 mb-4 bg-red-900 bg-opacity-20 p-2 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button className="w-full py-3 rounded-xl bg-[var(--primary)] text-black font-semibold">
            Sign In
          </button>

          <p className="text-center text-sm text-[var(--primary-soft)] mt-3">
            No account?{" "}
            <Link to="/signup" className="underline text-[var(--primary)]">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
