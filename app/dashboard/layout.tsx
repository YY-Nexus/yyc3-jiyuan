import type React from "react"
import OptimizedLayout from "@/components/optimized-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "仪表盘 | YanYu Cloud³",
  description: "YanYu Cloud³ 智能营销与客户管理平台仪表盘",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OptimizedLayout title="仪表盘" description="欢迎使用 YanYu Cloud³ 智能营销与客户管理平台">
      {children}
    </OptimizedLayout>
  )
}
