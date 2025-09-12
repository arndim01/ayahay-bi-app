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

// Define proper interface instead of using 'any'
interface BookingData {
  id: string;
  source: string;
  // Add other booking properties as needed
}

interface BookingDistributionCardProps {
  bookingsData: BookingData[];
}

const BookingDistributionCard: React.FC<BookingDistributionCardProps> = ({
  bookingsData,
}) => {
  // Calculate dynamic distribution by source - moved inside useMemo
  const bookingDistribution = useMemo(() => {
    // Ensure bookingsData is always an array - moved inside useMemo
    const safeBookings = Array.isArray(bookingsData) ? bookingsData : [];
    const total = safeBookings.length || 1;
    const counts: Record<string, number> = {};

    safeBookings.forEach((booking) => {
      const source = booking.source || "Unknown";
      counts[source] = (counts[source] || 0) + 1;
    });

    return Object.entries(counts).map(([type, count], index) => ({
      type,
      value: Math.round((count / total) * 100),
      color: COLORS[index % COLORS.length],
    }));
  }, [bookingsData]); // Only depend on bookingsData

  // Generate chart config dynamically
  const chartConfig = useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    bookingDistribution.forEach((entry) => {
      config[entry.type.toLowerCase()] = {
        label: entry.type,
        color: entry.color,
      };
    });
    return config;
  }, [bookingDistribution]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Distribution</CardTitle>
        <CardDescription>Breakdown by booking source</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bookingDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ type, value }) => `${type}: ${value}%`}
              >
                {bookingDistribution.map((entry, index) => (
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

export default BookingDistributionCard;