"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useClientRoute } from "@/components/dynamic-view-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"

// 模拟获取详情数据
const fetchDetail = (id: string) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: `动态内容 ${id}`,
        description: `这是动态内容 ${id} 的详细描述。这里可以包含丰富的内容，包括文本、图片、视频等多媒体元素。`,
        content: `这是动态内容 ${id} 的正文内容。可以包含富文本格式。这里是第三段落，展示了更多的内容和格式。`,
        category: Number.parseInt(id) % 3 === 0 ? "类别A" : Number.parseInt(id) % 3 === 1 ? "类别B" : "类别C",
        tags: "标签1,标签2,标签3",
        status:
          Number.parseInt(id) % 4 === 0
            ? "published"
            : Number.parseInt(id) % 4 === 1
              ? "draft"
              : Number.parseInt(id) % 4 === 2
                ? "review"
                : "archived",
      })
    }, 800)
  })
}

export default function DynamicEdit() {
  const { params, navigate } = useClientRoute()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    tags: "",
    status: "",
  })
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!params.id) {
      navigate("list")
      return
    }

    setLoading(true)
    fetchDetail(params.id)
      .then((data) => {
        setFormData({
          title: data.title,
          description: data.description,
          content: data.content,
          category: data.category,
          tags: data.tags,
          status: data.status,
        })
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching detail:", error)
        setLoading(false)
      })
  }, [params.id, navigate])

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 处理选择框变化
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 提交表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 模拟API调用
    setTimeout(() => {
      console.log("更新的数据:", { id: params.id, ...formData })
      setIsSubmitting(false)
      navigate("detail")
    }, 1000)
  }

  // 返回详情
  const handleBack = () => {
    navigate("detail")
  }

  if (loading) {
    return <div className="p-8 text-center">加载中...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={handleBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>返回详情</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>编辑内容</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">标题</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="输入内容标题"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="输入内容描述"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">正文内容</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="输入正文内容"
                rows={6}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">类别</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择类别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="类别A">类别A</SelectItem>
                    <SelectItem value="类别B">类别B</SelectItem>
                    <SelectItem value="类别C">类别C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">状态</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">草稿</SelectItem>
                    <SelectItem value="published">已发布</SelectItem>
                    <SelectItem value="review">审核中</SelectItem>
                    <SelectItem value="archived">已归档</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">标签</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="输入标签，用逗号分隔"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack}>
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex items-center gap-1">
              {isSubmitting ? (
                "提交中..."
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>保存</span>
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
