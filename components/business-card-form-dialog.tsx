"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { createBusinessCardAction } from "@/app/business-card/actions"
import { useToast } from "@/hooks/use-toast"
import type { BusinessCard } from "@/types"

interface BusinessCardFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (card: BusinessCard) => void
}

export function BusinessCardFormDialog({ isOpen, onClose, onSave }: BusinessCardFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await createBusinessCardAction(formData)

      if (result.error) {
        toast({
          title: "创建失败",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      if (result.success && result.card) {
        onSave(result.card)
        onClose()
      }
    } catch (error) {
      toast({
        title: "创建失败",
        description: (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>创建新名片</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">姓名 *</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">职位</Label>
              <Input id="title" name="title" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">公司 *</Label>
            <Input id="company" name="company" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">电话 *</Label>
              <Input id="phone" name="phone" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" name="email" type="email" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">网站</Label>
            <Input id="website" name="website" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">地址</Label>
            <Textarea id="address" name="address" />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 保存中...
                </>
              ) : (
                "保存"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
