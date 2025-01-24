// src/components/onboarding/FormField.tsx
"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormFieldProps } from "./FormField.types";

export function FormField({
  label,
  type = "text",
  placeholder,
  error,
  value,
  onChange,
  required = false,
}: FormFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2 mb-6"
    >
      <Label className="text-lg font-medium text-white">{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="bg-[#1a2040] border-[#394d9b] text-white h-11 rounded-xl text-base placeholder:text-gray-400"
      />
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-sm"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
