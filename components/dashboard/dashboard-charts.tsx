"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function DashboardCharts() {
  // 用户增长数据
  const userGrowthData = [
    { month: "1月", users: 1200, newUsers: 120 },
    { month: "2月", users: 1350, newUsers: 150 },
    { month: "3月", users: 1580, newUsers: 230 },
    { month: "4月", users: 1820, newUsers: 240 },
    { month: "5月", users: 2100, newUsers: 280 },
    { month: "6月", users: 2400, newUsers: 300 },
    { month: "7月", users: 2847, newUsers: 447 },
  ]

  // 任务完成情况数据
  const taskData = [
    { name: "消息任务", completed: 856, pending: 124, failed: 32 },
    { name: "电话任务", completed: 432, pending: 68, failed: 15 },
    { name: "邮件任务", completed: 678, pending: 89, failed: 23 },
  ]

  // 用户角色分布数据
  const roleData = [
    { name: "普通用户", value: 2234, color: "#3B82F6" },
    { name: "部门经理", value: 456, color: "#10B981" },
    { name: "系统管理员", value: 123, color: "#F59E0B" },
    { name: "访客", value: 34, color: "#EF4444" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>数据分析</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="growth" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="growth">用户增长</TabsTrigger>
            <TabsTrigger value="tasks">任务统计</TabsTrigger>
            <TabsTrigger value="roles">用户分布</TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} name="总用户数" />
                  <Line type="monotone" dataKey="newUsers" stroke="#10B981" strokeWidth={2} name="新增用户" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#10B981" name="已完成" />
                  <Bar dataKey="pending" fill="#F59E0B" name="进行中" />
                  <Bar dataKey="failed" fill="#EF4444" name="失败" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
