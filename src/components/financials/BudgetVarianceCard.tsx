"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

interface RevenueTrend {
  month?: string;
  day?: number;
  revenue: number;
  budget: number;
  variance: number;
}

interface BudgetVarianceCardProps {
  data: RevenueTrend[];
  timeFilter: "today" | "this-month" | "this-year";
}

export const BudgetVarianceCard: React.FC<BudgetVarianceCardProps> = ({
  data,
  timeFilter,
}) => {
  const isMonthly = timeFilter === "this-month";
  const title = isMonthly
    ? "Daily Budget vs Actual Variance"
    : "Monthly Budget vs Actual Variance";

  const xKey = isMonthly ? "day" : "month";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs Actual Variance</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data ?? []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xKey}
              tickFormatter={(value) => (isMonthly ? `Day ${value}` : value)}
            />
            <YAxis
              tickFormatter={(value) =>
                value.toLocaleString(undefined, {
                  style: "currency",
                  currency: "PHP",
                  maximumFractionDigits: 2,
                })
              }
            />
            <Tooltip
              formatter={(value: number | string) => {
                if (typeof value === "number") {
                  return [
                    value.toLocaleString(undefined, {
                      style: "currency",
                      currency: "PHP",
                      maximumFractionDigits: 2,
                    }),
                    "Variance",
                  ];
                }
                return [value, "Variance"];
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              payload={[
                { value: "Positive Variance", type: "square", color: "#00C49F" },
                { value: "Negative Variance", type: "square", color: "#FF8042" },
              ]}
            />
            <Bar dataKey="variance">
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.variance >= 0 ? "#00C49F" : "#FF8042"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
