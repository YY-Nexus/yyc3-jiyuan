"use client"

import { useClientRoute } from "@/components/dynamic-view-container"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  const { navigate } = useClientRoute()

  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">页面不存在</h2>
      <p className="text-gray-500 mb-6">您请求的视图不存在或已被删除</p>
      <Button onClick={() => navigate("list")} className="flex items-center gap-1 mx-auto">
        <ArrowLeft className="h-4 w-4" />
        <span>返回列表</span>
      </Button>
    </div>
  )
}
