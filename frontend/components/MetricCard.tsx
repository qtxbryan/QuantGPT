"use client";
import { MetricCardProps } from "@/types";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

const MetricCard = ({ title, value, index = 0 }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="bg-[#1a2040] border-[#394d9b] hover:bg-[#232a4d] transition-all duration-300">
        <CardContent className="p-6">
          <p className="text-[#7dd1e7] text-sm mb-2">{title}</p>
          <p className="text-white text-2xl font-bold">{value}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MetricCard;
