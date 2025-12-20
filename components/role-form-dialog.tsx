"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface RoleFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function RoleFormDialog({ isOpen, onClose, onSubmit }: RoleFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    permissions: [] as string[],
  })

  const permissions = [
    "数据管理-数据抓取管理权限",
    "用户分析-用户画像查看权限",
    "用户分析-用户分析查看权限",
    "员工活动-活动管理权限",
    "智能营销-营销管理权限",
    "智能营销-营销投放权限",
    "文章管理-文章发布权限",
    "视频管理-视频发布权限",
  ]

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const togglePermission = (permission: string) => {
    setFormData((prev) => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission]
      return { ...prev, permissions: newPermissions }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>添加角色</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>角色名称:
            </Label>
            <Input
              placeholder="请输入角色名称"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <span className="text-red-500 mr-1">*</span>菜单权限设置:
            </Label>
            <div className="border rounded-md p-4 space-y-2">
              {permissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission}
                    checked={formData.permissions.includes(permission)}
                    onCheckedChange={() => togglePermission(permission)}
                  />
                  <Label htmlFor={permission} className="text-sm">
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
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
