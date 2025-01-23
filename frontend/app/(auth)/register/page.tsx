import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-scareen bg-black text-white">
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <RegisterForm />
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
