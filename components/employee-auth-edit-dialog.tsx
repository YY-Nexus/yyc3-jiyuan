"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EmployeeAuthEditDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function EmployeeAuthEditDialog({ isOpen, onClose, onConfirm }: EmployeeAuthEditDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>编辑</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="certifyType">员工认证:</Label>
            <Input id="certifyType" defaultValue="高级销售经理" />
          </div>

          <div className="text-red-500 text-sm">注: 此操作会将员工认证更新, 请谨慎操作!</div>
        </div>

        <DialogFooter className="flex justify-between gap-2">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={onConfirm}>
            确定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
