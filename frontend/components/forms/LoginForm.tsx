"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Login successful:", data);

        Cookies.set("access_token", data.access_token, { expires: 1 });
        console.log("Token set in cookies:", data.access_token);

        router.push("/");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Login failed");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md space-y-8 p-8"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
        <p className="text-sm text-gray-400">Sign in to Nilaobu</p>
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}

      <form className="space-y-4" onSubmit={handleLogin}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            className="bg-zinc-900 border-zinc-800"
            placeholder="Email"
            type="email" // Changed to 'email' for better validation
            value={credentials.email}
            required
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Input
            className="bg-zinc-900 border-zinc-800"
            placeholder="Password"
            type="password"
            value={credentials.password}
            required
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            type="submit" // Set button type to 'submit'
            className="w-full bg-white text-black hover:bg-gray-100"
            size="lg"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
