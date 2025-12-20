"use client"

import { useState, useEffect } from "react"
import { useClientRoute } from "@/components/dynamic-view-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Trash, Eye, Clock, Tag, FileText } from "lucide-react"

// 模拟获取详情数据
const fetchDetail = (id: string) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: `动态内容 ${id}`,
        description: `这是动态内容 ${id} 的详细描述。这里可以包含丰富的内容，包括文本、图片、视频等多媒体元素。`,
        content: `<p>这是动态内容 ${id} 的正文内容。</p><p>可以包含<strong>富文本</strong>格式。</p><p>这里是第三段落，展示了更多的内容和格式。</p>`,
        category: Number.parseInt(id) % 3 === 0 ? "类别A" : Number.parseInt(id) % 3 === 1 ? "类别B" : "类别C",
        tags: ["标签1", "标签2", "标签3"],
        status:
          Number.parseInt(id) % 4 === 0
            ? "已发布"
            : Number.parseInt(id) % 4 === 1
              ? "草稿"
              : Number.parseInt(id) % 4 === 2
                ? "审核中"
                : "已归档",
        author: "管理员",
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleString(),
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toLocaleString(),
        viewCount: Math.floor(Math.random() * 1000),
        comments: Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => ({
          id: i + 1,
          author: `用户${i + 1}`,
          content: `这是对内容 ${id} 的评论 ${i + 1}`,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toLocaleString(),
        })),
      })
    }, 800)
  })
}

export default function DynamicDetail() {
  const { params, navigate } = useClientRoute()
  const [detail, setDetail] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.id) {
      navigate("list")
      return
    }

    setLoading(true)
    fetchDetail(params.id)
      .then((data) => {
        setDetail(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching detail:", error)
        setLoading(false)
      })
  }, [params.id, navigate])

  // 返回列表
  const handleBack = () => {
    navigate("list")
  }

  // 编辑内容
  const handleEdit = () => {
    navigate("edit")
  }

  if (loading) {
    return <div className="p-8 text-center">加载中...</div>
  }

  if (!detail) {
    return <div className="p-8 text-center">内容不存在或已被删除</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={handleBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>返回列表</span>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit} className="flex items-center gap-1">
            <Edit className="h-4 w-4" />
            <span>编辑</span>
          </Button>
          <Button variant="destructive" className="flex items-center gap-1">
            <Trash className="h-4 w-4" />
            <span>删除</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{detail.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>创建于 {detail.createdAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span>{detail.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{detail.viewCount} 次查看</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>
                状态：
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ml-1 ${
                    detail.status === "已发布"
                      ? "bg-green-100 text-green-800"
                      : detail.status === "草稿"
                        ? "bg-gray-100 text-gray-800"
                        : detail.status === "审核中"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {detail.status}
                </span>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">内容</TabsTrigger>
              <TabsTrigger value="comments">评论 ({detail.comments.length})</TabsTrigger>
              <TabsTrigger value="history">历史记录</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="mt-4">
              <div className="space-y-4">
                <div className="text-gray-700">{detail.description}</div>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: detail.content }} />
                <div className="flex flex-wrap gap-2 mt-4">
                  {detail.tags.map((tag: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="comments" className="mt-4">
              {detail.comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">暂无评论</div>
              ) : (
                <div className="space-y-4">
                  {detail.comments.map((comment: any) => (
                    <div key={comment.id} className="border p-4 rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-sm text-gray-500">{comment.createdAt}</span>
                      </div>
                      <p className="mt-2">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <div className="space-y-4">
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">更新内容</span>
                    <span className="text-sm text-gray-500">{detail.updatedAt}</span>
                  </div>
                  <p className="mt-2">内容被管理员更新</p>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">创建内容</span>
                    <span className="text-sm text-gray-500">{detail.createdAt}</span>
                  </div>
                  <p className="mt-2">内容被创建</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
