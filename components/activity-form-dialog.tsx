"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { CalendarIcon, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function ActivityFormDialog({ isOpen, onClose, onSubmit }: ActivityFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    requirement: "",
    participants: "全部人员",
    importPhones: false,
    phoneFile: null as File | null,
    startTime: null as Date | null,
    endTime: null as Date | null,
  })

  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange("phoneFile", e.target.files[0])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>新建活动</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>活动名称:
            </Label>
            <Input
              placeholder="请输入活动名称(20字符内)"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>活动方式:
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="请选择活动类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="promotion">促销活动</SelectItem>
                <SelectItem value="lottery">抽奖活动</SelectItem>
                <SelectItem value="discount">折扣活动</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>活动要求:
            </Label>
            <Input
              placeholder="请输入活动要求(100字)"
              value={formData.requirement}
              onChange={(e) => handleInputChange("requirement", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>活动参与对象:
            </Label>
            <RadioGroup
              value={formData.participants}
              onValueChange={(value) => handleInputChange("participants", value)}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="全部人员" id="all" />
                <Label htmlFor="all">全部人员</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="指定人员" id="specific" />
                <Label htmlFor="specific">指定人员</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.participants === "指定人员" && (
            <div className="space-y-2 border p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={formData.importPhones ? "default" : "outline"}
                    className={formData.importPhones ? "bg-blue-600 hover:bg-blue-700" : ""}
                    onClick={() => handleInputChange("importPhones", true)}
                    size="sm"
                  >
                    导入手机号
                  </Button>
                  <Button
                    variant={!formData.importPhones ? "default" : "outline"}
                    className={!formData.importPhones ? "bg-blue-600 hover:bg-blue-700" : ""}
                    onClick={() => handleInputChange("importPhones", false)}
                    size="sm"
                  >
                    上传文件
                  </Button>
                </div>
              </div>

              {formData.importPhones ? (
                <Textarea placeholder="输入逗号分隔的手机号码列表，最多可导入10000个手机号" className="min-h-[100px]" />
              ) : (
                <div className="flex items-center justify-center border-2 border-dashed rounded-md p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        选择文件
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">支持 .xlsx, .xls, .csv 格式</p>
                    {formData.phoneFile && <p className="mt-2 text-sm text-blue-600">{formData.phoneFile.name}</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>活动开始时间:
            </Label>
            <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.startTime && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startTime ? format(formData.startTime, "yyyy-MM-dd HH:mm:ss") : "请选择活动开始时间"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.startTime}
                  onSelect={(date) => {
                    handleInputChange("startTime", date)
                    setStartDateOpen(false)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>活动结束时间:
            </Label>
            <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.endTime && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endTime ? format(formData.endTime, "yyyy-MM-dd HH:mm:ss") : "请选择活动结束时间"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.endTime}
                  onSelect={(date) => {
                    handleInputChange("endTime", date)
                    setEndDateOpen(false)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            取消
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
            提交
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
