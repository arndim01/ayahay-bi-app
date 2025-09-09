// ShipProfitDistributionCard.tsx
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

interface ShipProfitDistributionCardProps {
  shipProfitsData?: { ship_name: string; net_profit: number }[];
}

const ShipProfitDistributionCard: React.FC<ShipProfitDistributionCardProps> = ({
  shipProfitsData = [],
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ship Profit Distribution</CardTitle>
        <CardDescription>Profit by vessel</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            profit: { label: "Net Profit", color: "var(--color-chart-2)" },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={shipProfitsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="ship_name"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="net_profit" fill="var(--color-chart-2)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ShipProfitDistributionCard;
