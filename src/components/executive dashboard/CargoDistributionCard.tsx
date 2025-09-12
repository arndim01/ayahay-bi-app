"use client";

import React, { useMemo } from "react";
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
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
];

interface CargoDistributionCardProps {
  cargosData: any[]; // fetched cargos
}

const CargoDistributionCard: React.FC<CargoDistributionCardProps> = ({
  cargosData,
}) => {
  // Ensure cargosData is always an array
  const safeCargos = Array.isArray(cargosData) ? cargosData : [];

  // Calculate dynamic distribution by cargo type (e.g., "Loose" or "Rolling")
  const cargoDistribution = useMemo(() => {
    const total = safeCargos.length || 1;
    const counts: Record<string, number> = {};

    safeCargos.forEach((cargo) => {
      const type = cargo.type || "Unknown"; // adjust field name if needed
      counts[type] = (counts[type] || 0) + 1;
    });

    return Object.entries(counts).map(([type, count], index) => ({
      type,
      value: Math.round((count / total) * 100),
      color: COLORS[index % COLORS.length],
    }));
  }, [safeCargos]);

  // Generate chart config dynamically
  const chartConfig = useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    cargoDistribution.forEach((entry) => {
      config[entry.type.toLowerCase()] = {
        label: entry.type,
        color: entry.color,
      };
    });
    return config;
  }, [cargoDistribution]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cargo Distribution</CardTitle>
        <CardDescription>Breakdown by cargo type (Loose, Rolling, etc.)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={cargoDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ type, value }) => `${type}: ${value}%`}
              >
                {cargoDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CargoDistributionCard;
