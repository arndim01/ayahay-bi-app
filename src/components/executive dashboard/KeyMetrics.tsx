"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";

interface KeyMetricsProps {
  totalRevenue?: number;
  totalProfit?: number;
  totalExpenses?: number;
  profitMargin?: number;
  percentageChange?: {
    totalRevenue?: number;
    totalProfit?: number;
    totalExpenses?: number;
    profitMargin?: number;
  };
}

export default function KeyMetrics({
  totalRevenue = 0,
  totalProfit = 0,
  totalExpenses = 0,
  profitMargin = 0,
  percentageChange = {},
}: KeyMetricsProps) {
  const renderChange = (value?: number) => {
    const safeValue = value ?? 0;
    return (
      <span className={safeValue >= 0 ? "text-green-500" : "text-red-500"}>
        {safeValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        %
      </span>
    );
  };

  const renderIcon = (value?: number) =>
    (value ?? 0) >= 0 ? (
      <TrendingUp className="h-3 w-3 text-green-500" />
    ) : (
      <TrendingDown className="h-3 w-3 text-red-500" />
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalRevenue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {renderIcon(percentageChange.totalRevenue)}
            {renderChange(percentageChange.totalRevenue)} from last period
          </p>
        </CardContent>
      </Card>

      {/* Net Profit */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalProfit.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {renderIcon(percentageChange.totalProfit)}
            {renderChange(percentageChange.totalProfit)} from last period
          </p>
        </CardContent>
      </Card>

      {/* Total Expenses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalExpenses.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {renderIcon(percentageChange.totalExpenses)}
            {renderChange(percentageChange.totalExpenses)} from last period
          </p>
        </CardContent>
      </Card>

      {/* Profit Margin */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {profitMargin.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {renderIcon(percentageChange.profitMargin)}
            {renderChange(percentageChange.profitMargin)} from last period
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
