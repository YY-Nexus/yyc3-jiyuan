"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DataCrawlerForm } from "@/components/data-crawler-form"
import Sidebar from "@/components/sidebar"

interface DataCrawlerDetailClientProps {
  id: string
}

export default function DataCrawlerDetailClient({ id }: DataCrawlerDetailClientProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [crawlerData, setCrawlerData] = useState<any>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  // 模拟数据加载
  useEffect(() => {
    // 实际应用中会调用API获取数据
    setTimeout(() => {
      setCrawlerData({
        id: Number.parseInt(id),
        name: "数据抓取名称" + id,
        source: "douyin",
        url: "https://www.baidu.com",
        dateRange: {
          from: new Date("2017-10-31"),
          to: new Date("2018-03-31"),
        },
        period: "daily",
        status: true,
        creator: "超级管理员",
        createTime: "2017-10-31 23:12:00",
      })
      setIsLoading(false)
    }, 500)
  }, [id])

  const handleFormSubmit = (data: any) => {
    // 保存编辑的数据
    console.log("更新数据:", data)
    // 实际应用中会调用API更新数据
    setIsFormOpen(false)
    router.push("/data-crawler")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航路径 */}
        <div className="bg-white p-4 border-b text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>数据管理</span>
            <span>/</span>
            <span>数据抓取管理</span>
            <span>/</span>
            <span className="text-gray-800">数据详情</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">数据抓取详情</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm p-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <span>加载中...</span>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">{crawlerData.name}</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsFormOpen(true)}>
                    编辑
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">数据源</p>
                    <p className="font-medium">
                      {crawlerData.source === "douyin"
                        ? "抖音"
                        : crawlerData.source === "kuaishou"
                          ? "快手"
                          : crawlerData.source === "toutiao"
                            ? "今日头条"
                            : "百度"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">数据抓取地址</p>
                    <p className="font-medium">{crawlerData.url}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">应用时间</p>
                    <p className="font-medium">
                      {new Date(crawlerData.dateRange.from).toLocaleDateString()} —
                      {new Date(crawlerData.dateRange.to).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">应用周期</p>
                    <p className="font-medium">
                      {crawlerData.period === "daily"
                        ? "每日24点"
                        : crawlerData.period === "monthly"
                          ? "每自然月1号24点"
                          : "立即生效"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">创建人</p>
                    <p className="font-medium">{crawlerData.creator}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">创建时间</p>
                    <p className="font-medium">{crawlerData.createTime}</p>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button variant="outline" className="mr-2" onClick={() => router.push("/data-crawler")}>
                    返回
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 编辑表单 */}
      <DataCrawlerForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />
    </div>
  )
}
