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

// Sample data for the dashboard
const shipProfitData = [
  { ship: "Atlantic Star", profit: 450000, trips: 24 },
  { ship: "Pacific Queen", profit: 380000, trips: 22 },
  { ship: "Mediterranean", profit: 320000, trips: 20 },
  { ship: "Baltic Express", profit: 290000, trips: 18 },
  { ship: "Caribbean Dream", profit: 250000, trips: 16 },
];

const routeProfitability = [
  {
    route: "Shanghai-LA",
    profitMargin: 35,
    volume: "High",
    status: "Excellent",
  },
  { route: "Hamburg-NYC", profitMargin: 28, volume: "High", status: "Good" },
  {
    route: "Singapore-Rotterdam",
    profitMargin: 32,
    volume: "Medium",
    status: "Good",
  },
  {
    route: "Dubai-Miami",
    profitMargin: 25,
    volume: "Medium",
    status: "Average",
  },
  {
    route: "Tokyo-Seattle",
    profitMargin: 22,
    volume: "Low",
    status: "Average",
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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

function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
}

export default function ShippingDashboard() {
  const [timeFilter, setTimeFilter] = useState<
    "today" | "this month" | "this year"
  >("this month");

  const { data: tripsData } = useFetchData(
    `${API_URL}/business-intelligence/trips`
  );
  const { data: paymentsData } = useFetchData(
    `${API_URL}/business-intelligence/payments`
  );
  const { data: expensesData } = useFetchData(
    `${API_URL}/business-intelligence/expenses`
  );

  const { data: cargosData } = useFetchData(
    `${API_URL}/business-intelligence/cargos`
  );
  const { data: passengersData } = useFetchData(
    `${API_URL}/business-intelligence/passengers`
  );

  const { data: bookingsData } = useFetchData(
    `${API_URL}/business-intelligence/bookings`
  );

  const { data: topRoutes } = useFetchData(
    `${API_URL}/business-intelligence/top-routes/${
      timeFilter === "today"
        ? "Today"
        : timeFilter === "this month"
        ? "This Month"
        : "This Year"
    }`
  );

  console.log("TopRoute", topRoutes);

  const [filteredTripsData, setFilteredTripsData] = useState<Trip[]>([]);
  const [filteredPaymentsData, setFilteredPaymentsData] = useState<any[]>([]);
  const [filteredExpensesData, setFilteredExpensesData] = useState<any[]>([]);
  const [filteredCargosData, setFilteredCargosData] = useState<any[]>([]);
  const [filteredPassengersData, setFilteredPassengersData] = useState<any[]>(
    []
  );
  const [filteredBookingsData, setFilteredBookingsData] = useState<any[]>([]);

  const [revenueData, setRevenueData] = useState<
    { month: string; revenue: number; profit: number; expenses: number }[]
  >([]);

  const [percentageChange, setPercentageChange] = useState({
    trips: 0,
    payments: 0,
    expenses: 0,
    profit: 0,
    profitMargin: 0,
    cargos: 0,
    passengers: 0,
  });
  const [valueChange, setValueChange] = useState({
    totalRevenue: 0,
    totalTrips: 0,
    totalExpenses: 0,
    totalProfit: 0,
    profitMargin: 0,
    totalCargos: 0,
    totalPassengers: 0,
  });

  useEffect(() => {
    const filterByTime = (
      data: any[] | undefined,
      dateField: string,
      period: "current" | "previous"
    ) => {
      if (!Array.isArray(data)) return []; // safeguard

      const now = new Date();

      return data.filter((item) => {
        const itemDate = new Date(item[dateField]);
        if (isNaN(itemDate.getTime())) return false; // skip invalid dates

        if (timeFilter === "today") {
          const targetDate =
            period === "current" ? now : new Date(Date.now() - 86400000);
          return (
            itemDate.getDate() === targetDate.getDate() &&
            itemDate.getMonth() === targetDate.getMonth() &&
            itemDate.getFullYear() === targetDate.getFullYear()
          );
        }

        if (timeFilter === "this month") {
          let targetMonth = now.getMonth();
          let targetYear = now.getFullYear();

          if (period === "previous") {
            targetMonth -= 1;
            if (targetMonth < 0) {
              targetMonth += 12; // wrap around to December
              targetYear -= 1; // decrement year
            }
          }

          return (
            itemDate.getMonth() === targetMonth &&
            itemDate.getFullYear() === targetYear
          );
        }

        if (timeFilter === "this year") {
          const targetYear =
            period === "current" ? now.getFullYear() : now.getFullYear() - 1;
          return itemDate.getFullYear() === targetYear;
        }

        return true;
      });
    };

    // Filter data
    const currentTrips = filterByTime(tripsData, "created_at", "current");
    const previousTrips = filterByTime(tripsData, "created_at", "previous");

    const currentCargos = filterByTime(cargosData, "created_at", "current");
    const previousCargos = filterByTime(cargosData, "created_at", "previous");

    const currentBookings = filterByTime(bookingsData, "created_at", "current");

    const currentPassengers = filterByTime(
      passengersData,
      "created_at",
      "current"
    );
    const previousPassengers = filterByTime(
      passengersData,
      "created_at",
      "previous"
    );

    const currentPayments = filterByTime(
      paymentsData,
      "payment_date",
      "current"
    );
    const previousPayments = filterByTime(
      paymentsData,
      "payment_date",
      "previous"
    );
    const currentExpenses = filterByTime(expensesData, "created_at", "current");
    const previousExpenses = filterByTime(
      expensesData,
      "created_at",
      "previous"
    );

    // Update states
    setFilteredTripsData(currentTrips);
    setFilteredPaymentsData(currentPayments);
    setFilteredExpensesData(currentExpenses);
    setFilteredCargosData(currentCargos);
    setFilteredPassengersData(currentPassengers);
    setFilteredBookingsData(currentBookings);

    const totalRevenue = currentPayments.reduce(
      (a, b) => a + (Number(b.total_price) || 0),
      0
    );
    const previousRevenue = previousPayments.reduce(
      (a, b) => a + (Number(b.total_price) || 0),
      0
    );

    const totalExpenses = currentExpenses.reduce(
      (a, b) => a + (b.amount || 0),
      0
    );
    const totalProfit = totalRevenue - totalExpenses;
    const profitMargin =
      totalRevenue !== 0 ? (totalProfit / totalRevenue) * 100 : 0;

    setPercentageChange({
      trips: calculatePercentageChange(
        currentTrips.length,
        previousTrips.length
      ),
      payments: calculatePercentageChange(totalRevenue, previousRevenue),
      expenses: calculatePercentageChange(
        currentExpenses.reduce((a, b) => a + (b.amount || 0), 0),
        previousExpenses.reduce((a, b) => a + (b.amount || 0), 0)
      ),
      profit: calculatePercentageChange(
        totalProfit,
        previousRevenue -
          previousExpenses.reduce((a, b) => a + (b.amount || 0), 0)
      ),
      profitMargin: calculatePercentageChange(
        profitMargin,
        previousRevenue -
          previousExpenses.reduce((a, b) => a + (b.amount || 0), 0) !==
          0
          ? ((previousRevenue -
              previousExpenses.reduce((a, b) => a + (b.amount || 0), 0)) /
              previousRevenue) *
              100
          : 0
      ),
      cargos: calculatePercentageChange(
        currentCargos.length,
        previousCargos.length
      ),
      passengers: calculatePercentageChange(
        currentPassengers.length,
        previousPassengers.length
      ),
    });

    setValueChange({
      totalRevenue,
      totalTrips: currentTrips.length,
      totalExpenses,
      totalProfit,
      profitMargin,
      totalCargos: currentCargos.length,
      totalPassengers: currentPassengers.length,
    });
  }, [tripsData, paymentsData, expensesData, bookingsData, timeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-500";
      case "Good":
        return "bg-blue-500";
      case "Average":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <PageHeader
        title="Executive Dashboard"
        description="Business Intelligence & Analytics Overview"
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />

      {/* Key Metrics */}
      <KeyMetrics
        totalRevenue={valueChange.totalRevenue}
        totalProfit={valueChange.totalProfit}
        totalExpenses={valueChange.totalExpenses}
        profitMargin={valueChange.profitMargin}
        percentageChange={percentageChange}
      />

      {/* Operational Metrics */}
      <OperationalMetrics
        totalCargos={valueChange.totalCargos}
        totalPassengers={valueChange.totalPassengers}
        totalTrips={valueChange.totalTrips}
        percentageChange={{
          cargos: percentageChange.cargos,
          passengers: percentageChange.passengers,
          trips: percentageChange.trips,
        }}
      />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue, Profit, Expenses Chart */}
        <RevenueChart
          paymentsData={paymentsData}
          expensesData={expensesData}
          timeFilter={timeFilter}
        />

        {/* Booking Distribution */}
        <BookingDistributionCard bookingsData={filteredBookingsData} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Routes */}
        <TopRoutesPerformanceCard
          topRoutes={topRoutes.map((r) => ({
            route: r.route,
            revenue: Number(r.revenue),
          }))}
          categories={["revenue"]}
        />

        {/* Ship Profit Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Ship Profit Distribution</CardTitle>
            <CardDescription>Profit by vessel</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                profit: { label: "Profit", color: "var(--color-chart-2)" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shipProfitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="ship"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="profit" fill="var(--color-chart-2)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Profitability Matrix */}
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

        {/* Total Trips by Ship */}
        <Card>
          <CardHeader>
            <CardTitle>Total Trips by Ship</CardTitle>
            <CardDescription>Vessel utilization overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shipProfitData.map((ship, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Anchor className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{ship.ship}</p>
                      <p className="text-sm text-muted-foreground">
                        Profit: ${ship.profit.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{ship.trips}</p>
                    <p className="text-sm text-muted-foreground">trips</p>
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
