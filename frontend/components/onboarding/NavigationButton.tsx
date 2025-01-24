"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavigationButtonsProps } from "./NavigationButton.types";

export function NavigationButtons({
  onBack,
  onNext,
  isBackDisabled = false,
  isNextDisabled = false,
}: NavigationButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-end gap-4 mt-8"
    >
      {onBack && (
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isBackDisabled}
          className="w-32 bg-[#1a2040] border-[#394d9b] text-[#7dd1e7] hover:bg-[#232a4d] disabled:opacity-50 rounded-xl"
        >
          Back
        </Button>
      )}
      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        className="w-32 bg-gradient-to-r from-[#394d9b] to-[#4a62c3] text-white hover:opacity-90 disabled:opacity-50 rounded-xl"
      >
        Next
      </Button>
    </motion.div>
  );
}
