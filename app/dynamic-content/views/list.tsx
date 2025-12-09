"use client"

import { useState, useEffect } from "react"
import { useClientRoute } from "@/components/dynamic-view-container"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

// 模拟数据
const generateMockData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    title: `动态内容 ${i + 1}`,
    category: i % 3 === 0 ? "类别A" : i % 3 === 1 ? "类别B" : "类别C",
    status: i % 4 === 0 ? "已发布" : i % 4 === 1 ? "草稿" : i % 4 === 2 ? "审核中" : "已归档",
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }))
}

export default function DynamicList() {
  const { navigate, setParams } = useClientRoute()
  const [searchQuery, setSearchQuery] = useState("")
  const [data, setData] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])

  // 模拟数据加载
  useEffect(() => {
    // 模拟API调用延迟
    const timer = setTimeout(() => {
      const mockData = generateMockData(50)
      setData(mockData)
      setFilteredData(mockData)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // 处理搜索
  useEffect(() => {
    if (!data.length) return

    if (!searchQuery.trim()) {
      setFilteredData(data)
      return
    }

    const filtered = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setFilteredData(filtered)
  }, [searchQuery, data])

  // 查看详情
  const handleViewDetail = (id: string) => {
    setParams({ id })
    navigate("detail")
  }

  // 编辑内容
  const handleEdit = (id: string) => {
    setParams({ id })
    navigate("edit")
  }

  // 创建新内容
  const handleCreate = () => {
    navigate("create")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="搜索内容..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>创建内容</span>
        </Button>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">{data.length === 0 ? "加载中..." : "没有找到匹配的内容"}</div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>标题</TableHead>
                <TableHead>类别</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建日期</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "已发布"
                          ? "bg-green-100 text-green-800"
                          : item.status === "草稿"
                            ? "bg-gray-100 text-gray-800"
                            : item.status === "审核中"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetail(item.id)} className="mr-1">
                      查看
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item.id)}>
                      编辑
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
