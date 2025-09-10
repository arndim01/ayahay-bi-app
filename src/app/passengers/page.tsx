"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { Users, TrendingUp, Calendar, Star, Percent } from "lucide-react"

const passengerData = {
  totalPassengers: 45678,
  yoyGrowth: 12.5,
  avgTicketValue: 285,
  satisfactionScore: 4.2,
  loadFactor: 78.5,
  repeatRate: 34.2,
}

const routeBreakdown = [
  { route: "Miami-Nassau", passengers: 12450, percentage: 27.3, growth: 8.2 },
  { route: "Fort Lauderdale-Freeport", passengers: 9876, percentage: 21.6, growth: 15.1 },
  { route: "Key West-Havana", passengers: 8234, percentage: 18.0, growth: -2.3 },
  { route: "Tampa-Cozumel", passengers: 7890, percentage: 17.3, growth: 22.4 },
  { route: "Jacksonville-Bahamas", passengers: 7228, percentage: 15.8, growth: 5.7 },
]

const shipBreakdown = [
  { ship: "Ocean Explorer", passengers: 15234, capacity: 18500, utilization: 82.4 },
  { ship: "Sea Voyager", passengers: 12890, capacity: 16000, utilization: 80.6 },
  { ship: "Wave Rider", passengers: 10567, capacity: 14000, utilization: 75.5 },
  { ship: "Blue Horizon", passengers: 6987, capacity: 12000, utilization: 58.2 },
]

const ticketClassData = [
  { class: "Economy", passengers: 28906, percentage: 63.3, avgPrice: 185 },
  { class: "Premium", passengers: 12456, percentage: 27.3, avgPrice: 325 },
  { class: "Business", passengers: 3456, percentage: 7.6, avgPrice: 485 },
  { class: "VIP Suite", passengers: 860, percentage: 1.9, avgPrice: 850 },
]

const bookingTrends = [
  { period: "Jan", advance: 65, lastMinute: 35, noShow: 8.2 },
  { period: "Feb", advance: 72, lastMinute: 28, noShow: 6.8 },
  { period: "Mar", advance: 68, lastMinute: 32, noShow: 7.5 },
  { period: "Apr", advance: 75, lastMinute: 25, noShow: 5.9 },
  { period: "May", advance: 82, lastMinute: 18, noShow: 4.2 },
  { period: "Jun", advance: 78, lastMinute: 22, noShow: 5.1 },
]

const demographicsAge = [
  { ageGroup: "18-25", count: 6850, percentage: 15.0 },
  { ageGroup: "26-35", count: 12456, percentage: 27.3 },
  { ageGroup: "36-45", count: 13678, percentage: 29.9 },
  { ageGroup: "46-55", count: 8234, percentage: 18.0 },
  { ageGroup: "56-65", count: 3456, percentage: 7.6 },
  { ageGroup: "65+", count: 1004, percentage: 2.2 },
]

const customerBehavior = [
  { month: "Jan", firstTime: 4200, returning: 2800, repeat: 1500 },
  { month: "Feb", firstTime: 3800, returning: 3200, repeat: 1800 },
  { month: "Mar", firstTime: 4500, returning: 3000, repeat: 1600 },
  { month: "Apr", firstTime: 5200, returning: 3400, repeat: 2100 },
  { month: "May", firstTime: 6100, returning: 3800, repeat: 2400 },
  { month: "Jun", firstTime: 5800, returning: 4200, repeat: 2600 },
]

const satisfactionData = [
  { category: "Overall Experience", score: 4.2, responses: 3456 },
  { category: "Cabin Quality", score: 4.0, responses: 3234 },
  { category: "Food & Dining", score: 3.8, responses: 3567 },
  { category: "Entertainment", score: 4.1, responses: 2890 },
  { category: "Staff Service", score: 4.4, responses: 3678 },
  { category: "Value for Money", score: 3.9, responses: 3445 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function PassengersPage() {
  const [timeFilter, setTimeFilter] = useState("this-month")

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">People Dashboard</h1>
          <p className="text-muted-foreground">Passenger analytics and behavior patterns</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={timeFilter === "today" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFilter("today")}
          >
            Today
          </Button>
          <Button
            variant={timeFilter === "this-month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFilter("this-month")}
          >
            This Month
          </Button>
          <Button
            variant={timeFilter === "this-year" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFilter("this-year")}
          >
            This Year
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passengerData.totalPassengers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{passengerData.yoyGrowth}% YoY
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Ticket Value</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${passengerData.avgTicketValue}</div>
            <p className="text-xs text-muted-foreground">Per passenger</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Load Factor</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passengerData.loadFactor}%</div>
            <Progress value={passengerData.loadFactor} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passengerData.satisfactionScore}/5.0</div>
            <div className="flex text-yellow-400 text-sm mt-1">
              {"★".repeat(Math.floor(passengerData.satisfactionScore))}
              {"☆".repeat(5 - Math.floor(passengerData.satisfactionScore))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="breakdown" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="booking">Booking Trends</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Passengers by Route</CardTitle>
                <CardDescription>Distribution across different routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routeBreakdown.map((route, index) => (
                    <div key={route.route} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{route.route}</span>
                          <span className="text-sm text-muted-foreground">
                            {route.passengers.toLocaleString()} ({route.percentage}%)
                          </span>
                        </div>
                        <Progress value={route.percentage} className="h-2" />
                      </div>
                      <Badge variant={route.growth > 0 ? "default" : "destructive"} className="ml-2">
                        {route.growth > 0 ? "+" : ""}
                        {route.growth}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ticket Class Distribution</CardTitle>
                <CardDescription>Revenue and passenger breakdown by class</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ticketClassData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="passengers"
                      label={({ class: className, percentage }) => `${className} (${percentage}%)`}
                    >
                      {ticketClassData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ship Utilization</CardTitle>
              <CardDescription>Passenger capacity utilization by vessel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipBreakdown.map((ship) => (
                  <div key={ship.ship} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{ship.ship}</span>
                      <span className="text-sm text-muted-foreground">
                        {ship.passengers.toLocaleString()} / {ship.capacity.toLocaleString()} ({ship.utilization}%)
                      </span>
                    </div>
                    <Progress value={ship.utilization} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="booking" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Patterns</CardTitle>
                <CardDescription>Advance vs last-minute bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={bookingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="advance"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="Advance Bookings %"
                    />
                    <Area
                      type="monotone"
                      dataKey="lastMinute"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Last Minute %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>No-Show Rate Trends</CardTitle>
                <CardDescription>Monthly no-show percentages</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={bookingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="noShow" stroke="#ff7300" strokeWidth={3} name="No-Show Rate %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>Passenger demographics by age group</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={demographicsAge}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traveler Type</CardTitle>
                <CardDescription>Local vs international passengers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Local Travelers</span>
                    <span>68.5%</span>
                  </div>
                  <Progress value={68.5} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>International Travelers</span>
                    <span>31.5%</span>
                  </div>
                  <Progress value={31.5} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">31,289</div>
                    <div className="text-sm text-muted-foreground">Local</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">14,389</div>
                    <div className="text-sm text-muted-foreground">International</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Loyalty</CardTitle>
                <CardDescription>First-time vs returning passengers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={customerBehavior}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="firstTime"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="First Time"
                    />
                    <Area
                      type="monotone"
                      dataKey="returning"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Returning"
                    />
                    <Area
                      type="monotone"
                      dataKey="repeat"
                      stackId="1"
                      stroke="#ffc658"
                      fill="#ffc658"
                      name="Repeat (3+)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loyalty Metrics</CardTitle>
                <CardDescription>Key retention indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Repeat Passenger Rate</span>
                    <span className="font-bold">{passengerData.repeatRate}%</span>
                  </div>
                  <Progress value={passengerData.repeatRate} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">2.3</div>
                    <div className="text-sm text-muted-foreground">Avg Trips/Year</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">$658</div>
                    <div className="text-sm text-muted-foreground">Lifetime Value</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction Scores</CardTitle>
              <CardDescription>Feedback ratings across service categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {satisfactionData.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{item.score}/5.0</span>
                        <span className="text-xs text-muted-foreground">({item.responses} reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.score * 20} className="flex-1" />
                      <div className="flex text-yellow-400 text-sm">
                        {"★".repeat(Math.floor(item.score))}
                        {"☆".repeat(5 - Math.floor(item.score))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilization" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Load Factor by Route</CardTitle>
                <CardDescription>Passenger capacity utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={routeBreakdown} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="route" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peak vs Off-Peak</CardTitle>
                <CardDescription>Passenger distribution by time periods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Peak Season (Dec-Mar)</span>
                    <span>72.3%</span>
                  </div>
                  <Progress value={72.3} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Off-Peak Season (Apr-Nov)</span>
                    <span>27.7%</span>
                  </div>
                  <Progress value={27.7} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">33,025</div>
                    <div className="text-sm text-muted-foreground">Peak Season</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">12,653</div>
                    <div className="text-sm text-muted-foreground">Off-Peak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
