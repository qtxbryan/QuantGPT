"use client";

import { motion } from "framer-motion";
import { ChoiceFieldProps } from "./ChoiceField.types";

export function ChoiceField({
  label,
  choices,
  value,
  onChange,
  columns = 2,
  error,
}: ChoiceFieldProps) {
  return (
    <div className="space-y-3 mb-6">
      <label className="text-lg font-medium text-white">{label}</label>
      <div className={`grid grid-cols-${columns} gap-4`}>
        {choices.map((choice) => (
          <motion.button
            key={choice.value}
            type="button"
            onClick={() => onChange(choice.value)}
            className={`p-3 rounded-xl border ${
              value === choice.value
                ? "bg-gradient-to-r from-[#394d9b] to-[#4a62c3] border-[#7dd1e7] text-white"
                : "bg-[#1a2040] border-[#394d9b] text-[#7dd1e7] hover:bg-[#232a4d]"
            } transition-colors`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {choice.label}
          </motion.button>
        ))}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-sm"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
