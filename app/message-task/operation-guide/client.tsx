"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, MessageSquare, Send, Settings, Users } from "lucide-react"

export default function OperationGuideClient() {
  const [activeTab, setActiveTab] = useState("create")

  return (
    <div>
      <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="create">创建任务</TabsTrigger>
          <TabsTrigger value="manage">管理任务</TabsTrigger>
          <TabsTrigger value="analyze">分析结果</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>操作步骤</CardTitle>
              <CardDescription>了解如何创建新的消息推送任务</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <StepItem
                  icon={<MessageSquare className="h-5 w-5" />}
                  title="创建新任务"
                  description="点击&quot;新建&quot;按钮创建新的消息推送任务"
                />
                <StepItem
                  icon={<Users className="h-5 w-5" />}
                  title="选择发送对象"
                  description="选择发送对象，可以选择全部用户或指定用户"
                />
                <StepItem
                  icon={<Settings className="h-5 w-5" />}
                  title="设置任务��数"
                  description="填写任务名称、消息类型、消息内容等必填信息"
                />
                <StepItem
                  icon={<Send className="h-5 w-5" />}
                  title="发送任务"
                  description="设置发送时间，可以选择立即发送或定时发送"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>操作步骤</CardTitle>
              <CardDescription>了解如何管理现有的消息推送任务</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <StepItem
                  icon={<MessageSquare className="h-5 w-5" />}
                  title="查看任务列表"
                  description="在任务列表中查看所有消息推送任务"
                />
                <StepItem
                  icon={<Settings className="h-5 w-5" />}
                  title="管理任务"
                  description="可以查看、编辑或删除现有任务"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyze">
          <Card>
            <CardHeader>
              <CardTitle>操作步骤</CardTitle>
              <CardDescription>了解如何分析消息推送任务的结果</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <StepItem
                  icon={<MessageSquare className="h-5 w-5" />}
                  title="查看任务统计"
                  description="查看任务的发送统计数据，包括发送成功率、打开率等"
                />
                <StepItem
                  icon={<Settings className="h-5 w-5" />}
                  title="导出分析报告"
                  description="导出详细的任务分析报告，用于进一步分析"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StepItem({ icon, title, description }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-4">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
      <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
    </div>
  )
}
