"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Ship,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  MapPin,
  Anchor,
} from "lucide-react";
import { Trip } from "@/lib/types";
import KeyMetrics from "@/components/executive dashboard/KeyMetrics";
import PageHeader from "@/components/utils/PageHeader";
import OperationalMetrics from "@/components/executive dashboard/OperationalMetrics";
import RevenueChart from "@/components/executive dashboard/RevenueProfitChart";
import BookingDistributionCard from "@/components/executive dashboard/BookingDistribution";
import TopRoutesPerformanceCard from "@/components/executive dashboard/TopRoute";
import ShipProfitDistributionCard from "@/components/executive dashboard/ShipProfitDistribution";
import RouteProfitabilityCard from "@/components/executive dashboard/RouteProfitability";
import ShipPerformanceCard from "@/components/executive dashboard/ShipPerformance";
import { useApiData } from "@/hooks/useApiData";

export default function ShippingDashboard() {
  const [timeFilter, setTimeFilter] = useState<
    "today" | "this-month" | "this-year"
  >("this-month");

  // Updated to use filtered data directly from backend
  const { data: tripsData } = useApiData<any[]>(
    `/business-intelligence/trips/${timeFilter}`,
    [timeFilter]
  );
  const { data: paymentsData } = useApiData<any[]>(
    `/business-intelligence/payments/${timeFilter}`,
    [timeFilter]
  );
  const { data: expensesData } = useApiData<any[]>(
    `/business-intelligence/expenses/${timeFilter}`,
    [timeFilter]
  );
  const { data: cargosData } = useApiData<any[]>(
    `/business-intelligence/cargos/${timeFilter}`,
    [timeFilter]
  );
  const { data: passengersData } = useApiData<any[]>(
    `/business-intelligence/passengers/${timeFilter}`,
    [timeFilter]
  );
  const { data: bookingsData } = useApiData<any[]>(
    `/business-intelligence/bookings/${timeFilter}`,
    [timeFilter]
  );

  const { data: dashboardMetrics } = useApiData<any>(
    `/business-intelligence/dashboard-metrics/${timeFilter}`,
    [timeFilter]
  );

  const { data: routeProfitabilityData } = useApiData<any[]>(
    `/business-intelligence/route-profitability/${timeFilter}`,
    [timeFilter]
  );

  // Updated to use URL-safe time filters
  const { data: topRoutes } = useApiData<any[]>(
    `/business-intelligence/top-routes/${timeFilter}`,
    [timeFilter]
  );

  // Get ship profits data
  const { data: shipProfitsData } = useApiData<any[]>(
    `/business-intelligence/ship-profits/${timeFilter}`,
    [timeFilter]
  );

  // Convert time filter to URL-safe format
  const getUrlSafeTimeFilter = (filter: string) => {
    return filter.replace(/ /g, "-"); // Convert spaces to hyphens
  };

  console.log("Payments", paymentsData);
  console.log("Expenses", expensesData);
  console.log("Cargos", cargosData);

  console.log("TopRoute", topRoutes);
  console.log("Ship Profits", shipProfitsData);

  // Remove all client-side filtering logic since it's now done in database
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalTrips: 0,
    totalExpenses: 0,
    totalProfit: 0,
    profitMargin: 0,
    totalCargos: 0,
    totalPassengers: 0,
    totalBookings: 0,
  });

  const [percentageChange, setPercentageChange] = useState({
    totalTrips: 0,
    totalRevenue: 0,
    totalExpenses: 0,
    totalProfit: 0,
    profitMargin: 0,
    totalCargos: 0,
    totalPassengers: 0,
  });

  useEffect(() => {
    if (dashboardMetrics) {
      setMetrics(dashboardMetrics.current);
      setPercentageChange(dashboardMetrics.percentageChange);
    }
  }, [dashboardMetrics]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <PageHeader
        title="Executive Dashboard"
        description="Business Intelligence & Analytics Overview"
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />

      {/* Key Metrics - now using database-filtered data */}
      <KeyMetrics
        totalRevenue={metrics.totalRevenue ?? 0}
        totalProfit={metrics.totalProfit ?? 0}
        totalExpenses={metrics.totalExpenses ?? 0}
        profitMargin={metrics.profitMargin ?? 0}
        percentageChange={percentageChange ?? 0}
      />

      {/* Operational Metrics */}
      <OperationalMetrics
        totalCargos={metrics?.totalCargos ?? 0}
        totalPassengers={metrics?.totalPassengers ?? 0}
        totalTrips={metrics?.totalTrips ?? 0}
        percentageChange={{
          cargos: percentageChange?.totalCargos ?? 0,
          passengers: percentageChange?.totalPassengers ?? 0,
          trips: percentageChange?.totalTrips ?? 0,
        }}
      />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue, Profit, Expenses Chart - pass filtered data */}
        <RevenueChart
          paymentsData={Array.isArray(paymentsData) ? paymentsData : []}
          expensesData={Array.isArray(expensesData) ? expensesData : []}
          timeFilter={timeFilter}
        />
        {/* Booking Distribution */}{" "}
        {/* <BookingDistributionCard bookingsData={bookingsData ?? []} /> */}
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Routes */}
        <TopRoutesPerformanceCard
          topRoutes={
            Array.isArray(topRoutes)
              ? topRoutes.map((r) => ({
                  route: r.route,
                  revenue: Number(r.revenue),
                }))
              : []
          }
        />

        {/* Ship Profit Distribution - now using real data */}
        <ShipProfitDistributionCard shipProfitsData={shipProfitsData ?? []} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Profitability Matrix - keep sample data for now */}

        <RouteProfitabilityCard
          routeProfitability={
            Array.isArray(routeProfitabilityData) ? routeProfitabilityData : []
          }
        />

        {/* Ship Profits Table - now using real data */}
        <ShipPerformanceCard
          shipProfitsData={
            Array.isArray(shipProfitsData) ? shipProfitsData : []
          }
        />
      </div>
    </div>
  );
}
