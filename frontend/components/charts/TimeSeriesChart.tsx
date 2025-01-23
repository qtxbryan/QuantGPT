"use client";
import { PortfolioChartProps } from "@/types";
import { motion } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function TimeSeriesChart({
  data,
  title,
  height = 200,
}: PortfolioChartProps) {
  // Transform the data into a format suitable for Recharts
  const chartData = data.labels.map((label, index) => {
    const dataPoint: { [key: string]: any } = { label };
    data.datasets.forEach((dataset) => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    return dataPoint;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`h-[${height}px] w-full bg-gray-900 rounded-lg p-4`}
    >
      {title && <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid stroke="rgba(57, 77, 155, 0.1)" />
          <XAxis
            dataKey="label"
            stroke="#7dd1e7"
            tick={{ fill: "#7dd1e7", fontSize: 12 }}
          />
          <YAxis
            stroke="#7dd1e7"
            tick={{ fill: "#7dd1e7", fontSize: 12 }}
            tickFormatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a2040",
              border: "1px solid #394d9b",
            }}
            labelStyle={{ color: "#7dd1e7" }}
            itemStyle={{ color: "#ffffff" }}
          />
          {data.datasets.map((dataset) => (
            <Line
              key={dataset.label}
              type="monotone"
              dataKey={dataset.label}
              stroke={dataset.borderColor}
              fill={dataset.backgroundColor}
              dot={{ r: 2 }}
              strokeWidth={2}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default TimeSeriesChart;
