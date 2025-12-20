"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2 } from "lucide-react"

// 历史记录类型
interface HistoryItem {
  id: string
  type: string
  field: string
  value: string
  timestamp: number
  frequency: number
}

// 默认值设置类型
interface SmartDefaultSettings {
  enabled: boolean
  rememberFormValues: boolean
  suggestBasedOnFrequency: boolean
  clearHistoryOnLogout: boolean
  maxHistoryItems: number
}

// 默认设置
const defaultSettings: SmartDefaultSettings = {
  enabled: true,
  rememberFormValues: true,
  suggestBasedOnFrequency: true,
  clearHistoryOnLogout: false,
  maxHistoryItems: 50,
}

export function SmartDefaultsManager() {
  const [settings, setSettings] = useState<SmartDefaultSettings>(defaultSettings)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [mounted, setMounted] = useState(false)

  // 加载保存的设置和历史记录
  useEffect(() => {
    setMounted(true)
    const savedSettings = localStorage.getItem("smartDefaultSettings")
    const savedHistory = localStorage.getItem("inputHistory")

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // 保存设置
  const saveSettings = (newSettings: SmartDefaultSettings) => {
    setSettings(newSettings)
    localStorage.setItem("smartDefaultSettings", JSON.stringify(newSettings))
  }

  // 更新单个设置
  const updateSetting = (key: keyof SmartDefaultSettings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    saveSettings(newSettings)
  }

  // 清除历史记录
  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("inputHistory")
  }

  // 删除单个历史记录项
  const deleteHistoryItem = (id: string) => {
    const newHistory = history.filter((item) => item.id !== id)
    setHistory(newHistory)
    localStorage.setItem("inputHistory", JSON.stringify(newHistory))
  }

  // 按类型过滤历史记录
  const filterHistoryByType = (type: string) => {
    return history.filter((item) => item.type === type)
  }

  // 格式化日期
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>智能默认值管理</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="settings">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="settings">设置</TabsTrigger>
            <TabsTrigger value="history">历史记录</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-smart-defaults" className="text-base font-medium">
                    启用智能默认值
                  </Label>
                  <p className="text-sm text-muted-foreground">根据您的使用习惯自动填充表单字段</p>
                </div>
                <Switch
                  id="enable-smart-defaults"
                  checked={settings.enabled}
                  onCheckedChange={(checked) => updateSetting("enabled", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="remember-form-values" className="text-base font-medium">
                    记住表单值
                  </Label>
                  <p className="text-sm text-muted-foreground">在您下次访问相同表单时记住之前输入的值</p>
                </div>
                <Switch
                  id="remember-form-values"
                  checked={settings.rememberFormValues}
                  onCheckedChange={(checked) => updateSetting("rememberFormValues", checked)}
                  disabled={!settings.enabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="suggest-frequency" className="text-base font-medium">
                    基于使用频率推荐
                  </Label>
                  <p className="text-sm text-muted-foreground">优先推荐您最常使用的值</p>
                </div>
                <Switch
                  id="suggest-frequency"
                  checked={settings.suggestBasedOnFrequency}
                  onCheckedChange={(checked) => updateSetting("suggestBasedOnFrequency", checked)}
                  disabled={!settings.enabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="clear-on-logout" className="text-base font-medium">
                    退出登录时清除历史
                  </Label>
                  <p className="text-sm text-muted-foreground">当您退出系统时自动清除所有输入历史</p>
                </div>
                <Switch
                  id="clear-on-logout"
                  checked={settings.clearHistoryOnLogout}
                  onCheckedChange={(checked) => updateSetting("clearHistoryOnLogout", checked)}
                  disabled={!settings.enabled}
                />
              </div>

              <div className="pt-4">
                <Button variant="destructive" onClick={clearHistory}>
                  清除所有历史记录
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="customer">客户信息</TabsTrigger>
                <TabsTrigger value="product">产品信息</TabsTrigger>
                <TabsTrigger value="order">订单信息</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-2">
                {history.length > 0 ? (
                  history.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-background border rounded-md"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.field}</span>
                          <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">{item.type}</span>
                        </div>
                        <p className="text-sm truncate max-w-[300px]">{item.value}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(item.timestamp)} · 使用次数: {item.frequency}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteHistoryItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">暂无历史记录</p>
                )}
              </TabsContent>

              <TabsContent value="customer" className="space-y-2">
                {filterHistoryByType("customer").length > 0 ? (
                  filterHistoryByType("customer").map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-background border rounded-md"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.field}</span>
                        </div>
                        <p className="text-sm truncate max-w-[300px]">{item.value}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(item.timestamp)} · 使用次数: {item.frequency}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteHistoryItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">暂无客户信息历史记录</p>
                )}
              </TabsContent>

              <TabsContent value="product" className="space-y-2">
                {filterHistoryByType("product").length > 0 ? (
                  filterHistoryByType("product").map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-background border rounded-md"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.field}</span>
                        </div>
                        <p className="text-sm truncate max-w-[300px]">{item.value}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(item.timestamp)} · 使用次数: {item.frequency}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteHistoryItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">暂无产品信息历史记录</p>
                )}
              </TabsContent>

              <TabsContent value="order" className="space-y-2">
                {filterHistoryByType("order").length > 0 ? (
                  filterHistoryByType("order").map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-background border rounded-md"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.field}</span>
                        </div>
                        <p className="text-sm truncate max-w-[300px]">{item.value}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(item.timestamp)} · 使用次数: {item.frequency}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteHistoryItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">暂无订单信息历史记录</p>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
