"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const RegisterForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      // this route here is referring to the route.ts file in api/auth/register
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (res.ok) {
      alert("Registration successful. Please login.");
      router.push("/login"); // Redirect to login page
    } else {
      alert("Registration failed. Please try again.");
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
        <h1 className="text-3xl font-bold tracking-tight">Register</h1>
        <p className="text-sm text-gray-400">Sign in Nilaobu</p>
      </div>

      <form className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            className="bg-zinc-900 border-zinc-800"
            placeholder="Email"
            type="text"
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
            className="w-full bg-white text-black hover:bg-gray-100"
            size="lg"
            onClick={handleRegister}
          >
            Register
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
