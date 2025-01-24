"use client";
import AssetSearch from "@/components/AssetSearch";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import Header from "@/components/Header";
import SelectedAssets from "@/components/SelectedAssets";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ASSETS_MOCK } from "@/data";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import EnhancedAssetCard from "@/components/EnhancedAssetCard";

const CreatePortfolio = () => {
  const [portfolioName, setPortfolioName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<
    (typeof ASSETS_MOCK)[0] | null
  >(null);
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set());

  const toggleAsset = (ticker: string) => {
    const newSelected = new Set(selectedAssets);
    if (newSelected.has(ticker)) {
      newSelected.delete(ticker);
    } else {
      newSelected.add(ticker);
    }
    setSelectedAssets(newSelected);
  };

  const filteredAssets = ASSETS_MOCK.filter(
    (asset) =>
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.ticker.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const selectedAssetsList = useMemo(() => {
    return ASSETS_MOCK.filter((asset) => selectedAssets.has(asset.ticker));
  }, [selectedAssets]);

  return (
    <>
      <Header title="Portfolio" />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#0f1638] pb-20"
      >
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          <CustomBreadcrumb
            parentLabel="Portfolios"
            parentLink="portfolios"
            currentLabel="Construction"
          />

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">
              Build Your Portfolio
            </h1>
            <p className="text-[#7dd1e7]">
              Construct a diversified portfolio with ETFs or individual stocks
            </p>
          </div>

          {/* Portfolio Name */}
          <div className="space-y-4 max-w-xl">
            <Label htmlFor="portfolio-name" className="text-[#7dd1e7]">
              Portfolio Name
            </Label>
            <Input
              id="portfolio-name"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              className="bg-[#1a2040] border-[#394d9b] text-white"
              placeholder="Enter portfolio name"
            />
          </div>

          {/* Selected Assets */}
          {selectedAssetsList.length > 0 && (
            <SelectedAssets
              assets={selectedAssetsList}
              onRemove={(ticker) => toggleAsset(ticker)}
            />
          )}

          {/* Asset Search and Top assets */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">
              Select your assets
            </h2>
            <AssetSearch onSearch={(query) => setSearchQuery(query)} />

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Top Assets</h3>
              {/* PUT THE CAROUSEL HERE */}
            </div>

            {searchQuery && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAssets.map((asset) => (
                  <EnhancedAssetCard
                    key={asset.ticker}
                    {...asset}
                    isSelected={selectedAssets.has(asset.ticker)}
                    onSelect={() => toggleAsset(asset.ticker)}
                    onViewChart={() => {
                      // Implement chart view logic
                      console.log("View chart for:", asset.ticker);
                    }}
                    onViewNews={() => {
                      // Implement news view logic
                      console.log("View news for:", asset.ticker);
                    }}
                    onViewAnalysis={() => {
                      // Implement analysis view logic
                      console.log("View analysis for:", asset.ticker);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Portfolio Composition */}
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default CreatePortfolio;
