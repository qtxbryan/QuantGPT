"use client";

import { AssetSearchProps } from "@/types";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const AssetSearch = ({ onSearch }: AssetSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div
        className={`relative transition-shadow duration-300 ${isFocused ? "shadow-lg shadow-[#394d9b]/20" : ""}`}
      >
        <Input
          type="search"
          placeholder="Search for assets..."
          className="w-full bg-[#1a2040] border-[#394d9b] text-white pl-12 h-12"
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#7dd1e7]" />
      </div>
    </motion.div>
  );
};

export default AssetSearch;
