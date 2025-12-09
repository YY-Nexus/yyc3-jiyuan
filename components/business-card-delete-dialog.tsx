"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface BusinessCardDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  cardName?: string
}

export function BusinessCardDeleteDialog({ isOpen, onClose, onConfirm, cardName }: BusinessCardDeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            确认删除
          </DialogTitle>
          <DialogDescription>此操作不可逆，请确认是否删除此名片？</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>
            您即将删除名片: <span className="font-semibold">{cardName}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">删除后，该名片的所有信息将被永久移除。</p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm}>
            确认删除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
