"use client";

import { useEffect, useState } from "react";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Define proper interfaces instead of using 'any'
export interface PaymentData {
  payment_date: string;
  total_price: number;
}

export interface ExpenseData {
  departure_date: string;
  amount: number;
}

interface RevenueChartProps {
  paymentsData: PaymentData[];
  expensesData: ExpenseData[];
  timeFilter: "today" | "this-month" | "this-year";
}

export default function RevenueChart({
  paymentsData,
  expensesData,
  timeFilter,
}: RevenueChartProps) {
  const [revenueData, setRevenueData] = useState<
    { label: string; revenue: number; profit: number; expenses: number }[]
  >([]);

  useEffect(() => {
    if (!paymentsData || !expensesData) return;

    const now = new Date();

    // Helper to sum revenue/expenses by a filter function
    const sumBy = (
      data: PaymentData[] | ExpenseData[], 
      field: string, 
      filterFn: (item: PaymentData | ExpenseData) => boolean
    ) =>
      data.filter(filterFn).reduce((sum, item) => {
        const value = field === 'total_price' 
          ? (item as PaymentData).total_price 
          : (item as ExpenseData).amount;
        return sum + Number(value || 0);
      }, 0);

    if (timeFilter === "today") {
      const revenue = sumBy(paymentsData, "total_price", (p) => {
        const d = new Date((p as PaymentData).payment_date);
        return (
          d.getDate() === now.getDate() &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      });

      const expenses = sumBy(expensesData, "amount", (e) => {
        const d = new Date((e as ExpenseData).departure_date);
        return (
          d.getDate() === now.getDate() &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      });

      setRevenueData([{ label: "Today", revenue, expenses, profit: revenue - expenses }]);
      return;
    }

    if (timeFilter === "this-month") {
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;

        const revenue = sumBy(paymentsData, "total_price", (p) => {
          const d = new Date((p as PaymentData).payment_date);
          return (
            d.getDate() === day &&
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        });

        const expenses = sumBy(expensesData, "amount", (e) => {
          const d = new Date((e as ExpenseData).departure_date);
          return (
            d.getDate() === day &&
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        });

        return { label: `${day}`, revenue, expenses, profit: revenue - expenses };
      });

      setRevenueData(dailyData);
      return;
    }

    if (timeFilter === "this-year") {
      const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ];

      const monthlyData = months.map((month, index) => {
        const revenue = sumBy(paymentsData, "total_price", (p) => {
          const d = new Date((p as PaymentData).payment_date);
          return d.getMonth() === index && d.getFullYear() === now.getFullYear();
        });

        const expenses = sumBy(expensesData, "amount", (e) => {
          const d = new Date((e as ExpenseData).departure_date);
          return d.getMonth() === index && d.getFullYear() === now.getFullYear();
        });

        return { label: month, revenue, expenses, profit: revenue - expenses };
      });

      setRevenueData(monthlyData);
    }
  }, [paymentsData, expensesData, timeFilter]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue, Profit & Expenses</CardTitle>
        <CardDescription>
          {timeFilter === "today"
            ? "Today's performance"
            : timeFilter === "this-month"
            ? "Daily performance for this month"
            : "Monthly performance for this year"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: { label: "Revenue", color: "var(--color-chart-1)" },
            profit: { label: "Profit", color: "var(--color-chart-2)" },
            expenses: { label: "Expenses", color: "var(--color-chart-3)" },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="var(--color-chart-2)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="var(--color-chart-3)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}