"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
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
} from "recharts"
import { Ship, Users, Package, TrendingUp, DollarSign, Calendar, MapPin, Anchor } from "lucide-react"

// Sample data for the dashboard
const revenueData = [
  { month: "Jan", revenue: 2400000, profit: 800000, expenses: 1600000 },
  { month: "Feb", revenue: 2800000, profit: 950000, expenses: 1850000 },
  { month: "Mar", revenue: 3200000, profit: 1100000, expenses: 2100000 },
  { month: "Apr", revenue: 2900000, profit: 980000, expenses: 1920000 },
  { month: "May", revenue: 3500000, profit: 1200000, expenses: 2300000 },
  { month: "Jun", revenue: 3800000, profit: 1350000, expenses: 2450000 },
]

const topRoutes = [
  { route: "Shanghai-LA", cargo: 12500, passengers: 850, revenue: 2800000 },
  { route: "Hamburg-NYC", cargo: 11200, passengers: 720, revenue: 2400000 },
  { route: "Singapore-Rotterdam", cargo: 10800, passengers: 650, revenue: 2200000 },
  { route: "Dubai-Miami", cargo: 9500, passengers: 580, revenue: 1900000 },
  { route: "Tokyo-Seattle", cargo: 8900, passengers: 520, revenue: 1700000 },
]

const bookingDistribution = [
  { type: "Cargo", value: 65, color: "var(--color-chart-1)" },
  { type: "Passengers", value: 25, color: "var(--color-chart-2)" },
  { type: "Mixed", value: 10, color: "var(--color-chart-3)" },
]

const shipProfitData = [
  { ship: "Atlantic Star", profit: 450000, trips: 24 },
  { ship: "Pacific Queen", profit: 380000, trips: 22 },
  { ship: "Mediterranean", profit: 320000, trips: 20 },
  { ship: "Baltic Express", profit: 290000, trips: 18 },
  { ship: "Caribbean Dream", profit: 250000, trips: 16 },
]

const routeProfitability = [
  { route: "Shanghai-LA", profitMargin: 35, volume: "High", status: "Excellent" },
  { route: "Hamburg-NYC", profitMargin: 28, volume: "High", status: "Good" },
  { route: "Singapore-Rotterdam", profitMargin: 32, volume: "Medium", status: "Good" },
  { route: "Dubai-Miami", profitMargin: 25, volume: "Medium", status: "Average" },
  { route: "Tokyo-Seattle", profitMargin: 22, volume: "Low", status: "Average" },
]

export default function ShippingDashboard() {
  const [timeFilter, setTimeFilter] = useState("this month")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-500"
      case "Good":
        return "bg-blue-500"
      case "Average":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Executive Dashboard</h1>
          <p className="text-muted-foreground">Business Intelligence & Analytics Overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={timeFilter === "today" ? "default" : "outline"} onClick={() => setTimeFilter("today")}>
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
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18.6M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6.4M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8.2%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.2M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">+4.1%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+2.1%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Operational Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cargo (TEU)</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52,900</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+15.3%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,345</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+7.8%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+5.1%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue, Profit, Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue, Profit & Expenses</CardTitle>
            <CardDescription>Monthly financial performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Revenue", color: "var(--color-chart-1)" },
                profit: { label: "Profit", color: "var(--color-chart-2)" },
                expenses: { label: "Expenses", color: "var(--color-chart-3)" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" stroke="var(--color-chart-2)" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="var(--color-chart-3)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Booking Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Distribution</CardTitle>
            <CardDescription>Breakdown by booking type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                cargo: { label: "Cargo", color: "var(--color-chart-1)" },
                passengers: { label: "Passengers", color: "var(--color-chart-2)" },
                mixed: { label: "Mixed", color: "var(--color-chart-3)" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ type, value }) => `${type}: ${value}%`}
                  >
                    {bookingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Routes */}
        <Card>
          <CardHeader>
            <CardTitle>Top Routes Performance</CardTitle>
            <CardDescription>Revenue by route</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Revenue", color: "var(--color-chart-1)" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topRoutes} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="route" type="category" width={120} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-chart-1)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

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
                  <XAxis dataKey="ship" angle={-45} textAnchor="end" height={80} />
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
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{route.route}</p>
                      <p className="text-sm text-muted-foreground">Volume: {route.volume}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{route.profitMargin}%</span>
                    <Badge className={getStatusColor(route.status)}>{route.status}</Badge>
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
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Anchor className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{ship.ship}</p>
                      <p className="text-sm text-muted-foreground">Profit: ${ship.profit.toLocaleString()}</p>
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
  )
}
