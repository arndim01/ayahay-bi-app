// ShipPerformanceCard.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Anchor } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ShipProfit {
  ship_name: string;
  total_revenue: number;
  net_profit: number;
  status: string;
  profitMargin: number;
}

interface ShipPerformanceCardProps {
  shipProfitsData?: ShipProfit[];
}

function getStatusColor(status: string) {
  switch (status) {
    case "Exceptional":
      return "bg-blue-100 text-blue-800";
    case "High":
      return "bg-teal-100 text-teal-800";
    case "Moderate":
      return "bg-indigo-100 text-indigo-800";
    case "Low":
      return "bg-orange-100 text-orange-800";
    case "Critical":
      return "bg-red-200 text-red-900";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

const ShipPerformanceCard: React.FC<ShipPerformanceCardProps> = ({
  shipProfitsData = [],
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ship Performance Overview</CardTitle>
        <CardDescription>Revenue and profitability by vessel</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shipProfitsData.map((ship, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Anchor className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{ship.ship_name}</p>
                  <p className="text-sm text-muted-foreground">
                    Revenue: ${Number(ship.total_revenue).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <p className="text-lg font-bold">
                  ${Number(ship.net_profit).toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {ship.profitMargin}%
                  </span>
                  <Badge className={getStatusColor(ship.status)}>
                    {ship.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipPerformanceCard;
