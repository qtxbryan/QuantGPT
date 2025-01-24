"use client";

import Header from "@/components/Header";
import { NEWS_TABS } from "@/constants";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { NewsCardSkeleton } from "@/components/CardSkeleton";
import { NEWS_DATA_MOCK } from "@/data";
import HorizontalCard from "@/components/HorizontalCard";

const NewsPage = () => {
  const newsImage =
    // need to add to backend and pull from backend
    "vercel.svg";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header title="News" headerTabs={NEWS_TABS} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="space-y-6">
          {loading ? (
            <>
              {NEWS_DATA_MOCK.map((_, index) => (
                <NewsCardSkeleton key={index} />
              ))}
            </>
          ) : (
            NEWS_DATA_MOCK.map((news, index) => (
              <HorizontalCard
                key={index}
                index={index}
                image={newsImage}
                {...news}
              />
            ))
          )}
        </div>
      </motion.main>
    </>
  );
};

export default NewsPage;
