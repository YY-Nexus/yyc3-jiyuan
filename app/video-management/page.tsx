"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { VideoFormDialog } from "@/components/video-form-dialog"

interface Video {
  id: number
  title: string
  publishTime: string
  viewCount: number
  likeCount: number
  commentCount: number
  shareCount: number
  publisher: string
}

export default function VideoManagement() {
  const [searchTitle, setSearchTitle] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)

  // 模拟数据
  const videos: Video[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: "6招已过，商品该如何引流?",
    publishTime: "2017-10-31 23:12:00",
    viewCount: 54321,
    likeCount: 24,
    commentCount: 1234,
    shareCount: 321,
    publisher: "超级管理员",
  }))

  const handleFormSubmit = (data: any) => {
    console.log("表单数据:", data)
    setIsFormOpen(false)
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
            <span>管理工具</span>
            <span>/</span>
            <span className="text-gray-800">营销视频管理</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">营销视频管理</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* 搜索筛选区 */}
            <div className="p-4 border-b flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">视频名称:</span>
                <Input
                  placeholder="请输入文章名称"
                  className="w-56"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">发布时间:</span>
                <div className="flex items-center space-x-2">
                  <Input type="date" className="w-40" placeholder="开始时间" />
                  <span>-</span>
                  <Input type="date" className="w-40" placeholder="结束时间" />
                </div>
              </div>
              <div className="flex-1"></div>
              <Button className="bg-blue-600 hover:bg-blue-700">查询</Button>
              <Button variant="outline">重置</Button>
            </div>

            {/* 操作按钮区 */}
            <div className="p-4 flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsFormOpen(true)}>
                发布视频
              </Button>
            </div>

            {/* 数据表格 */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">序号</TableHead>
                    <TableHead>视频名称</TableHead>
                    <TableHead>发布时间</TableHead>
                    <TableHead>浏览量</TableHead>
                    <TableHead>点赞量</TableHead>
                    <TableHead>转发量</TableHead>
                    <TableHead>发布人</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell>{video.id}</TableCell>
                      <TableCell>{video.title}</TableCell>
                      <TableCell>{video.publishTime}</TableCell>
                      <TableCell>{video.viewCount}</TableCell>
                      <TableCell>{video.likeCount}</TableCell>
                      <TableCell>{video.shareCount}</TableCell>
                      <TableCell>{video.publisher}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="link" className="text-blue-600 h-auto p-0 mr-2">
                          查看
                        </Button>
                        <Button variant="link" className="text-blue-600 h-auto p-0">
                          编辑
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* 分页控件 */}
            <div className="p-4 flex items-center justify-between text-sm">
              <div>共 215 条</div>
              <div className="flex items-center space-x-1">
                <div className="flex items-center mr-2">
                  <span>10条/页</span>
                  <ChevronLeft className="w-4 h-4" />
                </div>
                <Button variant="outline" size="icon" className="w-8 h-8 bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  2
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  3
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  4
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  5
                </Button>
                <span>...</span>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  23
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="flex items-center ml-2">
                  <span>前往</span>
                  <Input className="w-12 h-8 mx-1" />
                  <span>页</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 发布视频表单 */}
      <VideoFormDialog isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />
    </div>
  )
}
