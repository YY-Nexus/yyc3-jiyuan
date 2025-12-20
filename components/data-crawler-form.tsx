"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, X, Circle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataCrawlerFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function DataCrawlerForm({ isOpen, onClose, onSubmit }: DataCrawlerFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    url: "",
    dateRange: { from: null, to: null },
    period: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    source: "",
    url: "",
    dateRange: "",
    period: "",
  })

  const [calendarOpen, setCalendarOpen] = useState(false)

  const validateForm = () => {
    const isValid = true
    const newErrors = {
      name: formData.name ? "" : "请输入数据抓取名称",
      source: formData.source ? "" : "",
      url: formData.url ? "" : "请输入数据抓取地址",
      dateRange: formData.dateRange.from && formData.dateRange.to ? "" : "请选择应用时间",
      period: formData.period ? "" : "请选择应用周期",
    }

    setErrors(newErrors)

    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      source: "",
      url: "",
      dateRange: { from: null, to: null },
      period: "",
    })
    setErrors({
      name: "",
      source: "",
      url: "",
      dateRange: "",
      period: "",
    })
  }

  useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>新建数据配置</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 my-4">
          <div className="space-y-1">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>数据抓取名称:
            </Label>
            <Input
              placeholder="请输入数据抓取名称"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>数据源选择:
            </Label>
            <RadioGroup
              value={formData.source}
              onValueChange={(value) => handleInputChange("source", value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="border rounded-md p-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="douyin" id="douyin" className="hidden" />
                  {formData.source === "douyin" ? (
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                  <Label htmlFor="douyin" className="flex items-center cursor-pointer">
                    <span className="text-lg">抖音</span>
                  </Label>
                </div>
              </div>
              <div className="border rounded-md p-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kuaishou" id="kuaishou" className="hidden" />
                  {formData.source === "kuaishou" ? (
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                  <Label htmlFor="kuaishou" className="flex items-center cursor-pointer">
                    <span className="text-lg">快手</span>
                  </Label>
                </div>
              </div>
              <div className="border rounded-md p-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="toutiao" id="toutiao" className="hidden" />
                  {formData.source === "toutiao" ? (
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                  <Label htmlFor="toutiao" className="flex items-center cursor-pointer">
                    <span className="text-lg">今日头条</span>
                  </Label>
                </div>
              </div>
              <div className="border rounded-md p-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="baidu" id="baidu" className="hidden" />
                  {formData.source === "baidu" ? (
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                  <Label htmlFor="baidu" className="flex items-center cursor-pointer">
                    <span className="text-lg">百度</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-1">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>
            </Label>
            <div className="flex items-center">
              <Input
                placeholder="请输入数据抓取地址"
                value={formData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
                className={cn("w-full", errors.url ? "border-red-500" : "")}
              />
              {formData.url && (
                <Button variant="ghost" className="p-1 ml-1" onClick={() => handleInputChange("url", "")}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
          </div>

          <div className="space-y-1">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>应用时间:
            </Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dateRange.from && "text-muted-foreground",
                    errors.dateRange ? "border-red-500" : "",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dateRange.from ? (
                    formData.dateRange.to ? (
                      <>
                        {format(formData.dateRange.from, "yyyy-MM-dd")} — {format(formData.dateRange.to, "yyyy-MM-dd")}
                      </>
                    ) : (
                      format(formData.dateRange.from, "yyyy-MM-dd")
                    )
                  ) : (
                    "开始时间 — 结束时间"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={formData.dateRange}
                  onSelect={(range) => {
                    handleInputChange("dateRange", range || { from: null, to: null })
                    if (range?.to) {
                      setCalendarOpen(false)
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.dateRange && <p className="text-red-500 text-sm">{errors.dateRange}</p>}
          </div>

          <div className="space-y-1">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>应用周期:
            </Label>
            <Select value={formData.period} onValueChange={(value) => handleInputChange("period", value)}>
              <SelectTrigger className={errors.period ? "border-red-500" : ""}>
                <SelectValue placeholder="请选择应用周期" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">每日24点</SelectItem>
                <SelectItem value="monthly">每自然月1号24点</SelectItem>
                <SelectItem value="immediate">立即生效</SelectItem>
              </SelectContent>
            </Select>
            {errors.period && <p className="text-red-500 text-sm">{errors.period}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
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
