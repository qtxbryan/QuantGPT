import Sidebar from "@/components/Sidebar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
