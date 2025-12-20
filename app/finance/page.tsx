"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, CreditCard, DollarSign } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"

interface Payment {
  id: number
  type: string
  payUnit: string
  receiveUnit: string
  amount: string
  date: string
  status: string
  payMethod: string
}

export default function FinanceManagement() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [transactionType, setTransactionType] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [activeTab, setActiveTab] = useState("全部(215)")

  // 模拟数据
  const payments: Payment[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    type: i % 2 === 0 ? "供应商付款" : "员工报销",
    payUnit: "齐齐哈尔老董餐饮股份有限公司",
    receiveUnit: i % 2 === 0 ? "江苏九八八硬科技有限公司" : "陈陈陈",
    amount: "18808.28",
    date: "2017-10-31",
    status: i % 4 === 0 ? "付款成功" : i % 4 === 1 ? "付款失败" : i % 4 === 2 ? "等待付款" : "等待付款",
    payMethod: i % 3 === 0 ? "银行转账" : i % 3 === 1 ? "微信支付" : "支付宝",
  }))

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航路径 */}
        <div className="bg-white p-4 border-b text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="text-gray-800">财务管理</span>
          </div>
          <h1 className="text-xl font-medium mt-2 text-gray-800">财务管理</h1>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-md shadow-sm p-4">
            {/* 财务统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 flex items-center">
                      已结算总工资明细合计 <span className="text-yellow-500 ml-1">⭐</span>
                    </div>
                    <div className="text-2xl font-bold mt-1">32,419.5</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <CreditCard className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 flex items-center">
                      已结算供应商付款合计 <span className="text-yellow-500 ml-1">⭐</span>
                    </div>
                    <div className="text-2xl font-bold mt-1">32,419.5</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mr-4">
                    <DollarSign className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 flex items-center">
                      待结算员工报销合计 <span className="text-yellow-500 ml-1">⭐</span>
                    </div>
                    <div className="text-2xl font-bold mt-1">32,419.5</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                    <DollarSign className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 flex items-center">
                      待结算供应商付款合计 <span className="text-yellow-500 ml-1">⭐</span>
                    </div>
                    <div className="text-2xl font-bold mt-1">32,419.5</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 搜索筛选区 */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">付款单位:</span>
                <Input
                  placeholder="请输入"
                  className="w-56"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">付款类型:</span>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="supplier">供应商付款</SelectItem>
                    <SelectItem value="employee">员工报销</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">交易状态:</span>
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="success">付款成功</SelectItem>
                    <SelectItem value="failed">付款失败</SelectItem>
                    <SelectItem value="waiting">等待付款</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center">
                <span className="mr-2 whitespace-nowrap">支付方式:</span>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="bank">银行转账</SelectItem>
                    <SelectItem value="wechat">微信支付</SelectItem>
                    <SelectItem value="alipay">支付宝</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1"></div>
              <Button className="bg-blue-600 hover:bg-blue-700">查询</Button>
              <Button variant="outline">重置</Button>
            </div>

            {/* 标签页 */}
            <div className="border-b mb-4">
              <div className="flex space-x-6">
                <Button
                  variant="link"
                  className={`px-0 ${
                    activeTab === "全部(215)" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("全部(215)")}
                >
                  全部(215)
                </Button>
                <Button
                  variant="link"
                  className={`px-0 ${
                    activeTab === "等待付款(10)" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("等待付款(10)")}
                >
                  等待付款(10)
                </Button>
                <Button
                  variant="link"
                  className={`px-0 ${
                    activeTab === "付款在途(5)" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("付款在途(5)")}
                >
                  付款在途(5)
                </Button>
                <Button
                  variant="link"
                  className={`px-0 ${
                    activeTab === "付款成功(195)" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("付款成功(195)")}
                >
                  付款成功(195)
                </Button>
              </div>
            </div>

            {/* 数据表格 */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">序号</TableHead>
                    <TableHead>付款类型</TableHead>
                    <TableHead>付款单位</TableHead>
                    <TableHead>收款单位</TableHead>
                    <TableHead>付款金额</TableHead>
                    <TableHead>付款日期</TableHead>
                    <TableHead>交易状态</TableHead>
                    <TableHead>支付方式</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>{payment.payUnit}</TableCell>
                      <TableCell>{payment.receiveUnit}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            payment.status === "付款成功"
                              ? "bg-blue-100 text-blue-600"
                              : payment.status === "付款失败"
                                ? "bg-red-100 text-red-600"
                                : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            payment.payMethod === "银行转账"
                              ? "bg-blue-100 text-blue-600"
                              : payment.payMethod === "微信支付"
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {payment.payMethod}
                        </span>
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
    </div>
  )
}
