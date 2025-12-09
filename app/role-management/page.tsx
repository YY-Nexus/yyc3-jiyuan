"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { RoleFormDialog } from "@/components/role-form-dialog"
import { RolePermissionDialog } from "@/components/role-permission-dialog"

interface Role {
  id: number
  name: string
  creator: string
  createTime: string
}

export default function RoleManagement() {
  const [searchName, setSearchName] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isViewPermissionOpen, setIsViewPermissionOpen] = useState(false)
  const [isEditPermissionOpen, setIsEditPermissionOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState<Role | null>(null)

  // 模拟数据
  const roles: Role[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: i === 0 ? "超级管理员" : i === 1 ? "部门经理" : `普通员工${i}`,
    creator: "超级管理员",
    createTime: "2017-10-31 23:12:00",
  }))

  const handleFormSubmit = (data: any) => {
    console.log("表单数据:", data)
    setIsFormOpen(false)
  }

  const handlePermissionUpdate = (permissions: string[]) => {
    console.log("更新权限:", currentRole?.id, permissions)
    setIsEditPermissionOpen(false)
    setCurrentRole(null)
  }

  const openViewPermission = (role: Role) => {
    setCurrentRole(role)
    setIsViewPermissionOpen(true)
  }

  const openEditPermission = (role: Role) => {
    setCurrentRole(role)
    setIsEditPermissionOpen(true)
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
            <span className="text-gray-800">角色管理</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">角色管理</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* 搜索筛选区 */}
            <div className="p-4 border-b flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">角色名称:</span>
                <Input
                  placeholder="请输入角色名称"
                  className="w-56"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="flex-1"></div>
              <Button className="bg-blue-600 hover:bg-blue-700">查询</Button>
              <Button variant="outline">重置</Button>
            </div>

            {/* 操作按钮区 */}
            <div className="p-4 flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsFormOpen(true)}>
                新建
              </Button>
            </div>

            {/* 数据表格 */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">序号</TableHead>
                    <TableHead>角色名称</TableHead>
                    <TableHead>创建人</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>{role.id}</TableCell>
                      <TableCell>{role.name}</TableCell>
                      <TableCell>{role.creator}</TableCell>
                      <TableCell>{role.createTime}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="link"
                          className="text-blue-600 h-auto p-0 mr-2"
                          onClick={() => openViewPermission(role)}
                        >
                          查看
                        </Button>
                        <Button
                          variant="link"
                          className="text-blue-600 h-auto p-0 mr-2"
                          onClick={() => openEditPermission(role)}
                        >
                          编辑
                        </Button>
                        <Button variant="link" className="text-blue-600 h-auto p-0">
                          删除
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

      {/* 添加角色表单 */}
      <RoleFormDialog isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />

      {/* 查看角色权限对话框 */}
      <RolePermissionDialog
        isOpen={isViewPermissionOpen}
        onClose={() => setIsViewPermissionOpen(false)}
        roleName={currentRole?.name || ""}
        readOnly={true}
      />

      {/* 编辑角色权限对话框 */}
      <RolePermissionDialog
        isOpen={isEditPermissionOpen}
        onClose={() => setIsEditPermissionOpen(false)}
        onConfirm={handlePermissionUpdate}
        roleName={currentRole?.name || ""}
      />
    </div>
  )
}
