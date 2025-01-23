"use client";

import { ValueDisplayProps } from "@/types";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

export function ValueDisplay({
  value,
  change,
  description,
}: ValueDisplayProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {description && <p className="text-lg text-[#7dd1e7]">{description}</p>}
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-white">
          $
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h1>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex items-center gap-1 text-lg ${isPositive ? "text-[#a8d897]" : "text-red-400"}`}
        >
          {isPositive ? (
            <ArrowUp className="h-5 w-5" />
          ) : (
            <ArrowDown className="h-5 w-5" />
          )}
          $
          {Math.abs(change).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}{" "}
          ({Math.abs((change / value) * 100).toFixed(2)}%)
        </motion.div>
      </div>
    </motion.div>
  );
}
