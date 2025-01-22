"use client";

import Header from "@/components/Header";
import { HOLDINGS_MOCK } from "@/data";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProfitLossBadge from "@/components/ProfitLossBadge";
import { ACCORDION_TABS } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HoldingsPage = () => {
  const [selectedHolding, setSelectedHolding] = useState(
    HOLDINGS_MOCK[0].ticker
  );
  const [showChartModal, setShowChartModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);

  return (
    <>
      <Header />
      <main className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Holdings</h2>

        <div className="mb-6">
          {/* Might need to make it into component */}
          <select
            value={selectedHolding}
            onChange={(e) => setSelectedHolding(e.target.value)}
            className="bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {HOLDINGS_MOCK.map((holding) => (
              <option key={holding.ticker} value={holding.ticker}>
                {holding.ticker}
              </option>
            ))}
          </select>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg shadow overflow-hidden mb-8"
        >
          <Table className="min-w-full divide-y divide-gray-700">
            <TableHeader className="bg-gray-700">
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Ticker
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Holding Value
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Initial Investment
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  1D Change
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  1M Change
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  YTD Change
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Overall Change
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-gray-800 divide-y divide-gray-700">
              {HOLDINGS_MOCK.map((holding) => (
                <TableRow key={holding.ticker}>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {holding.ticker}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${holding.holdingValue.toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${holding.initialInvestment.toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                    <ProfitLossBadge value={holding.change1D} />
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                    <ProfitLossBadge value={holding.change1M} />
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                    <ProfitLossBadge value={holding.changeYTD} />
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                    <ProfitLossBadge value={holding.changeOverall} />
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => setShowChartModal(true)}
                      className="text-blue-500 hover:text-blue-400 mr-2"
                    >
                      View Chart
                    </button>
                    <button
                      onClick={() => setShowNewsModal(true)}
                      className="text-green-500 hover:text-green-400"
                    >
                      View News
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full text-white">
          {ACCORDION_TABS.map((section) => (
            <AccordionItem
              key={section}
              value={section}
              className="hover:bg-gray-700 px-4"
            >
              <AccordionTrigger>{section}</AccordionTrigger>
              <AccordionContent>
                This is the {section.toLowerCase()} for {selectedHolding}. Add
                more detailed analysis here.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </>
  );
};

export default HoldingsPage;
