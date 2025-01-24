"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { MultiSelectProps } from "./MultiSelect.types";

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options",
  error,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const removeOption = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[44px] bg-[#1a2040] border border-[#394d9b] rounded-xl p-2 cursor-pointer"
      >
        {value.length === 0 ? (
          <p className="text-gray-400 p-1">{placeholder}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {value.map((v) => {
              const option = options.find((o) => o.value === v);
              return (
                <motion.span
                  key={v}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-1 bg-[#394d9b] text-white rounded px-2 py-1"
                >
                  {option?.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(v);
                    }}
                    className="hover:text-[#7dd1e7] transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.span>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-[#1a2040] border border-[#394d9b] rounded-md shadow-lg"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => toggleOption(option.value)}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#232a4d] text-white"
              >
                {option.label}
                {value.includes(option.value) && (
                  <Check className="h-4 w-4 text-[#7dd1e7]" />
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
