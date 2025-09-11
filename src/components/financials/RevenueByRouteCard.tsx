"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface RevenueByRouteCardProps {
  data: {
    route: string;
    revenue: number;
    profit?: number;
    margin?: number;
  }[];
}

export default function RevenueByRouteCard({ data }: RevenueByRouteCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Route</CardTitle>
        <CardDescription>
          Performance analysis by shipping route
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data ?? []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="route" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip
              formatter={(value: number | string | (number | string)[]) => {
                if (typeof value === "number") {
                  return [
                    `${value.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PHP",
                      maximumFractionDigits: 2,
                    })}`,
                    "Revenue",
                  ];
                }
                return [String(value), "Revenue"];
              }}
            />
            <Bar dataKey="revenue" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
