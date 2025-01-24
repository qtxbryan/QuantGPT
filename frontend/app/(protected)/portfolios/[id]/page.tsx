"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { PORTFOLIO_TABS } from "@/constants";
import { Tab } from "@/types";
import {
  PORTFOLIO_ALLOCATIONS_MOCK,
  PORTFOLIO_ASSETS_MOCK,
  PORTFOLIO_METRICS_MOCK,
} from "@/data";
import MetricCard from "@/components/MetricCard";
import CompositionBarChart from "@/components/charts/CompositionBarChart";
import AssetTable from "@/components/AssetTable";

const PortfolioDetails = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <>
      <Header title={"Portfolio"} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 space-y-6"
      >
        {/* START: Can component this whole part in future */}
        <CustomBreadcrumb
          parentLabel="Portfolios"
          parentLink="/portfolios"
          currentLabel="PORTFOLIO NAME"
        />
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white">Portfolio1</h1>
          <div className="flex gap-6 border-b border-[#394d9b]">
            {PORTFOLIO_TABS.map((tab: Tab, index: number) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab.label)}
                className={`relative pb-4 text-sm transition-colors ${
                  activeTab == tab.label
                    ? "text-white"
                    : "text-[#7dd1e7] hover:text-white"
                }`}
              >
                {tab.label}
                {activeTab == tab.label && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7dd1e7]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        {/* END: Can component this whole part in future */}

        {/* Performance OVerview */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">
            Performance Overview
          </h2>
          {/* PERFORMANCE CHART HERE */}
          PERFORMANCE CHART HERE
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PORTFOLIO_METRICS_MOCK.map((metric, index) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Asset Allocation</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CompositionBarChart allocations={PORTFOLIO_ALLOCATIONS_MOCK} />
            <AssetTable assets={PORTFOLIO_ASSETS_MOCK} />
          </div>
        </div>

        {/* Top Movers */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Top Movers</h2>
          TOP MOVER TABLE HERE
        </div>

        {/* Maximum Drawdown */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Maximum Drawdown</h2>
          MAXIMUM DRAWDOWN CHART HERE
        </div>
      </motion.main>
    </>
  );
};

export default PortfolioDetails;
