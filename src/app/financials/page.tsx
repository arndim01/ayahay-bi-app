"use client";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import PageHeader from "@/components/utils/PageHeader";
import { useApiData } from "@/hooks/useApiData";
import KeyMetrics from "@/components/executive dashboard/KeyMetrics";
import RevenueByRouteCard from "@/components/financials/RevenueByRouteCard";
import RevenueByShipCard from "@/components/financials/RevenueByShipCard";
import PassengerVsCargoCard from "@/components/financials/PassengerVsCargoCard";
import RevenueBySourceCard from "@/components/financials/RevenueBySource";
import CostBreakdownCard from "@/components/financials/CostBreakdownCard";
import { RevenueTrendsCard } from "@/components/financials/RevenueTrendCard";
import { BudgetVarianceCard } from "@/components/financials/BudgetVarianceCard";
import AccountsReceivableAgingCard from "@/components/financials/AccountsReceivableAgingCard";
import AccountsPayableCard from "@/components/financials/AccountsPayableCard";

export default function FinancialsPage() {
  const [timeFilter, setTimeFilter] = useState<
    "today" | "this-month" | "this-year"
  >("this-month");

  // Metrics
  const { data: dashboardMetrics } = useApiData<any>(
    `/business-intelligence/dashboard-metrics/${timeFilter}`,
    [timeFilter]
  );

  const { data: revenueByRoute } = useApiData<any[]>(
    `/business-intelligence/revenue-by-route/${timeFilter}`,
    [timeFilter]
  );

  const { data: revenueByShip } = useApiData<any[]>(
    `/business-intelligence/revenue-by-ship/${timeFilter}`,
    [timeFilter]
  );

  const { data: passengerVsCargo } = useApiData<any[]>(
    `/business-intelligence/passenger-vs-cargo/${timeFilter}`,
    [timeFilter]
  );

  const { data: customerTypes } = useApiData<any[]>(
    `/business-intelligence/revenue-by-source/${timeFilter}`,
    [timeFilter]
  );

  const { data: costBreakdown } = useApiData<any[]>(
    `/business-intelligence/cost-breakdown/${timeFilter}`,
    [timeFilter]
  );

  const { data: revenueTrends } = useApiData<any[]>(
    `/business-intelligence/revenue-trend/${timeFilter}`,
    [timeFilter]
  );

  const { data: accountsReceivable } = useApiData<any[]>(
    `/business-intelligence/accounts-receivable/${timeFilter}`,
    [timeFilter]
  );

  const { data: accountsPayable } = useApiData<any[]>(
    `/business-intelligence/accounts-Payable/${timeFilter}`,
    [timeFilter]
  );

  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalProfit: 0,
    totalExpenses: 0,
    profitMargin: 0,
  });

  useEffect(() => {
    if (dashboardMetrics) {
      setMetrics(dashboardMetrics.current);
    }
  }, [dashboardMetrics]);

  // Sample data for charts

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Financial Dashboard"
        description="Comprehensive financial analysis and reporting"
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />

      {/* Key Financial Metrics */}
      <KeyMetrics
        totalRevenue={metrics.totalRevenue}
        totalProfit={metrics.totalProfit}
        totalExpenses={metrics.totalExpenses}
        profitMargin={metrics.profitMargin}
        percentageChange={dashboardMetrics?.percentageChange ?? {}}
      />

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends & Budget</TabsTrigger>
          <TabsTrigger value="accounts">A/R & A/P</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue by Route */}
            <RevenueByRouteCard data={revenueByRoute ?? []} />

            {/* Revenue by Ship */}
            <RevenueByShipCard revenueByShip={revenueByShip ?? []} />

            {/* Passenger vs Cargo Revenue */}
            <PassengerVsCargoCard passengerVsCargo={passengerVsCargo} />

            {/* Customer Type Revenue */}
            <RevenueBySourceCard data={customerTypes ?? []} />
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <CostBreakdownCard costBreakdown={costBreakdown ?? []} />
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueTrendsCard
              data={revenueTrends ?? []}
              timeFilter={timeFilter}
            />
            <BudgetVarianceCard
              data={revenueTrends ?? []}
              timeFilter={timeFilter}
            />
          </div>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AccountsReceivableAgingCard
              accountsReceivable={accountsReceivable ?? []}
            />

            <AccountsPayableCard accountsPayable={accountsPayable ?? []} />
          
          </div>
        </TabsContent>

        <TabsContent value="profitability" className="space-y-4">

          <Card>
            <CardHeader>
              <CardTitle>Net Profit Margin by Route</CardTitle>
              <CardDescription>
                Route profitability analysis and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueByRoute?.map((route, index) => (
                  <div key={route.route} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{route.route}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm">
                          Revenue:{" "}
                          {route.revenue.toLocaleString("en-US", {
                            style: "currency",
                            currency: "PHP",
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className="text-sm">
                          Profit:{" "}
                          {route.profit.toLocaleString("en-US", {
                            style: "currency",
                            currency: "PHP",
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <Badge
                          variant={
                            route.margin >= 18
                              ? "default"
                              : route.margin >= 12
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {route.margin}% margin
                        </Badge>
                      </div>
                    </div>
                    <Progress value={route.margin} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
