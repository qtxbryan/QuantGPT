"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { SIDEBAR_LINKS } from "@/constants";
import LogoutButton from "./Logout";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="sticky top-0 flex h-screen w-64 flex-shrink-0 flex-col bg-gray-950 text-white"
    >
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-500 p-2">
            <span className="font-bold">$</span>
          </div>
          <span className="text-lg font-semibold">QuantFYP</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {SIDEBAR_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-800 ${
                isActive ? "bg-gray-800" : ""
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
              {link.badge && (
                <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-gray-800">
          <LogOut className="h-5 w-5" />
          <LogoutButton />
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
