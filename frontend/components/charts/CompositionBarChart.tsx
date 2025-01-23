"use client";
import { AssetAllocationProps } from "@/types";
import { motion } from "framer-motion";

const CompositionBarChart = ({ allocations }: AssetAllocationProps) => {
  return (
    <div className="space-y-4">
      {allocations.map((allocation, index) => (
        <motion.div
          key={allocation.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="space-y-2"
        >
          <div className="flex justify-between text-sm">
            <span className="text-[#7dd1e7]">{allocation.name}</span>
            <span className="text-white">{allocation.percentage}%</span>
          </div>
          <div className="h-2 bg-[#1a2040] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${allocation.percentage}%` }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="h-full bg-[#7dd1e7]"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CompositionBarChart;
