// RouteProfitabilityCard.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface RouteProfit {
  route: string;
  volume: number;
  profitMargin: number;
  status: string;
}

interface RouteProfitabilityCardProps {
  routeProfitability: RouteProfit[];
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

const RouteProfitabilityCard: React.FC<RouteProfitabilityCardProps> = ({
  routeProfitability,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Profitability Matrix</CardTitle>
        <CardDescription>Performance analysis by route</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {routeProfitability.map((route, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{route.route}</p>
                  <p className="text-sm text-muted-foreground">
                    Volume: {route.volume}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {route.profitMargin}%
                </span>
                <Badge className={getStatusColor(route.status)}>
                  {route.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteProfitabilityCard;
