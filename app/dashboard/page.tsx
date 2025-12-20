import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart2,
  Users,
  Database,
  Settings,
  Activity,
  Calendar,
  TrendingUp,
  MessageSquare,
  Phone,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  // 统计卡片数据
  const statsCards = [
    {
      title: "总客户数",
      value: "1,234",
      change: "+12%",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      trend: "up",
    },
    {
      title: "本月消息",
      value: "5,678",
      change: "+8%",
      icon: <MessageSquare className="h-5 w-5 text-green-500" />,
      trend: "up",
    },
    {
      title: "待处理任务",
      value: "42",
      change: "-5%",
      icon: <CheckCircle className="h-5 w-5 text-orange-500" />,
      trend: "down",
    },
    {
      title: "今日活跃用户",
      value: "328",
      change: "+15%",
      icon: <Activity className="h-5 w-5 text-purple-500" />,
      trend: "up",
    },
  ]

  // 快速访问模块
  const quickAccessModules = [
    {
      title: "数据管理",
      description: "管理和分析系统数据",
      icon: <Database className="h-8 w-8 text-blue-500" />,
      path: "/data-crawler",
    },
    {
      title: "用户分析",
      description: "分析用户行为和特征",
      icon: <BarChart2 className="h-8 w-8 text-green-500" />,
      path: "/user-analysis",
    },
    {
      title: "消息管理",
      description: "管理系统消息和推送",
      icon: <MessageSquare className="h-8 w-8 text-red-500" />,
      path: "/message-task",
    },
    {
      title: "电话任务",
      description: "管理电话任务和记录",
      icon: <Phone className="h-8 w-8 text-orange-500" />,
      path: "/phone-task",
    },
    {
      title: "员工活动",
      description: "管理员工活动和绩效",
      icon: <Calendar className="h-8 w-8 text-purple-500" />,
      path: "/employee-activity",
    },
    {
      title: "系统设置",
      description: "配置系统参数和权限",
      icon: <Settings className="h-8 w-8 text-gray-500" />,
      path: "/system",
    },
  ]

  // 最近活动
  const recentActivities = [
    {
      id: 1,
      type: "message",
      title: "新消息",
      description: "客户张三发送了新消息",
      time: "10分钟前",
      icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 2,
      type: "task",
      title: "任务完成",
      description: "李四完成了跟进任务",
      time: "30分钟前",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      id: 3,
      type: "alert",
      title: "系统提醒",
      description: "系统备份已完成",
      time: "1小时前",
      icon: <AlertCircle className="h-4 w-4 text-orange-500" />,
    },
    {
      id: 4,
      type: "schedule",
      title: "日程安排",
      description: "明天上午10点团队会议",
      time: "2小时前",
      icon: <Clock className="h-4 w-4 text-purple-500" />,
    },
  ]

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p
                className={`text-xs mt-1 flex items-center ${card.trend === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {card.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                )}
                {card.change} 较上月
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 快速访问模块 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">快速访问</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccessModules.map((module, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  {module.icon}
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-20 flex items-center justify-center bg-gray-50 rounded-md">
                  <span className="text-gray-400">模块预览</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={module.path} className="w-full">
                  <Button className="w-full" variant="default">
                    进入模块
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* 最近活动和系统公告 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近活动 */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
            <CardDescription>系统中的最新活动和通知</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="mt-0.5">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              查看全部活动
            </Button>
          </CardFooter>
        </Card>

        {/* 系统公告 */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>系统公告</CardTitle>
            <CardDescription>重要的系统更新和通知</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                <p className="text-blue-800">
                  <span className="font-semibold">系统升级通知：</span>
                  YanYu Cloud³ 已完成全面升级，新增立体视觉响应式交互设计，提升用户体验。
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-md border border-green-100">
                <p className="text-green-800">
                  <span className="font-semibold">功能更新：</span>
                  新增多项功能模块，包括消息推送任务管理、电话任务管理和语音配置等。
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-md border border-yellow-100">
                <p className="text-yellow-800">
                  <span className="font-semibold">维护通知：</span>
                  系统将于本周日凌晨2:00-4:00进行例行维护，期间部分功能可能暂时不可用。
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              查看全部公告
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
