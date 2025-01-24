"use client";

import { SelectedAssetsProps } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const SelectedAssets = ({ assets, onRemove }: SelectedAssetsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Selected Assets</h3>
      <div className="flex flex-wrap gap-4">
        <AnimatePresence>
          {assets.map((asset) => (
            <motion.div
              key={asset.ticker}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-[#1a2040] rounded-lg p-2 flex items-center gap-2 border border-[#394d9b]"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#0f1638]">
                <Image
                  src={asset.icon || "/placeholder.svg"}
                  alt={asset.title}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-white">{asset.ticker}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#7dd1e7] hover:text-white p-1"
                onClick={() => onRemove(asset.ticker)}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SelectedAssets;
