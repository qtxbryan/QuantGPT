import Header from "@/components/Header";
import { StatsCards } from "@/components/StatsCard";
import React from "react";

const Home = () => {
  return (
    <>
      <Header />
      <main className="p-4 md:p-6">
        <div className="space-y-4 md:space-y-6">
          <StatsCards />
        </div>
      </main>
    </>
  );
};

export default Home;
