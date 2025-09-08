"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface TopRoutesPerformanceCardProps {
  topRoutes: { route: string; revenue: number | string }[];
}

const TopRoutesPerformanceCard: React.FC<TopRoutesPerformanceCardProps> = ({
  topRoutes,
}) => {
  // Ensure revenue is a number
  const data = topRoutes
    .map((r) => ({ ...r, revenue: Number(r.revenue) }))
    .sort((a, b) => b.revenue - a.revenue); // highest revenue first

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Routes Performance</CardTitle>
        <CardDescription>Revenue by route</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: { label: "Revenue", color: "var(--color-chart-1)" },
          }}
          className={`h-[${topRoutes.length * 50}px]`} // 50px per route
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="route" type="category" width={150} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-chart-1)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TopRoutesPerformanceCard;
