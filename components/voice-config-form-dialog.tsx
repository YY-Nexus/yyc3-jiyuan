"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { InfoIcon, Upload } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface VoiceConfigFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function VoiceConfigFormDialog({ isOpen, onClose, onSubmit }: VoiceConfigFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "问候语",
    content: "",
    voice: "女声",
    speed: "中速",
    uploadFile: null as File | null,
  })

  const [activeTab, setActiveTab] = useState("基本信息")

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange("uploadFile", e.target.files[0])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>新建语音配置</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="基本信息">基本信息</TabsTrigger>
            <TabsTrigger value="上传语音">上传语音</TabsTrigger>
          </TabsList>

          <TabsContent value="基本信息" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="flex items-center">
                <span className="text-red-500 mr-1">*</span>配置名称:
              </Label>
              <Input
                placeholder="请输入配置名称"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                <span className="text-red-500 mr-1">*</span>语音类型:
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="请选择语音类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="问候语">问候语</SelectItem>
                  <SelectItem value="结束语">结束语</SelectItem>
                  <SelectItem value="转接提示">转接提示</SelectItem>
                  <SelectItem value="等待提示">等待提示</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>语音内容:
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        可以使用变量如 {"{客户姓名}"}, {"{公司名称}"} 等
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                placeholder="请输入语音内容"
                className="min-h-[100px]"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>语音声音:
                </Label>
                <Select value={formData.voice} onValueChange={(value) => handleInputChange("voice", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择语音声音" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="女声">女声</SelectItem>
                    <SelectItem value="男声">男声</SelectItem>
                    <SelectItem value="童声">童声</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>语速:
                </Label>
                <Select value={formData.speed} onValueChange={(value) => handleInputChange("speed", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择语速" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="慢速">慢速</SelectItem>
                    <SelectItem value="中速">中速</SelectItem>
                    <SelectItem value="快速">快速</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="上传语音" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="flex items-center">
                <span className="text-red-500 mr-1">*</span>上传语音文件:
              </Label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-500 mb-2">点击或拖拽文件到此处上传</p>
                <p className="text-xs text-gray-400 mb-4">支持 MP3, WAV 格式，文件大小不超过 5MB</p>
                <Button variant="outline" size="sm" className="relative">
                  选择文件
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".mp3,.wav"
                    onChange={handleFileChange}
                  />
                </Button>
              </div>
            </div>

            {formData.uploadFile && (
              <div className="space-y-2 mt-4">
                <Label>已选择文件:</Label>
                <div className="flex items-center space-x-2 border rounded-md p-2 bg-blue-50">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Upload className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">{formData.uploadFile.name}</p>
                    <p className="text-xs text-gray-500">{(formData.uploadFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleInputChange("uploadFile", null)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    删除
                  </Button>
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
