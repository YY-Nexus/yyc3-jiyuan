"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface EmailTaskFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function EmailTaskFormDialog({ isOpen, onClose, onSubmit }: EmailTaskFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
    sendTime: "",
    targetType: "全部用户",
    targetCount: "",
    remark: "",
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
          <DialogTitle>新建邮件任务</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 my-4">
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
              <span className="text-red-500 mr-1">*</span>邮件主题:
            </Label>
            <Input
              placeholder="请输入邮件主题"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>邮件内容:
            </Label>
            <Textarea
              placeholder="请输入邮件内容"
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
                <RadioGroupItem value="全部用户" id="all-users-email" />
                <Label htmlFor="all-users-email">全部用户</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="指定用户" id="specific-users-email" />
                <Label htmlFor="specific-users-email">指定用户</Label>
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
              <Button variant="outline" size="sm" className="mt-2">
                选择用户
              </Button>
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
