"use client";
import { PortfolioProps } from "@/types";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ProfitLossBadge from "./ProfitLossBadge";

const PortfolioList = ({ portfolios }: PortfolioProps) => {
  return (
    <div className="space-y-4">
      {portfolios.map((portfolio, index) => (
        <motion.div
          key={portfolio.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-[#1a2040] border-[#394d9b] hover:bg-[#232a4d] transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-[#7dd1e7]">{portfolio.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <p className="text-[#a8d897] text-lg">
                    {portfolio.value.toLocaleString()}
                  </p>
                  <p className="text-white text-sm">{portfolio.composition}</p>
                </div>
                <ProfitLossBadge value={portfolio.change} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PortfolioList;
