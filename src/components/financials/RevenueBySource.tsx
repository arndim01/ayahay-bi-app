// components/RevenueBySourceCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface RevenueBySource {
  type: string;
  revenue: number;
  percentage: number;
}

interface RevenueBySourceCardProps {
  data: RevenueBySource[];
}

const COLORS = ["#6366F1", "#14B8A6", "#F59E0B", "#EF4444", "#10B981"];

export const RevenueBySourceCard: React.FC<RevenueBySourceCardProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Customer Source</CardTitle>
        <CardDescription>
          Analysis of revenue by booking source
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((source, index) => (
            <div
              key={source.type}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm font-medium">{source.type}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">
                  {source.revenue}
                </div>
                <div className="text-xs text-muted-foreground">
                  {source.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default RevenueBySourceCard;