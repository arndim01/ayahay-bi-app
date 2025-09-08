"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Ship, Clock, Fuel, AlertTriangle, Anchor } from "lucide-react"

export default function OperationsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month")

  // Mock data for fleet utilization
  const fleetUtilizationData = [
    { ship: "Ocean Star", capacity: 85, trips: 12, avgUtilization: 78 },
    { ship: "Sea Pioneer", capacity: 92, trips: 15, avgUtilization: 85 },
    { ship: "Wave Runner", capacity: 76, trips: 10, avgUtilization: 72 },
    { ship: "Blue Horizon", capacity: 88, trips: 14, avgUtilization: 81 },
    { ship: "Maritime Express", capacity: 94, trips: 16, avgUtilization: 89 },
  ]

  // Mock data for punctuality
  const punctualityData = [
    { route: "Manila-Cebu", onTime: 94, delayed: 6, avgDelay: 15 },
    { route: "Cebu-Bohol", onTime: 88, delayed: 12, avgDelay: 22 },
    { route: "Manila-Palawan", onTime: 91, delayed: 9, avgDelay: 18 },
    { route: "Cebu-Dumaguete", onTime: 96, delayed: 4, avgDelay: 12 },
    { route: "Manila-Batangas", onTime: 89, delayed: 11, avgDelay: 25 },
  ]

  // Mock data for fuel efficiency trends
  const fuelEfficiencyData = [
    { month: "Jan", efficiency: 2.8, cost: 45000 },
    { month: "Feb", efficiency: 2.9, cost: 43000 },
    { month: "Mar", efficiency: 2.7, cost: 47000 },
    { month: "Apr", efficiency: 3.1, cost: 41000 },
    { month: "May", efficiency: 3.0, cost: 42000 },
    { month: "Jun", efficiency: 3.2, cost: 39000 },
  ]

  // Mock data for downtime analysis
  const downtimeData = [
    { category: "Maintenance", hours: 120, percentage: 45 },
    { category: "Weather", hours: 85, percentage: 32 },
    { category: "Port Delays", hours: 40, percentage: 15 },
    { category: "Mechanical", hours: 22, percentage: 8 },
  ]

  // Mock data for turnaround times
  const turnaroundData = [
    { port: "Manila", avgTime: 4.2, target: 4.0, trips: 45 },
    { port: "Cebu", avgTime: 3.8, target: 4.0, trips: 38 },
    { port: "Iloilo", avgTime: 5.1, target: 4.5, trips: 22 },
    { port: "Davao", avgTime: 4.7, target: 4.5, trips: 28 },
    { port: "Bohol", avgTime: 3.2, target: 3.5, trips: 15 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Operations Dashboard</h1>
          <p className="text-muted-foreground">Fleet performance and operational efficiency metrics</p>
        </div>

        <div className="flex gap-2">
          {["Today", "This Month", "This Year"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              onClick={() => setSelectedPeriod(period)}
              size="sm"
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Utilization</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
            <Progress value={82.4} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.6%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1.8%</span> from last month
            </p>
            <Progress value={91.6} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Efficiency</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.0</div>
            <p className="text-xs text-muted-foreground">
              km/liter <span className="text-green-600">+0.2</span> improvement
            </p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Turnaround</CardTitle>
            <Anchor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+0.3h</span> from target
            </p>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fleet" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="fleet">Fleet Performance</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="punctuality">Punctuality</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
        </TabsList>

        <TabsContent value="fleet" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Utilization by Ship</CardTitle>
                <CardDescription>Capacity utilization and trip frequency</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={fleetUtilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ship" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgUtilization" fill="#0088FE" name="Avg Utilization %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fleet Utilization Details</CardTitle>
                <CardDescription>Current capacity and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fleetUtilizationData.map((ship, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{ship.ship}</p>
                        <p className="text-sm text-muted-foreground">{ship.trips} trips completed</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{ship.avgUtilization}%</p>
                        <Badge variant={ship.avgUtilization > 80 ? "default" : "secondary"}>
                          {ship.avgUtilization > 80 ? "Optimal" : "Below Target"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Efficiency Trends</CardTitle>
                <CardDescription>Fuel consumption per nautical mile</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={fuelEfficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="efficiency" stroke="#00C49F" strokeWidth={2} name="km/liter" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Port Turnaround Times</CardTitle>
                <CardDescription>Average time vs target by port</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {turnaroundData.map((port, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{port.port}</span>
                        <span className="text-sm">
                          {port.avgTime}h / {port.target}h target
                        </span>
                      </div>
                      <Progress value={(port.target / port.avgTime) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">{port.trips} trips</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="punctuality" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>On-Time Performance by Route</CardTitle>
                <CardDescription>Departure and arrival punctuality</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={punctualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="route" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="onTime" fill="#00C49F" name="On Time %" />
                    <Bar dataKey="delayed" fill="#FF8042" name="Delayed %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Punctuality Details</CardTitle>
                <CardDescription>Route performance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {punctualityData.map((route, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{route.route}</span>
                        <Badge variant={route.onTime > 90 ? "default" : "destructive"}>{route.onTime}% On Time</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Avg delay when late: {route.avgDelay} minutes</div>
                      <Progress value={route.onTime} className="mt-2 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Cost per Trip</CardTitle>
                <CardDescription>Average operational costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₱45,200</div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-red-600">+5.2%</span> from last month
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fuel</span>
                    <span>₱28,500 (63%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Crew</span>
                    <span>₱12,200 (27%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Port Fees</span>
                    <span>₱4,500 (10%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost per Ton</CardTitle>
                <CardDescription>Cargo transportation efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₱1,250</div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-green-600">-2.1%</span> improvement
                </p>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={fuelEfficiencyData.slice(-4)}>
                    <Area type="monotone" dataKey="cost" stroke="#0088FE" fill="#0088FE" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost per Passenger</CardTitle>
                <CardDescription>Passenger service costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₱185</div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-green-600">-1.8%</span> optimization
                </p>
                <div className="mt-4">
                  <Progress value={72} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">72% of target efficiency</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Downtime Analysis</CardTitle>
              <CardDescription>Fleet availability and downtime causes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={downtimeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="hours"
                    >
                      {downtimeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {downtimeData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{item.hours}h</div>
                        <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Cargo Loss/Damage Incidents</CardTitle>
                <CardDescription>Monthly incident tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">0.08%</div>
                    <p className="text-sm text-muted-foreground">Incident Rate</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div className="flex-1">
                      <p className="font-medium">Minor cargo damage</p>
                      <p className="text-sm text-muted-foreground">Manila-Cebu route • 2 days ago</p>
                    </div>
                    <Badge variant="secondary">₱15,000</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div className="flex-1">
                      <p className="font-medium">Container water damage</p>
                      <p className="text-sm text-muted-foreground">Cebu-Bohol route • 5 days ago</p>
                    </div>
                    <Badge variant="destructive">₱45,000</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trip Completion Rate</CardTitle>
                <CardDescription>Scheduled vs completed trips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">96.8%</div>
                  <p className="text-sm text-muted-foreground">Completion rate this month</p>
                </div>
                <Progress value={96.8} className="mb-4" />
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-green-600">152</div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-red-600">5</div>
                    <p className="text-sm text-muted-foreground">Cancelled</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Cancellation Reasons:</p>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    <li>• Weather conditions: 3 trips</li>
                    <li>• Mechanical issues: 2 trips</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
