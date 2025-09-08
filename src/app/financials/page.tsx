"use client";

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

export default function FinancialsPage() {
  const [timeFilter, setTimeFilter] = useState<
    "today" | "this month" | "this year"
  >("this month");

  // Sample data for charts
  const revenueByRoute = [
    { route: "Miami-Nassau", revenue: 2400000, profit: 480000, margin: 20 },
    {
      route: "Fort Lauderdale-Freeport",
      revenue: 1800000,
      profit: 270000,
      margin: 15,
    },
    { route: "Tampa-Havana", revenue: 3200000, profit: 640000, margin: 20 },
    { route: "Key West-Cozumel", revenue: 1600000, profit: 160000, margin: 10 },
    {
      route: "Jacksonville-San Juan",
      revenue: 2800000,
      profit: 420000,
      margin: 15,
    },
  ];

  const revenueByShip = [
    { ship: "Ocean Explorer", revenue: 3500000, utilization: 85 },
    { ship: "Sea Voyager", revenue: 2800000, utilization: 78 },
    { ship: "Wave Rider", revenue: 3200000, utilization: 82 },
    { ship: "Blue Horizon", revenue: 2400000, utilization: 71 },
    { ship: "Coral Princess", revenue: 2900000, utilization: 80 },
  ];

  const passengerVsCargo = [
    { name: "Passenger Revenue", value: 8500000, percentage: 65 },
    { name: "Cargo Revenue", value: 4600000, percentage: 35 },
  ];

  const customerTypes = [
    { type: "Corporate Contracts", revenue: 7200000, percentage: 55 },
    { type: "Walk-in Passengers", revenue: 3800000, percentage: 29 },
    { type: "Tour Operators", revenue: 2100000, percentage: 16 },
  ];

  const costBreakdown = [
    { category: "Fuel", amount: 2800000, percentage: 35, trend: 8 },
    { category: "Port Fees", amount: 1600000, percentage: 20, trend: -2 },
    { category: "Crew Salaries", amount: 2400000, percentage: 30, trend: 5 },
    {
      category: "Maintenance/Repairs",
      amount: 1200000,
      percentage: 15,
      trend: 12,
    },
  ];

  const revenueTrends = [
    { month: "Jan", revenue: 980000, budget: 950000, variance: 30000 },
    { month: "Feb", revenue: 1120000, budget: 1100000, variance: 20000 },
    { month: "Mar", revenue: 1350000, budget: 1300000, variance: 50000 },
    { month: "Apr", revenue: 1280000, budget: 1350000, variance: -70000 },
    { month: "May", revenue: 1450000, budget: 1400000, variance: 50000 },
    { month: "Jun", revenue: 1680000, budget: 1600000, variance: 80000 },
  ];

  const accountsReceivable = [
    { period: "0-30 days", amount: 850000, percentage: 68, status: "current" },
    { period: "31-60 days", amount: 280000, percentage: 22, status: "warning" },
    { period: "61-90 days", amount: 95000, percentage: 8, status: "overdue" },
    { period: "90+ days", amount: 25000, percentage: 2, status: "critical" },
  ];

  const accountsPayable = [
    { period: "0-30 days", amount: 620000, percentage: 72, status: "current" },
    { period: "31-60 days", amount: 180000, percentage: 21, status: "warning" },
    { period: "61-90 days", amount: 45000, percentage: 5, status: "overdue" },
    { period: "90+ days", amount: 15000, percentage: 2, status: "critical" },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Financial Dashboard"
        description="Comprehensive financial analysis and reporting"
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$13.1M</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12.5% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.97M</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +8.2% margin improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8.0M</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              +5.8% increase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.0%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +2.1% improvement
            </p>
          </CardContent>
        </Card>
      </div>

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
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Route</CardTitle>
                <CardDescription>
                  Performance analysis by shipping route
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByRoute}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="route"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(
                        value: number | string | (number | string)[]
                      ) => {
                        if (typeof value === "number") {
                          return [
                            `$${(value / 1_000_000).toFixed(1)}M`,
                            "Revenue",
                          ];
                        }
                        return [String(value), "Revenue"];
                      }}
                    />

                    <Bar dataKey="revenue" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue by Ship */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Ship</CardTitle>
                <CardDescription>
                  Fleet performance and utilization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={revenueByShip}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="ship"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="revenue" fill="#00C49F" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="utilization"
                      stroke="#FF8042"
                      strokeWidth={3}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Passenger vs Cargo Revenue */}
            <Card>
              <CardHeader>
                <CardTitle>Passenger vs Cargo Revenue</CardTitle>
                <CardDescription>
                  Revenue distribution by service type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={passengerVsCargo}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) =>
                        `${name}: ${percentage}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {passengerVsCargo.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(
                        value: number | string | (number | string)[]
                      ) => {
                        if (typeof value === "number") {
                          return [
                            `$${(value / 1_000_000).toFixed(1)}M`,
                            "Revenue",
                          ];
                        }
                        return [String(value), "Revenue"];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Type Revenue */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Customer Type</CardTitle>
                <CardDescription>
                  Corporate vs individual customer analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerTypes.map((customer, index) => (
                    <div
                      key={customer.type}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full`}
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <span className="text-sm font-medium">
                          {customer.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">
                          ${(customer.revenue / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {customer.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown Analysis</CardTitle>
              <CardDescription>
                Detailed analysis of operational expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {costBreakdown.map((cost, index) => (
                    <div key={cost.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {cost.category}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold">
                            ${(cost.amount / 1000000).toFixed(1)}M
                          </span>
                          <Badge
                            variant={cost.trend > 0 ? "destructive" : "default"}
                          >
                            {cost.trend > 0 ? "+" : ""}
                            {cost.trend}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={cost.percentage} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {cost.percentage}% of total costs
                      </div>
                    </div>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percentage }) =>
                        `${category}: ${percentage}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {costBreakdown.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number | string) => {
                        if (typeof value === "number") {
                          return [
                            `$${(value / 1_000_000).toFixed(1)}M`,
                            "Cost",
                          ];
                        }
                        return [value, "Cost"];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>
                  Monthly revenue performance over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number | string) => {
                        if (typeof value === "number") {
                          return [
                            `$${(value / 1_000_000).toFixed(1)}M`,
                            "Amount",
                          ];
                        }
                        return [value, "Amount"];
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0088FE"
                      strokeWidth={3}
                      name="Actual Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="budget"
                      stroke="#00C49F"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Budget"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual Variance</CardTitle>
                <CardDescription>
                  Performance against budget targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number | string) => {
                        if (typeof value === "number") {
                          return [`$${(value / 1000).toFixed(0)}K`, "Variance"];
                        }
                        return [value, "Variance"];
                      }}
                    />

                    <Bar dataKey="variance">
                      {revenueTrends.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.variance >= 0 ? "#00C49F" : "#FF8042"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Accounts Receivable Aging</CardTitle>
                <CardDescription>
                  Outstanding customer payments by age
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accountsReceivable.map((account, index) => (
                    <div
                      key={account.period}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center space-x-3">
                        {account.status === "current" && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {account.status === "warning" && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        {(account.status === "overdue" ||
                          account.status === "critical") && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">{account.period}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          ${(account.amount / 1000).toFixed(0)}K
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {account.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accounts Payable Aging</CardTitle>
                <CardDescription>
                  Outstanding vendor payments by age
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accountsPayable.map((account, index) => (
                    <div
                      key={account.period}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center space-x-3">
                        {account.status === "current" && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {account.status === "warning" && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        {(account.status === "overdue" ||
                          account.status === "critical") && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">{account.period}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          ${(account.amount / 1000).toFixed(0)}K
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {account.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                {revenueByRoute.map((route, index) => (
                  <div key={route.route} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{route.route}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm">
                          Revenue: ${(route.revenue / 1000000).toFixed(1)}M
                        </span>
                        <span className="text-sm">
                          Profit: ${(route.profit / 1000000).toFixed(1)}M
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
