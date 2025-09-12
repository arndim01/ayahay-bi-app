"use client";

import { useState, useEffect } from "react";
import KeyMetrics from "@/components/executive dashboard/KeyMetrics";
import PageHeader from "@/components/utils/PageHeader";
import OperationalMetrics from "@/components/executive dashboard/OperationalMetrics";
import RevenueChart from "@/components/executive dashboard/RevenueProfitChart";
import TopRoutesPerformanceCard from "@/components/executive dashboard/TopRoute";
import ShipProfitDistributionCard from "@/components/executive dashboard/ShipProfitDistribution";
import RouteProfitabilityCard from "@/components/executive dashboard/RouteProfitability";
import ShipPerformanceCard from "@/components/executive dashboard/ShipPerformance";
import { useApiData } from "@/hooks/useApiData";
import {ExpenseData, PaymentData} from "@/components/executive dashboard/RevenueProfitChart"

// Define proper types instead of using 'any'
// interface TripData {
//   id: string;
//   route: string;
//   revenue: number;
//   date: string;
//   // Add other trip properties as needed
// }

interface CargoData {
  id: string;
  weight: number;
  revenue: number;
  // Add other cargo properties as needed
}

// interface PassengerData {
//   id: string;
//   name: string;
//   ticketPrice: number;
//   // Add other passenger properties as needed
// }

// interface BookingData {
//   id: string;
//   passengerCount: number;
//   totalAmount: number;
//   // Add other booking properties as needed
// }

interface DashboardMetrics {
  current: {
    totalRevenue: number;
    totalTrips: number;
    totalExpenses: number;
    totalProfit: number;
    profitMargin: number;
    totalCargos: number;
    totalPassengers: number;
    totalBookings: number;
  };
  percentageChange: {
    totalTrips: number;
    totalRevenue: number;
    totalExpenses: number;
    totalProfit: number;
    profitMargin: number;
    totalCargos: number;
    totalPassengers: number;
  };
}

interface RouteData {
  route: string;
  revenue: number;
  profitability?: number;
  volume: number;
  profitMargin: number;
  status: string;
}

interface ShipProfitData {
  ship_name: string;
  net_profit: number;
  total_revenue: number;
  expenses: number;
  status: string;
  profitMargin: number;
}

export default function ShippingDashboard() {
  const [timeFilter, setTimeFilter] = useState<
    "today" | "this-month" | "this-year"
  >("this-month");

  // Updated to use proper types instead of 'any'
  // const { data: tripsData } = useApiData<TripData[]>(
  //   `/business-intelligence/trips/${timeFilter}`,
  //   [timeFilter]
  // );
  const { data: paymentsData } = useApiData<PaymentData[]>(
    `/business-intelligence/payments/${timeFilter}`,
    [timeFilter]
  );
  const { data: expensesData } = useApiData<ExpenseData[]>(
    `/business-intelligence/expenses/${timeFilter}`,
    [timeFilter]
  );
  const { data: cargosData } = useApiData<CargoData[]>(
    `/business-intelligence/cargos/${timeFilter}`,
    [timeFilter]
  );
  // const { data: passengersData } = useApiData<PassengerData[]>(
  //   `/business-intelligence/passengers/${timeFilter}`,
  //   [timeFilter]
  // );
  // const { data: bookingsData } = useApiData<BookingData[]>(
  //   `/business-intelligence/bookings/${timeFilter}`,
  //   [timeFilter]
  // );

  const { data: dashboardMetrics } = useApiData<DashboardMetrics>(
    `/business-intelligence/dashboard-metrics/${timeFilter}`,
    [timeFilter]
  );

  const { data: routeProfitabilityData } = useApiData<RouteData[]>(
    `/business-intelligence/route-profitability/${timeFilter}`,
    [timeFilter]
  );

  const { data: topRoutes } = useApiData<RouteData[]>(
    `/business-intelligence/top-routes/${timeFilter}`,
    [timeFilter]
  );

  const { data: shipProfitsData } = useApiData<ShipProfitData[]>(
    `/business-intelligence/ship-profits/${timeFilter}`,
    [timeFilter]
  );

  console.log("Payments", paymentsData);
  console.log("Expenses", expensesData);
  console.log("Cargos", cargosData);
  console.log("TopRoute", topRoutes);
  console.log("Ship Profits", shipProfitsData);

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
        {/* Route Profitability Matrix */}
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
