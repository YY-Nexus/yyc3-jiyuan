"use client"

import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"
import { useRouter } from "next/navigation"

export default function UserAnalysisPage() {
  const router = useRouter()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航路径 */}
        <div className="bg-white p-4 border-b text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="text-gray-800">用户分析</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">用户分析</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <h2 className="text-xl font-medium">用户分析功能</h2>
              <p className="text-gray-500">请选择要查看的分析类型</p>
              <div className="flex space-x-4 mt-4">
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/user-portrait")}>
                  查看用户画像
                </Button>
                <Button variant="outline">其他分析功能</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
