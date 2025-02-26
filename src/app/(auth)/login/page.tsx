"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import { setLoggedInUser, getUserRole } from "@/utils/auth";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await loginUser({ email, password });
      
      // Store user in localStorage
      setLoggedInUser(userData);

      // Determine user role
      const role = getUserRole(userData.email);

      // Redirect based on role
      if (role === "admin") {
        router.push("/admin/rt-cycle"); // Redirect to admin dashboard
      } else {
        router.push("/dashboard"); // Redirect to employee dashboard
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-purple-500 mb-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-purple-500 mb-3"
          />

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
