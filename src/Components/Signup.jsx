import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      return setError("All fields are required");
    }

   
    localStorage.setItem("user", JSON.stringify({ name, email }));

    navigate("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081017] p-6 text-white">
      <div className="max-w-md w-full p-8 rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] backdrop-blur-xl">

        <h1 className="text-3xl font-bold text-[var(--primary)] mb-6 text-center">
          Create Account
        </h1>

        {error && (
          <div className="text-sm text-red-400 mb-4 bg-red-900 bg-opacity-20 p-2 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">

          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>

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
            Sign Up
          </button>

          <p className="text-center text-sm text-[var(--primary-soft)] mt-3">
            Already have an account?{" "}
            <Link to="/login" className="underline text-[var(--primary)]">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
