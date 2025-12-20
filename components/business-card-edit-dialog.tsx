"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { updateBusinessCardAction } from "@/app/business-card/actions"
import { useToast } from "@/hooks/use-toast"
import type { BusinessCard } from "@/types"

interface BusinessCardEditDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (card: BusinessCard) => void
  card: BusinessCard | null
}

export function BusinessCardEditDialog({ isOpen, onClose, onSave, card }: BusinessCardEditDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // 表单状态
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    address: "",
  })

  // 当卡片数据变化时更新表单
  useEffect(() => {
    if (card) {
      setFormData({
        name: card.name || "",
        title: card.title || "",
        company: card.company || "",
        phone: card.phone || "",
        email: card.email || "",
        website: card.website || "",
        address: card.address || "",
      })
    }
  }, [card])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!card) return

    setIsSubmitting(true)

    try {
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      const result = await updateBusinessCardAction(card.id, formDataObj)

      if (result.error) {
        toast({
          title: "更新失败",
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
        title: "更新失败",
        description: (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!card) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>编辑名片</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">姓名 *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">职位</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">公司 *</Label>
            <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">电话 *</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">网站</Label>
            <Input id="website" name="website" value={formData.website} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">地址</Label>
            <Textarea id="address" name="address" value={formData.address} onChange={handleChange} />
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
