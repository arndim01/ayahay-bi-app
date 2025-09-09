// PerformanceItemCard.tsx
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface PerformanceItem {
  title: string;
  metricLabel: string;
  metricValue: string | number;
  profitMargin: number;
  status: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface PerformanceItemCardProps {
  items: PerformanceItem[];
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

const PerformanceItemCard: React.FC<PerformanceItemCardProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 border rounded-lg"
        >
          <div className="flex items-center gap-3">
            <item.Icon className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.metricLabel}: {item.metricValue}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{item.profitMargin}%</span>
            <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceItemCard;
