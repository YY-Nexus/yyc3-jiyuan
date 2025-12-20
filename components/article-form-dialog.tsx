"use client"

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
} from "lucide-react"

interface ArticleFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function ArticleFormDialog({ isOpen, onClose, onSubmit }: ArticleFormDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>发布文章</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>文章名称:
            </Label>
            <Input
              placeholder="请输入文章名称 (20字符)"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>文章内容:
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
              <span className="text-red-500 mr-1">*</span>文章属性:
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
