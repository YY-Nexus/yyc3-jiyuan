"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 记录错误到错误报告服务
    console.error("全局错误:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <div className="text-red-500 text-5xl mb-4">
            <AlertCircle size={64} />
          </div>
          <h2 className="text-2xl font-bold mb-4">系统错误</h2>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            应用程序发生了意外错误，我们已记录此问题并将尽快修复。
          </p>
          <div className="flex gap-4">
            <Button onClick={() => (window.location.href = "/")} variant="outline">
              返回首页
            </Button>
            <Button onClick={reset}>重试</Button>
          </div>
        </div>
      </body>
    </html>
  )
}
