"use client";

import { motion } from "framer-motion";
import { ProgressStepsProps } from "./types/ProgressStep.types";

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="space-y-4 mb-8">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl text-[#7dd1e7] font-bold"
      >
        {steps[currentStep].title}: {steps[currentStep].description}
      </motion.div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7dd1e7] to-[#394d9b] blur-lg opacity-20" />
        <div className="relative h-1 bg-gray-200/20 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7dd1e7] to-[#394d9b]"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0">
          <div className="flex justify-between">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentStep
                    ? "bg-gradient-to-r from-[#7dd1e7] to-[#394d9b]"
                    : "bg-gray-200/20"
                }`}
                initial={false}
                animate={{
                  scale: index === currentStep ? 1.2 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
