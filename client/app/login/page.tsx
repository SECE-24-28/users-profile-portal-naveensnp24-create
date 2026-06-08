"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/studentQueries";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [login, { loading, error }] = useMutation(LOGIN);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await login({
      variables: form,
    });

    localStorage.setItem("token", res.data.login.token);
    router.push("/students");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>

        {error && (
          <p className="text-red-600 text-sm text-center">
            {error.message}
          </p>
        )}

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}