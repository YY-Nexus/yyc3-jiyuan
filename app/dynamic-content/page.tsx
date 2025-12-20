"use client"

import { DynamicViewContainer } from "@/components/dynamic-view-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useClientRoute } from "@/components/dynamic-view-container"

// 简单的列表视图
function ListView() {
  const { navigate } = useClientRoute()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">内容列表</h2>
        <Button onClick={() => navigate("create")}>创建内容</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <Card
            key={id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("detail", { id: id.toString() })}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">动态内容 {id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">这是动态内容 {id} 的简短描述...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// 简单的详情视图
function DetailView() {
  const { navigate, params } = useClientRoute()
  const id = params.id

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate("list")}>
          返回列表
        </Button>
        <Button onClick={() => navigate("edit", { id })}>编辑</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>动态内容 {id} 详情</CardTitle>
        </CardHeader>
        <CardContent>
          <p>这是动态内容 {id} 的详细信息。在实际应用中，这里会显示从API获取的数据。</p>
        </CardContent>
      </Card>
    </div>
  )
}

// 简单的创建视图
function CreateView() {
  const { navigate } = useClientRoute()

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button variant="outline" onClick={() => navigate("list")}>
          返回列表
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>创建新内容</CardTitle>
        </CardHeader>
        <CardContent>
          <p>这里是创建表单。在实际应用中，这里会有完整的表单组件。</p>
          <div className="mt-4">
            <Button onClick={() => navigate("list")}>保存并返回</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 简单的编辑视图
function EditView() {
  const { navigate, params } = useClientRoute()
  const id = params.id

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button variant="outline" onClick={() => navigate("detail", { id })}>
          返回详情
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>编辑内容 {id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>这里是编辑表单。在实际应用中，这里会有完整的表单组件，并加载现有数据。</p>
          <div className="mt-4">
            <Button onClick={() => navigate("detail", { id })}>保存并返回</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 404视图
function NotFoundView() {
  const { navigate } = useClientRoute()

  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">页面不存在</h2>
      <p className="text-gray-500 mb-6">您请求的视图不存在或已被删除</p>
      <Button onClick={() => navigate("list")}>返回列表</Button>
    </div>
  )
}

export default function DynamicContentPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">动态内容管理</h1>

      <DynamicViewContainer
        defaultView="list"
        views={{
          list: <ListView />,
          detail: <DetailView />,
          create: <CreateView />,
          edit: <EditView />,
          notFound: <NotFoundView />,
        }}
      />
    </div>
  )
}
