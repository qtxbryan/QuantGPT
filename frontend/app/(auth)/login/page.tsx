import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-scareen bg-black text-white">
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <LoginForm />
        <p className="text-center mt-3">
          Do not have an account?{" "}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
