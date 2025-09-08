"use client";

import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  timeFilter: "today" | "this month" | "this year";
  setTimeFilter: Dispatch<SetStateAction<"today" | "this month" | "this year">>;
  showTimeFilter?: boolean; // optional if you don’t want buttons sometimes
}

export default function PageHeader({
  title,
  description,
  timeFilter,
  setTimeFilter,
  showTimeFilter = true,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      {showTimeFilter && (
        <div className="flex items-center gap-2">
          <Button
            variant={timeFilter === "today" ? "default" : "outline"}
            onClick={() => setTimeFilter("today")}
          >
            Today
          </Button>
          <Button
            variant={timeFilter === "this month" ? "default" : "outline"}
            onClick={() => setTimeFilter("this month")}
          >
            This Month
          </Button>
          <Button
            variant={timeFilter === "this year" ? "default" : "outline"}
            onClick={() => setTimeFilter("this year")}
          >
            This Year
          </Button>
        </div>
      )}
    </div>
  );
}
