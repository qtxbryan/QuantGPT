"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

const stats = [
  {
    label: "Patients",
    value: "6025",
    change: "+68.35%",
    trend: "up",
    period: "Since last week",
  },
  {
    label: "Send This Week",
    value: "4152",
    change: "+4.17%",
    trend: "up",
    period: "Since last week",
  },
  {
    label: "Critical Alerts",
    value: "5948",
    change: "+92.05%",
    trend: "up",
    period: "Since last week",
  },
  {
    label: "Appointments",
    value: "5626",
    change: "+27.47%",
    trend: "up",
    period: "Since last week",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-xl bg-gray-800 p-6"
        >
          <div className="space-y-1">
            <h3 className="text-sm text-gray-400">{stat.label}</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <span
                className={`flex items-center text-xs ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-xs text-gray-400">{stat.period}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
