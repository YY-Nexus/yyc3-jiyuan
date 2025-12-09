"use client"

import type React from "react"

import { useState } from "react"
import { useClientRoute } from "@/components/dynamic-view-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"

export default function DynamicCreate() {
  const { navigate } = useClientRoute()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    tags: "",
    status: "draft",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      console.log("提交的数据:", formData)
      setIsSubmitting(false)
      navigate("list")
    }, 1000)
  }

  // 返回列表
  const handleBack = () => {
    navigate("list")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={handleBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>返回列表</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>创建新内容</CardTitle>
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
