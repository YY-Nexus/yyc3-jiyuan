"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PhoneTaskFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function PhoneTaskFormDialog({ isOpen, onClose, onSubmit }: PhoneTaskFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "销售跟进",
    template: "",
    startTime: "",
    endTime: "",
    targetType: "全部客户",
    targetCount: "",
    remark: "",
  })

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("基本信息")

  // 模拟话术模板数据
  const templates = [
    {
      id: "template1",
      name: "销售模板1",
      image: "/sales-template-1.png",
    },
    {
      id: "template2",
      name: "销售模板2",
      image: "/sales-template-2.png",
    },
    {
      id: "template3",
      name: "销售模板3",
      image: "/sales-template-3.png",
    },
    {
      id: "template4",
      name: "销售模板4",
      image: "/sales-template-1.png",
    },
    {
      id: "template5",
      name: "销售模板5",
      image: "/sales-template-2.png",
    },
    {
      id: "template6",
      name: "销售模板6",
      image: "/sales-template-3.png",
    },
  ]

  const handleSubmit = () => {
    onSubmit({ ...formData, template: selectedTemplate })
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>新建电话任务</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="基本信息">基本信息</TabsTrigger>
            <TabsTrigger value="话术模板">话术模板</TabsTrigger>
          </TabsList>

          <TabsContent value="基本信息" className="space-y-4 mt-4">
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
                <span className="text-red-500 mr-1">*</span>任务类型:
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="请选择任务类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="销售跟进">销售跟进</SelectItem>
                  <SelectItem value="客户回访">客户回访</SelectItem>
                  <SelectItem value="满意度调查">满意度调查</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>开始时间:
                </Label>
                <Input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange("startTime", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>结束时间:
                </Label>
                <Input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                <span className="text-red-500 mr-1">*</span>目标客户:
              </Label>
              <RadioGroup
                value={formData.targetType}
                onValueChange={(value) => handleInputChange("targetType", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="全部客户" id="all-customers" />
                  <Label htmlFor="all-customers">全部客户</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="指定客户" id="specific-customers" />
                  <Label htmlFor="specific-customers">指定客户</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.targetType === "指定客户" && (
              <div className="space-y-2">
                <Label className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>客户数量:
                </Label>
                <Input
                  placeholder="请输入客户数量"
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

          <TabsContent value="话术模板" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="flex items-center">
                <span className="text-red-500 mr-1">*</span>选择话术模板:
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {templates.slice(0, 3).map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-md p-2 cursor-pointer ${
                      selectedTemplate === template.id ? "border-blue-600 bg-blue-50" : ""
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <img
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full h-auto mb-2"
                    />
                    <p className="text-xs text-center">{template.name}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {templates.slice(3, 6).map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-md p-2 cursor-pointer ${
                      selectedTemplate === template.id ? "border-blue-600 bg-blue-50" : ""
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <img
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full h-auto mb-2"
                    />
                    <p className="text-xs text-center">{template.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-4">
              <Button variant="outline" className="w-20">
                更多
              </Button>
            </div>

            {selectedTemplate && (
              <div className="space-y-2 mt-4">
                <Label>话术预览:</Label>
                <div className="border rounded-md p-3 bg-gray-50 text-sm">
                  您好，我是{"{公司名称}"}
                  的客服代表。我们注意到您最近对我们的产品表示了兴趣，想跟您确认一下您是否有任何问题需要解答？
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            取消
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
            确定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
