"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Sidebar from "@/components/sidebar"
import { UserPreferencesPanel } from "@/components/preferences/user-preferences"
import { WorkspaceCustomizer } from "@/components/preferences/workspace-customizer"
import { PageTransition } from "@/components/ui/micro-interactions"

export default function UserPreferencesPage() {
  const [activeTab, setActiveTab] = useState("appearance")

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航路径 */}
        <div className="bg-white p-4 border-b text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>系统</span>
            <span>/</span>
            <span className="text-gray-800">用户偏好设置</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">用户偏好设置</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-6">
          <PageTransition>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>个性化您的体验</CardTitle>
                <CardDescription>自定义系统外观和行为，创建适合您工作方式的环境</CardDescription>
              </CardHeader>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
                <TabsTrigger value="appearance">外观与行为</TabsTrigger>
                <TabsTrigger value="workspace">工作区自定义</TabsTrigger>
              </TabsList>

              <TabsContent value="appearance">
                <UserPreferencesPanel />
              </TabsContent>

              <TabsContent value="workspace">
                <WorkspaceCustomizer />
              </TabsContent>
            </Tabs>
          </PageTransition>
        </div>
      </div>
    </div>
  )
}
