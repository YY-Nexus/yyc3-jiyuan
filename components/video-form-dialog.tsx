"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  ImageIcon,
  Link,
  Upload,
  Plus,
} from "lucide-react"

interface VideoFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function VideoFormDialog({ isOpen, onClose, onSubmit }: VideoFormDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    videoFile: null as File | null,
    isPublic: true,
    appId: "",
    miniProgram: "",
  })

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange("videoFile", e.target.files[0])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>发布视频</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>视频名称:
            </Label>
            <Input
              placeholder="请输入文章名称 (20字符)"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>上传视频:
            </Label>
            <div className="border rounded-md p-6 flex flex-col items-center justify-center">
              {formData.videoFile ? (
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">已选择视频:</div>
                  <div className="font-medium">{formData.videoFile.name}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleInputChange("videoFile", null)}
                  >
                    重新选择
                  </Button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-sm text-gray-500">点击上传视频</div>
                    <div className="text-xs text-gray-400">支持格式：MP4、AVI、MOV</div>
                  </div>
                  <Button variant="outline" onClick={() => document.getElementById("video-upload")?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    选择文件
                  </Button>
                  <input
                    id="video-upload"
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>视频描述:
            </Label>
            <div className="border rounded-md">
              {/* 编辑器工具栏 */}
              <div className="flex items-center p-2 border-b">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <AlignRight className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Link className="h-4 w-4" />
                </Button>
              </div>
              {/* 编辑器内容区 */}
              <div className="p-4 min-h-[200px]">
                <textarea
                  className="w-full h-full min-h-[200px] resize-none border-none focus:outline-none"
                  placeholder="请输入"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>视频属性:
            </Label>
            <div className="flex space-x-4">
              <Button
                variant={formData.isPublic ? "default" : "outline"}
                className={formData.isPublic ? "bg-blue-600 hover:bg-blue-700" : ""}
                onClick={() => handleInputChange("isPublic", true)}
              >
                公开
              </Button>
              <Button
                variant={!formData.isPublic ? "default" : "outline"}
                className={!formData.isPublic ? "bg-blue-600 hover:bg-blue-700" : ""}
                onClick={() => handleInputChange("isPublic", false)}
              >
                私有
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>APPID:</Label>
              <Input
                placeholder="自动获取ID"
                value={formData.appId}
                onChange={(e) => handleInputChange("appId", e.target.value)}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label>小程序:</Label>
              <Input
                placeholder="自动获取"
                value={formData.miniProgram}
                onChange={(e) => handleInputChange("miniProgram", e.target.value)}
                disabled
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            取消
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
            发布
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
