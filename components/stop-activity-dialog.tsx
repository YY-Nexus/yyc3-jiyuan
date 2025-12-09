"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface StopActivityDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function StopActivityDialog({ isOpen, onClose, onConfirm }: StopActivityDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <div className="py-6">
          <h3 className="text-center text-lg font-medium mb-6">停止提示</h3>
          <p className="text-center mb-6">你确定要停止该条活动吗?</p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={onConfirm}>
              确定
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
