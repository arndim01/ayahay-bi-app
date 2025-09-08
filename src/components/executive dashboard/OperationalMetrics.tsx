"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, Ship, TrendingUp, TrendingDown } from "lucide-react";

interface OperationalMetricsProps {
  totalCargos: number;
  totalPassengers: number;
  totalTrips: number;
  percentageChange: {
    cargos: number;
    passengers: number;
    trips: number;
  };
}

export default function OperationalMetrics({
  totalCargos,
  totalPassengers,
  totalTrips,
  percentageChange,
}: OperationalMetricsProps) {
  const renderChange = (value: number) => (
    <span className={value >= 0 ? "text-green-500" : "text-red-500"}>
      {value.toLocaleString(undefined, { maximumFractionDigits: 2, maximumSignificantDigits: 2 })}%
    </span>
  );

  const renderIcon = (value: number) =>
    value >= 0 ? <TrendingUp className="h-3 w-3 text-green-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Cargo */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Cargo (TEU)</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCargos.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {renderIcon(percentageChange.cargos)}
            {renderChange(percentageChange.cargos)} from last period
          </p>
        </CardContent>
      </Card>

      {/* Total Passengers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPassengers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {renderIcon(percentageChange.passengers)}
            {renderChange(percentageChange.passengers)} from last period
          </p>
        </CardContent>
      </Card>

      {/* Total Trips */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
          <Ship className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTrips.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {renderIcon(percentageChange.trips)}
            {renderChange(percentageChange.trips)} from last period
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
