// CostBreakdownCard.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface CostBreakdown {
  category: string;
  amount: number;
  trend: number;
  percentage: number;
}

interface CostBreakdownCardProps {
  costBreakdown?: CostBreakdown[];
  COLORS?: string[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const CostBreakdownCard: React.FC<CostBreakdownCardProps> = ({
  costBreakdown = [],
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Breakdown Analysis</CardTitle>
        <CardDescription>
          Detailed analysis of operational expenses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {costBreakdown.map((cost) => (
              <div key={cost.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{cost.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold">{cost.amount.toLocaleString('en-US',{
                      style: 'currency', currency: 'PHP',
                      maximumFractionDigits: 2,
                    })}</span>
                    <Badge variant={cost.trend > 0 ? "destructive" : "default"}>
                      {cost.trend > 0 ? "+" : ""}
                      {cost.trend}%
                    </Badge>
                  </div>
                </div>
                <Progress value={cost.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {cost.percentage}% of total costs
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent, index }) =>
                  `${costBreakdown[index].category}: ${Math.round(
                    percent * 100
                  )}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {costBreakdown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | string) => {
                  if (typeof value === "number") return [`${value}`, "Cost"];
                  return [value, "Cost"];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdownCard;
