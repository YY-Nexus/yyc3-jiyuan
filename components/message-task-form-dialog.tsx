"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface MessageTaskFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function MessageTaskFormDialog({ isOpen, onClose, onSubmit }: MessageTaskFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    content: "",
    targetType: "all",
    customTarget: "",
    sendType: "immediate",
    scheduledDate: null as Date | null,
  })

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>新建消息推送任务</DialogTitle>
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
              <span className="text-red-500 mr-1">*</span>消息类型:
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="请选择消息类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">普通消息</SelectItem>
                <SelectItem value="marketing">营销消息</SelectItem>
                <SelectItem value="notification">通知消息</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>消息内容:
            </Label>
            <Textarea
              placeholder="请输入消息内容"
              className="min-h-[120px]"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
            />
            <div className="text-xs text-gray-500">
              提示：可以使用变量如 {"{用户名}"}, {"{时间}"} 等，发送时会自动替换
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>发送对象:
            </Label>
            <RadioGroup
              value={formData.targetType}
              onValueChange={(value) => handleInputChange("targetType", value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">全部用户</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">指定用户</Label>
              </div>
            </RadioGroup>
            {formData.targetType === "custom" && (
              <div className="mt-2">
                <Input
                  placeholder="请输入用户ID，多个ID用逗号分隔"
                  value={formData.customTarget}
                  onChange={(e) => handleInputChange("customTarget", e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>发送时间:
            </Label>
            <RadioGroup
              value={formData.sendType}
              onValueChange={(value) => handleInputChange("sendType", value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="immediate" id="immediate" />
                <Label htmlFor="immediate">立即发送</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scheduled" id="scheduled" />
                <Label htmlFor="scheduled">定时发送</Label>
              </div>
            </RadioGroup>
            {formData.sendType === "scheduled" && (
              <div className="mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.scheduledDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.scheduledDate ? format(formData.scheduledDate, "PPP") : <span>选择日期</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.scheduledDate || undefined}
                      onSelect={(date) => handleInputChange("scheduledDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
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
