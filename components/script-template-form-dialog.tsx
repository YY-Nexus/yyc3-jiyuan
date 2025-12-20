"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface ScriptTemplateFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function ScriptTemplateFormDialog({ isOpen, onClose, onSubmit }: ScriptTemplateFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    content: "",
    isRecommended: false,
  })

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>新建话术模版</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>模版名称:
            </Label>
            <Input
              placeholder="请输入模版名称"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>模版类型:
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="请选择模版类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="greeting">问候语</SelectItem>
                <SelectItem value="introduction">自我介绍</SelectItem>
                <SelectItem value="promotion">产品推广</SelectItem>
                <SelectItem value="followup">跟进话术</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>模版内容:
            </Label>
            <Textarea
              placeholder="请输入模版内容"
              className="min-h-[150px]"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
            />
            <div className="text-xs text-gray-500">
              提示：可以使用变量如 {"{客户姓名}"}, {"{公司名称}"}, {"{产品名称}"} 等，发送时会自动替换
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="recommended"
              checked={formData.isRecommended}
              onCheckedChange={(checked) => handleInputChange("isRecommended", checked)}
            />
            <Label htmlFor="recommended">设为推荐模版</Label>
          </div>
        </div>
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
