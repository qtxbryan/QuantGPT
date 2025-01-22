"use client";

import { motion } from "framer-motion";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tab, HeaderProps } from "@/types";

const Header = ({ headerTabs = [], title = "Dashboard" }: HeaderProps) => {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-10 flex flex-col gap-6 border-b border-gray-800 bg-gray-900/50 px-4 py-4 backdrop-blur-sm md:px-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search anything here"
              className="w-full rounded-full bg-gray-800 pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:bg-gray-700 md:w-auto"
            />
          </div>

          <button className="relative rounded-full p-2 hover:bg-gray-800">
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          {/* IMAGE SUPPOSE TO BE HERE */}
        </div>
      </div>
      {headerTabs.length > 0 && (
        <nav className="flex gap-6 overflow-x-auto">
          {headerTabs.map((tab: Tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative whitespace-nowrap text-sm text-[#7dd1e7]/70 hover:text-[#7dd1e7] transition-colors duration-200"
            >
              {tab.label}
              {pathname === tab.href && (
                <motion.div
                  className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-[#7dd1e7]"
                  layoutId="activeTab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          ))}
        </nav>
      )}
    </motion.div>
  );
};

export default Header;
