"use client";

import { TimeFilterProps } from "@/types";
import { motion } from "framer-motion";

const Timefilter = ({ periods, activePeriod, onChange }: TimeFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex gap-2 justify-start" // Align to the left
    >
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onChange(period)}
          className={`relative px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            activePeriod === period
              ? "bg-[#394d9b] !text-white" // Active state: Background and text white
              : "text-[#7dd1e7] hover:bg-[#232a4d] hover:text-white" // Inactive state
          }`}
        >
          {activePeriod === period && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-[#394d9b] rounded-md"
              style={{ zIndex: 0 }} // Highlight background
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          {period}
        </button>
      ))}
    </motion.div>
  );
};

export default Timefilter;
