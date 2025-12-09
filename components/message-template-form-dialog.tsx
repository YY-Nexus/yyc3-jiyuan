"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MessageTemplateFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void> | void
  initialData?: any
}

export function MessageTemplateFormDialog({ isOpen, onClose, onSubmit, initialData }: MessageTemplateFormDialogProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [type, setType] = useState(initialData?.type || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!name || !type || !content) {
      alert("请填写完整信息")
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        name,
        type,
        content,
      })
    } catch (error) {
      console.error("提交失败:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "编辑模板" : "新建模板"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              模板名称
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="请输入模板名称"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              消息类型
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="请选择消息类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">普通消息</SelectItem>
                <SelectItem value="marketing">营销消息</SelectItem>
                <SelectItem value="notification">通知消息</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              模板内容
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="col-span-3"
              placeholder="请输入模板内容"
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "提交中..." : "确定"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
