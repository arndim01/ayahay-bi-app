"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
} from "recharts";

interface RevenueByShipProps {
  revenueByShip: {
    ship: string;
    revenue: number;
    utilization: number;
  }[] | null;
}

export default function RevenueByShipCard({ revenueByShip }: RevenueByShipProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Ship</CardTitle>
        <CardDescription>
          Fleet performance and utilization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={revenueByShip ?? []}> {/* ✅ fallback to [] */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="ship"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="revenue" fill="#00C49F" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="utilization"
              stroke="#FF8042"
              strokeWidth={3}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
