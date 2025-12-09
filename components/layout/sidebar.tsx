"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  MessageSquare,
  Phone,
  FileText,
  BarChart3,
  Settings,
  Shield,
  Database,
  Megaphone,
  UserCheck,
  Activity,
  Video,
  DollarSign,
  UserCog,
  Navigation,
  PhoneCall,
  Mic,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Zap,
  TrendingUp,
  PieChart,
  Target,
  Briefcase,
  Clock,
  Star,
  Bookmark,
  Archive,
  Search,
  Download,
  Upload,
  RefreshCw,
  HelpCircle,
} from "lucide-react"
import Image from "next/image"

interface SidebarProps {
  isCollapsed: boolean
  user: {
    role: string
  }
}

interface MenuItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: MenuItem[]
  roles?: string[]
}

const menuItems: MenuItem[] = [
  {
    title: "仪表盘",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: "主页",
  },
  {
    title: "数据分析",
    href: "/analytics-dashboard",
    icon: TrendingUp,
    badge: "NEW",
    children: [
      { title: "用户画像", href: "/user-portrait", icon: Users },
      { title: "用户分析", href: "/user-analysis", icon: BarChart3 },
      { title: "详细分析", href: "/user-analysis/detail", icon: PieChart },
    ],
  },
  {
    title: "业务管理",
    href: "/business",
    icon: Briefcase,
    children: [
      { title: "名片管理", href: "/business-card", icon: CreditCard },
      { title: "数据爬虫", href: "/data-crawler", icon: Database },
      { title: "文章管理", href: "/article-management", icon: FileText },
      { title: "视频管理", href: "/video-management", icon: Video },
      { title: "财务管理", href: "/finance", icon: DollarSign },
    ],
  },
  {
    title: "营销推广",
    href: "/marketing",
    icon: Megaphone,
    children: [
      { title: "营销活动", href: "/marketing", icon: Target },
      { title: "活动部署", href: "/marketing/deploy", icon: Zap },
      { title: "员工活动", href: "/employee-activity", icon: Activity },
    ],
  },
  {
    title: "消息任务",
    href: "/message-task",
    icon: MessageSquare,
    badge: "热门",
    children: [
      { title: "任务列表", href: "/message-task", icon: MessageCircle },
      { title: "模板管理", href: "/message-task/template", icon: FileText },
      { title: "模板选择", href: "/message-task/template/select", icon: Bookmark },
      { title: "从模板创建", href: "/message-task/create-from-template", icon: Star },
      { title: "指定用户", href: "/message-task/create-specific-users", icon: Users },
      { title: "操作指南", href: "/message-task/operation-guide", icon: HelpCircle },
    ],
  },
  {
    title: "通信管理",
    href: "/communication",
    icon: Phone,
    children: [
      { title: "电话任务", href: "/phone-task", icon: PhoneCall },
      { title: "语音配置", href: "/voice-config", icon: Mic },
      { title: "话术模板", href: "/script-template", icon: FileText },
      { title: "聊天室", href: "/chat-room", icon: MessageCircle },
      { title: "增强聊天", href: "/chat-room/enhanced", icon: Zap },
      { title: "聊天登录", href: "/chat-room/login", icon: UserCheck },
    ],
  },
  {
    title: "系统管理",
    href: "/system",
    icon: Settings,
    roles: ["admin", "manager"],
    children: [
      { title: "用户管理", href: "/account-management", icon: Users, roles: ["admin"] },
      { title: "角色管理", href: "/role-management", icon: UserCog, roles: ["admin"] },
      { title: "菜单管理", href: "/menu-management", icon: Navigation, roles: ["admin"] },
      { title: "员工认证", href: "/employee-auth", icon: Shield },
    ],
  },
  {
    title: "个人中心",
    href: "/profile",
    icon: UserCheck,
    children: [
      { title: "用户偏好", href: "/user-preferences", icon: Settings },
      { title: "用户反馈", href: "/user-feedback", icon: MessageSquare },
      { title: "操作历史", href: "/operation-history-demo", icon: Clock },
    ],
  },
  {
    title: "高级功能",
    href: "/advanced",
    icon: Zap,
    badge: "PRO",
    children: [
      { title: "动态内容", href: "/dynamic-content", icon: RefreshCw },
      { title: "智能搜索", href: "/smart-search", icon: Search },
      { title: "批量操作", href: "/batch-operations", icon: Archive },
      { title: "数据导入", href: "/data-import", icon: Upload },
      { title: "数据导出", href: "/data-export", icon: Download },
    ],
  },
]

export function Sidebar({ isCollapsed, user }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) => (prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]))
  }

  const filterMenuByRole = (items: MenuItem[]): MenuItem[] => {
    return items.filter((item) => {
      if (item.roles && !item.roles.includes(user.role)) {
        return false
      }
      if (item.children) {
        item.children = filterMenuByRole(item.children)
      }
      return true
    })
  }

  const filteredMenuItems = filterMenuByRole(menuItems)

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
    const isExpanded = expandedItems.includes(item.href)
    const hasChildren = item.children && item.children.length > 0
    const Icon = item.icon

    return (
      <div key={item.href}>
        <div className={cn("relative", level > 0 && "ml-4")}>
          {hasChildren ? (
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 px-3",
                isActive && "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
                level > 0 && "text-sm",
              )}
              onClick={() => toggleExpanded(item.href)}
            >
              <Icon className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-3")} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <Badge variant={item.badge === "NEW" ? "default" : "secondary"} className="ml-2 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {isExpanded ? <ChevronDown className="h-4 w-4 ml-2" /> : <ChevronRight className="h-4 w-4 ml-2" />}
                </>
              )}
            </Button>
          ) : (
            <Link href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start h-10 px-3",
                  isActive && "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
                  level > 0 && "text-sm",
                )}
              >
                <Icon className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-3")} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <Badge variant={item.badge === "NEW" ? "default" : "secondary"} className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </Link>
          )}
        </div>

        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">{item.children?.map((child) => renderMenuItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="YanYu Cloud Logo"
            width={isCollapsed ? 32 : 40}
            height={isCollapsed ? 32 : 40}
            className="rounded-lg"
          />
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                言语云³
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">YanYu Cloud</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">{filteredMenuItems.map((item) => renderMenuItem(item))}</div>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 言语云³</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">YanYu Cloud CMS</p>
          </div>
        </div>
      )}
    </div>
  )
}
