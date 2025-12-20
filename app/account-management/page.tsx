"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { AccountFormDialog } from "@/components/account-form-dialog"
import { AccountEnableDialog } from "@/components/account-enable-dialog"
import { handleFormSubmit, handleEnableAccount, handleEnableExpiredAccount } from "./actions"

interface Account {
  id: number
  username: string
  role: string
  status: string
  creator: string
  createTime: string
}

export default function AccountManagement() {
  const [searchUsername, setSearchUsername] = useState("")
  const [accountStatus, setAccountStatus] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEnableDialogOpen, setIsEnableDialogOpen] = useState(false)
  const [isExpiredDialogOpen, setIsExpiredDialogOpen] = useState(false)
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null)

  // 模拟数据
  const accounts: Account[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    username: i === 0 ? "admin" : `user${i}`,
    role: i === 0 ? "超级管理员" : i % 3 === 1 ? "部门经理" : "普通员工",
    status: i % 3 === 0 ? "启用" : "禁用",
    creator: "超级管理员",
    createTime: "2017-10-31 23:12:00",
  }))

  const onFormSubmit = async (data: any) => {
    await handleFormSubmit(data)
    setIsFormOpen(false)
  }

  const onEnableAccount = async () => {
    if (currentAccount?.id) {
      await handleEnableAccount(currentAccount.id)
    }
    setIsEnableDialogOpen(false)
    setCurrentAccount(null)
  }

  const onEnableExpiredAccount = async () => {
    if (currentAccount?.id) {
      await handleEnableExpiredAccount(currentAccount.id)
    }
    setIsExpiredDialogOpen(false)
    setCurrentAccount(null)
  }

  const openEnableDialog = (account: Account, isExpired = false) => {
    setCurrentAccount(account)
    if (isExpired) {
      setIsExpiredDialogOpen(true)
    } else {
      setIsEnableDialogOpen(true)
    }
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
            <span className="text-gray-800">账号管理</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">账号管理</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* 搜索筛选区 */}
            <div className="p-4 border-b flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">用户名:</span>
                <Input
                  placeholder="请输入用户名"
                  className="w-56"
                  value={searchUsername}
                  onChange={(e) => setSearchUsername(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">账号状态:</span>
                <Select value={accountStatus} onValueChange={setAccountStatus}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="enabled">启用</SelectItem>
                    <SelectItem value="disabled">禁用</SelectItem>
                  </SelectContent>
                </Select>
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
                    <TableHead>用户名</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>创建人</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.id}</TableCell>
                      <TableCell>{account.username}</TableCell>
                      <TableCell>{account.role}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            account.status === "启用" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {account.status}
                        </span>
                      </TableCell>
                      <TableCell>{account.creator}</TableCell>
                      <TableCell>{account.createTime}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="link" className="text-blue-600 h-auto p-0 mr-2">
                          查看
                        </Button>
                        <Button variant="link" className="text-blue-600 h-auto p-0 mr-2">
                          编辑
                        </Button>
                        {account.status === "禁用" && (
                          <Button
                            variant="link"
                            className="text-blue-600 h-auto p-0"
                            onClick={() => openEnableDialog(account, account.id % 2 === 0)}
                          >
                            启用
                          </Button>
                        )}
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

      {/* 添加账号表单 */}
      <AccountFormDialog isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={onFormSubmit} />

      {/* 启用账号对话框 */}
      <AccountEnableDialog
        isOpen={isEnableDialogOpen}
        onClose={() => setIsEnableDialogOpen(false)}
        onConfirm={onEnableAccount}
      />

      {/* 启用过期账号对话框 */}
      <AccountEnableDialog
        isOpen={isExpiredDialogOpen}
        onClose={() => setIsExpiredDialogOpen(false)}
        onConfirm={onEnableExpiredAccount}
        isExpired={true}
      />
    </div>
  )
}
