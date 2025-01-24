"use client";

import { EnhancedAssetCardProps } from "@/types";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Newspaper, BarChart3 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const EnhancedAssetCard = ({
  icon,
  title,
  ticker,
  description,
  price,
  change,
  onSelect,
  onViewChart,
  onViewNews,
  onViewAnalysis,
  isSelected,
}: EnhancedAssetCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`transition-colors ${
          isSelected
            ? "bg-[#394d9b] border-[#7dd1e7]"
            : "bg-[#1a2040] border-[#394d9b] hover:bg-[#232a4d]"
        }`}
      >
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#0f1638]">
              <Image
                src={icon || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="text-sm text-[#7dd1e7]">{ticker}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">
                    ${price.toLocaleString()}
                  </p>
                  <p
                    className={`text-sm ${change >= 0 ? "text-[#a8d897]" : "text-red-400"}`}
                  >
                    {change >= 0 ? "+" : ""}
                    {change}%
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">{description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-[#7dd1e7] hover:text-white hover:bg-[#394d9b]"
              onClick={onViewChart}
            >
              <LineChart className="h-4 w-4 mr-2" />
              Chart
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-[#7dd1e7] hover:text-white hover:bg-[#394d9b]"
              onClick={onViewNews}
            >
              <Newspaper className="h-4 w-4 mr-2" />
              News
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-[#7dd1e7] hover:text-white hover:bg-[#394d9b]"
              onClick={onViewAnalysis}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analysis
            </Button>
          </div>
          <Button
            variant={isSelected ? "secondary" : "outline"}
            className="w-full"
            onClick={onSelect}
          >
            {isSelected ? "Selected" : "Select Asset"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedAssetCard;
