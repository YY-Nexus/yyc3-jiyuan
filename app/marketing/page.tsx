"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Sidebar from "@/components/sidebar"
import { MarketingDeployDialog } from "@/components/marketing-deploy-dialog"

interface MarketingTemplate {
  id: number
  title: string
  imageUrl: string
}

export default function MarketingManagement() {
  const [activeTab, setActiveTab] = useState("全部")
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<MarketingTemplate | null>(null)

  // 模拟数据
  const templates: MarketingTemplate[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: "小程序大能力，微企业精管理",
    imageUrl: "/placeholder.svg?key=g57ay",
  }))

  const handleUseTemplate = (template: MarketingTemplate) => {
    setSelectedTemplate(template)
    setIsDeployDialogOpen(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航路径 */}
        <div className="bg-white p-4 border-b text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>智能营销管理</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">智能营销管理</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm p-6">
            {/* 标签分类 */}
            <Tabs defaultValue="全部" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="border-b w-full flex justify-start space-x-6 rounded-none bg-transparent p-0 mb-6">
                <TabsTrigger
                  value="全部"
                  className="border-b-2 border-transparent px-1 pb-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none rounded-none bg-transparent"
                >
                  全部
                </TabsTrigger>
                <TabsTrigger
                  value="满意度"
                  className="border-b-2 border-transparent px-1 pb-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none rounded-none bg-transparent"
                >
                  满意度
                </TabsTrigger>
                <TabsTrigger
                  value="活动"
                  className="border-b-2 border-transparent px-1 pb-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none rounded-none bg-transparent"
                >
                  活动
                </TabsTrigger>
                <TabsTrigger
                  value="官网"
                  className="border-b-2 border-transparent px-1 pb-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none rounded-none bg-transparent"
                >
                  官网
                </TabsTrigger>
                <TabsTrigger
                  value="问卷"
                  className="border-b-2 border-transparent px-1 pb-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none rounded-none bg-transparent"
                >
                  问卷
                </TabsTrigger>
                <TabsTrigger
                  value="小程序"
                  className="border-b-2 border-transparent px-1 pb-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none rounded-none bg-transparent"
                >
                  小程序
                </TabsTrigger>
                <TabsTrigger
                  value="落地页"
                  className="border-b-2 border-transparent px-1 pb-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none rounded-none bg-transparent"
                >
                  落地页
                </TabsTrigger>
              </TabsList>

              {/* 所有标签内容使用同一个模板展示 */}
              <TabsContent value={activeTab} className="pt-2 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card key={template.id} className="overflow-hidden border border-gray-200">
                      <div className="bg-blue-600 p-4 flex items-center justify-center">
                        <div className="w-full aspect-[4/3] flex items-center justify-center">
                          <div className="w-2/3 h-full bg-white/30 rounded-md mx-auto"></div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="h-24">
                            <div className="text-xs text-gray-500 mb-1">上企业模板名称模板</div>
                            <div className="text-xs text-gray-500 mb-1">中企业模板名称模板</div>
                            <div className="text-xs text-gray-500 mb-1">下企业模板名称模板</div>
                          </div>
                          <div className="text-center text-sm">例子说明文字, 客制化模板内容</div>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">编辑</Button>
                          <Button variant="outline" className="w-full" onClick={() => handleUseTemplate(template)}>
                            使用模板
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* 智能投放对话框 */}
      <MarketingDeployDialog
        isOpen={isDeployDialogOpen}
        onClose={() => setIsDeployDialogOpen(false)}
        templateId={selectedTemplate?.id || 0}
      />
    </div>
  )
}
