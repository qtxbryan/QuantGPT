"use client";

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ProfitLossBadgeProps {
  value: number;
}

const ProfitLossBadge: React.FC<ProfitLossBadgeProps> = ({ value }) => {
  const isPositive = value >= 0;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {isPositive ? (
        <ChevronUp className="w-4 h-4 mr-1" />
      ) : (
        <ChevronDown className="w-4 h-4 mr-1" />
      )}
      {Math.abs(value)}%
    </span>
  );
};

export default ProfitLossBadge;
