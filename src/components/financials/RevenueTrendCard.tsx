"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface RevenueTrend {
  month?: string;
  day?: number;
  revenue: number;
  budget: number;
  variance: number;
}

interface RevenueTrendsCardProps {
  data: RevenueTrend[];
  timeFilter: "today" | "this-month" | "this-year";
}

export const RevenueTrendsCard: React.FC<RevenueTrendsCardProps> = ({
  data,
  timeFilter,
}) => {
  const isMonthly = timeFilter === "this-month";
  const title = isMonthly
    ? "Daily Revenue Performance"
    : "Monthly Revenue Performance";

  const xKey = isMonthly ? "day" : "month";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data ?? []}>
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
                    "Amount",
                  ];
                }
                return [value, "Amount"];
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#0088FE"
              strokeWidth={3}
              name="Actual Revenue"
            />
            <Line
              type="monotone"
              dataKey="budget"
              stroke="#00C49F"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Budget"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
