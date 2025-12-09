"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MenuFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function MenuFormDialog({ isOpen, onClose, onSubmit }: MenuFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    parentId: "",
    path: "",
    icon: "",
  })

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>添加菜单</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>菜单名称:
            </Label>
            <Input
              placeholder="请输入菜单名称"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>上级菜单:
            </Label>
            <Select value={formData.parentId} onValueChange={(value) => handleInputChange("parentId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="请选择上级菜单" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">顶级菜单</SelectItem>
                <SelectItem value="1">数据管理</SelectItem>
                <SelectItem value="2">用户分析</SelectItem>
                <SelectItem value="3">智能营销管理</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>菜单路径:
            </Label>
            <Input
              placeholder="请输入菜单路径"
              value={formData.path}
              onChange={(e) => handleInputChange("path", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">菜单图标:</Label>
            <Input
              placeholder="请输入菜单图标"
              value={formData.icon}
              onChange={(e) => handleInputChange("icon", e.target.value)}
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
