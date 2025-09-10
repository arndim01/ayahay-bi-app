"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#FF8042"]; // Passenger / Cargo colors

interface PassengerVsCargoCardProps {
  passengerVsCargo: {
    name: string;
    value: number;
    percentage: number;
  }[] | null;
}

export default function PassengerVsCargoCard({ passengerVsCargo }: PassengerVsCargoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger vs Cargo Revenue</CardTitle>
        <CardDescription>
          Revenue distribution by service type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={passengerVsCargo ?? []}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {passengerVsCargo?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number | string | (number | string)[]) => {
                if (typeof value === "number") {
                  return [`$${(value / 1_000_000).toFixed(1)}M`, "Revenue"];
                }
                return [String(value), "Revenue"];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
