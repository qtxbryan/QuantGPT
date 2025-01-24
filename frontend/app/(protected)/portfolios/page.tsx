"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Maximize2, Plus } from "lucide-react";
import Header from "@/components/Header";
import { ValueDisplay } from "@/components/ValueDisplay";
import Timefilter from "@/components/charts/Timefilter";
import TimeSeriesChart from "@/components/charts/TimeSeriesChart";
import PortfolioList from "@/components/PortfolioList";
import { CHART_DATA_MOCK, PORTFOLIO_DATA_MOCK } from "@/data";
import { TIME_PERIODS } from "@/constants";

export default function PortfolioPage() {
  const [activePeriod, setActivePeriod] = useState("1d");

  return (
    <>
      <Header title={"Portfolios"} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 space-y-6"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Your dashboard</h1>
              <p className="text-[#7dd1e7]">
                Track, manage and forecast your portfolio.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="bg-[#1a2040] text-[#7dd1e7] border-[#394d9b] hover:bg-[#232a4d]"
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#394d9b] text-white hover:bg-[#4a62c3]">
                + Watchlist
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3 space-y-6">
              <ValueDisplay
                value={58144.8}
                change={2264.12}
                description="Total Portfolio Value"
              />
              <Timefilter
                periods={TIME_PERIODS}
                activePeriod={activePeriod}
                onChange={setActivePeriod}
              />
            </div>
            <div className="col-span-9 p-6 rounded-lg border border-[#394d9b]">
              <TimeSeriesChart data={CHART_DATA_MOCK} />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              Your Portfolios
            </h2>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="bg-[#1a2040] text-[#7dd1e7] border-[#394d9b] hover:bg-[#232a4d]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Manually
              </Button>
              <Button className="bg-[#394d9b] text-white hover:bg-[#4a62c3]">
                <Plus className="w-4 h-4 mr-2" />
                Create Automatically
              </Button>
            </div>
          </div>

          <PortfolioList portfolios={PORTFOLIO_DATA_MOCK} />
        </div>
      </motion.main>
    </>
  );
}
