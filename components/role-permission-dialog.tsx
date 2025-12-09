"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface RolePermissionDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: (permissions: string[]) => void
  roleName: string
  readOnly?: boolean
}

export function RolePermissionDialog({
  isOpen,
  onClose,
  onConfirm,
  roleName,
  readOnly = false,
}: RolePermissionDialogProps) {
  const [permissions, setPermissions] = useState([
    "数据管理-数据抓取管理权限",
    "用户分析-用户画像查看权限",
    "用户分析-用户分析查看权限",
  ])

  const allPermissions = [
    "数据管理-数据抓取管理权限",
    "用户分析-用户画像查看权限",
    "用户分析-用户分析查看权限",
    "员工活动-活动管理权限",
    "智能营销-营销管理权限",
    "智能营销-营销投放权限",
    "文章管理-文章发布权限",
    "视频管理-视频发布权限",
  ]

  const togglePermission = (permission: string) => {
    if (readOnly) return
    setPermissions((prev) => (prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]))
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(permissions)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{readOnly ? "查看" : "设置"}角色菜单权限</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {readOnly ? (
            <p className="text-sm text-gray-500 mb-4">查看角色菜单权限，该角色拥有以下权限，如需修改请点击编辑按钮。</p>
          ) : (
            <p className="text-sm text-gray-500 mb-4">
              为角色 <span className="font-medium">{roleName}</span> 设置菜单权限，勾选需要授权的菜单项。
            </p>
          )}

          <div className="border rounded-md p-4 space-y-2">
            {allPermissions.map((permission) => (
              <div key={permission} className="flex items-center space-x-2">
                <Checkbox
                  id={permission}
                  checked={permissions.includes(permission)}
                  onCheckedChange={() => togglePermission(permission)}
                  disabled={readOnly}
                />
                <Label htmlFor={permission} className="text-sm">
                  {permission}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {readOnly ? "关闭" : "取消"}
          </Button>
          {!readOnly && (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleConfirm}>
              确定
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
