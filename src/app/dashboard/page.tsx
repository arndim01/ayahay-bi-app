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

let routeProfitability = [
  {
    route: "Port A to Port B",
    volume: 1200,
    profitMargin: 25,
    status: "Good",
  },
  {
    route: "Port C to Port D",
    volume: 800,
    profitMargin: 15,
    status: "Average",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Good":
      return "bg-green-100 text-green-800";
    case "Average":
      return "bg-yellow-100 text-yellow-800";
    case "Poor":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function useFetchDataWithFilter(baseUrl: string, timeFilter: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const url = `${baseUrl}/${timeFilter}`;
      try {
        // Add timeFilter as query parameter

        const response = await fetch(url);
        const json = await response.json();
        console.log(`Fetched filtered data from ${url}:`, json);
        setData(json);
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [baseUrl, timeFilter]);

  return { data, loading, setData };
}

function useFetchData(url: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(`Fetched data from ${url}:`, json);
        setData(json);
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, loading, setData };
}

export default function ShippingDashboard() {
  const [timeFilter, setTimeFilter] = useState<
    "today" | "this-month" | "this-year"
  >("this-month");

  // Updated to use filtered data directly from backend
  const { data: tripsData } = useFetchDataWithFilter(
    `${API_URL}/business-intelligence/trips`,
    timeFilter
  );
  const { data: paymentsData } = useFetchDataWithFilter(
    `${API_URL}/business-intelligence/payments`,
    timeFilter
  );
  const { data: expensesData } = useFetchDataWithFilter(
    `${API_URL}/business-intelligence/expenses`,
    timeFilter
  );
  const { data: cargosData } = useFetchDataWithFilter(
    `${API_URL}/business-intelligence/cargos`,
    timeFilter
  );
  const { data: passengersData } = useFetchDataWithFilter(
    `${API_URL}/business-intelligence/passengers`,
    timeFilter
  );
  const { data: bookingsData } = useFetchDataWithFilter(
    `${API_URL}/business-intelligence/bookings`,
    timeFilter
  );

  // Convert time filter to URL-safe format
  const getUrlSafeTimeFilter = (filter: string) => {
    return filter.replace(/ /g, "-"); // Convert spaces to hyphens
  };

  // Updated to use URL-safe time filters
  const { data: topRoutes } = useFetchData(
    `${API_URL}/business-intelligence/top-routes/${getUrlSafeTimeFilter(
      timeFilter
    )}`
  );

  // Get ship profits data
  const { data: shipProfitsData } = useFetchData(
    `${API_URL}/business-intelligence/ship-profits/${getUrlSafeTimeFilter(
      timeFilter
    )}`
  );

  // Remove dashboard metrics for now since endpoint doesn't exist
  // const { data: dashboardMetrics } = useFetchData(
  //   `${API_URL}/business-intelligence/dashboard-metrics/${getUrlSafeTimeFilter(timeFilter)}`
  // );

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
    trips: 0,
    payments: 0,
    expenses: 0,
    profit: 0,
    profitMargin: 0,
    cargos: 0,
    passengers: 0,
  });

  useEffect(() => {
    // Simply calculate totals from the already-filtered data
    const totalRevenue = paymentsData.reduce(
      (a, b) => a + (Number(b.total_price) || 0),
      0
    );

    const totalExpenses = expensesData.reduce(
      (a, b) => a + (Number(b.amount) || 0),
      0
    );

    const totalProfit = totalRevenue - totalExpenses;
    const profitMargin =
      totalRevenue !== 0 ? (totalProfit / totalRevenue) * 100 : 0;

    setMetrics({
      totalRevenue,
      totalTrips: tripsData.length,
      totalExpenses,
      totalProfit,
      profitMargin,
      totalCargos: cargosData.length,
      totalPassengers: passengersData.length,
      totalBookings: bookingsData.length,
    });

    // For percentage changes, you'll need to implement previous period comparison
    // This would require additional API endpoints for previous period data
    // For now, setting to 0
    setPercentageChange({
      trips: 0, // TODO: Implement previous period comparison
      payments: 0,
      expenses: 0,
      profit: 0,
      profitMargin: 0,
      cargos: 0,
      passengers: 0,
    });
  }, [
    tripsData,
    paymentsData,
    expensesData,
    cargosData,
    passengersData,
    bookingsData,
    timeFilter,
  ]);

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
        totalRevenue={metrics.totalRevenue}
        totalProfit={metrics.totalProfit}
        totalExpenses={metrics.totalExpenses}
        profitMargin={metrics.profitMargin}
        percentageChange={percentageChange}
      />

      {/* Operational Metrics */}
      <OperationalMetrics
        totalCargos={metrics.totalCargos}
        totalPassengers={metrics.totalPassengers}
        totalTrips={metrics.totalTrips}
        percentageChange={{
          cargos: percentageChange.cargos,
          passengers: percentageChange.passengers,
          trips: percentageChange.trips,
        }}
      />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue, Profit, Expenses Chart - pass filtered data */}
        <RevenueChart
          paymentsData={paymentsData}
          expensesData={expensesData}
          timeFilter={timeFilter}
        />

        {/* Booking Distribution */}
        <BookingDistributionCard bookingsData={bookingsData} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Routes */}
        <TopRoutesPerformanceCard
          topRoutes={(topRoutes || []).map((r) => ({
            route: r.route,
            revenue: Number(r.revenue),
          }))}
        />

        {/* Ship Profit Distribution - now using real data */}
        <Card>
          <CardHeader>
            <CardTitle>Ship Profit Distribution</CardTitle>
            <CardDescription>Profit by vessel</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                profit: { label: "Net Profit", color: "var(--color-chart-2)" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shipProfitsData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="ship_name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="net_profit" fill="var(--color-chart-2)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row - Update to use real ship data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Profitability Matrix - keep sample data for now */}
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

        {/* Ship Profits Table - now using real data */}
        <Card>
          <CardHeader>
            <CardTitle>Ship Performance Overview</CardTitle>
            <CardDescription>
              Revenue and profitability by vessel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(shipProfitsData || []).map((ship, index) => (
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
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${Number(ship.net_profit).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">net profit</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
