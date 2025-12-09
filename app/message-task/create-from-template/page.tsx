"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Sidebar from "@/components/sidebar"

export default function CreateFromTemplate() {
  const [formData, setFormData] = useState({
    name: "基于模板的推送任务",
    type: "普通消息",
    content: "尊敬的用户，感谢您对我们产品的支持，我们将持续为您提供优质服务。",
    sendTime: "",
    targetType: "全部用户",
    targetCount: "",
    remark: "",
  })

  const [activeTab, setActiveTab] = useState("基本信息")

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log("提交数据:", formData)
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
            <span>消息管理</span>
            <span>/</span>
            <span>消息推送任务管理</span>
            <span>/</span>
            <span className="text-gray-800">基于模板新建</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">基于模板新建任务</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="基本信息">基本信息</TabsTrigger>
                <TabsTrigger value="内容预览">内容预览</TabsTrigger>
              </TabsList>

              <TabsContent value="基本信息" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>任务名称:
                  </Label>
                  <Input
                    placeholder="请输入任务名称"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>消息类型:
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择消息类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="普通消息">普通消息</SelectItem>
                      <SelectItem value="营销消息">营销消息</SelectItem>
                      <SelectItem value="通知消息">通知消息</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>消息内容:
                  </Label>
                  <Textarea
                    placeholder="请输入消息内容"
                    className="min-h-[100px]"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>发送时间:
                  </Label>
                  <Input
                    type="datetime-local"
                    value={formData.sendTime}
                    onChange={(e) => handleInputChange("sendTime", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>发送对象:
                  </Label>
                  <RadioGroup
                    value={formData.targetType}
                    onValueChange={(value) => handleInputChange("targetType", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="全部用户" id="all-users" />
                      <Label htmlFor="all-users">全部用户</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="指定用户" id="specific-users" />
                      <Label htmlFor="specific-users">指定用户</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.targetType === "指定用户" && (
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <span className="text-red-500 mr-1">*</span>用户数量:
                    </Label>
                    <Input
                      placeholder="请输入用户数量"
                      value={formData.targetCount}
                      onChange={(e) => handleInputChange("targetCount", e.target.value)}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>备注说明:</Label>
                  <Textarea
                    placeholder="请输入备注说明"
                    value={formData.remark}
                    onChange={(e) => handleInputChange("remark", e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="内容预览" className="mt-6">
                <div className="border rounded-md p-6 bg-gray-50">
                  <h3 className="font-medium text-lg mb-4">消息预览</h3>
                  <div className="bg-white p-4 rounded-md border shadow-sm">
                    <p className="text-gray-800">{formData.content}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4 mt-8">
              <Button variant="outline">取消</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
                确定
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
