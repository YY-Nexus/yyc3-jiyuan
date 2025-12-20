"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Copy, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface ScriptTemplateViewDialogProps {
  isOpen: boolean
  onClose: () => void
  template: any | null
}

export function ScriptTemplateViewDialog({ isOpen, onClose, template }: ScriptTemplateViewDialogProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  if (!template) {
    return null
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(template.content)
    setCopied(true)
    toast({
      title: "已复制到剪贴板",
      description: "模板内容已成功复制到剪贴板",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>话术模板详情</span>
            {template.isRecommended && (
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                推荐模板
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 my-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">模板名称</h3>
            <p className="mt-1">{template.name}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">模板类型</h3>
            <p className="mt-1">{template.type}</p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">模板内容</h3>
              <Button variant="outline" size="sm" className="h-8 flex items-center gap-1" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "已复制" : "复制"}
              </Button>
            </div>
            <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm whitespace-pre-wrap">{template.content}</div>
            <div className="mt-2 text-xs text-gray-500">
              提示：可以使用变量如 {"{客户姓名}"}, {"{公司名称}"}, {"{产品名称}"} 等，发送时会自动替换
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">创建人</h3>
              <p className="mt-1">{template.creator}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">创建时间</h3>
              <p className="mt-1">{template.createTime}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
