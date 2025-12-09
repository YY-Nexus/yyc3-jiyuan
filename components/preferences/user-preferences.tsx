"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Moon, Monitor, Type } from "lucide-react"

// 用户偏好类型
interface UserPreferences {
  theme: string
  fontSize: number
  colorScheme: string
  notificationsEnabled: boolean
  soundEnabled: boolean
  animationsEnabled: boolean
  denseMode: boolean
  sidebarCollapsed: boolean
  language: string
}

// 默认偏好
const defaultPreferences: UserPreferences = {
  theme: "system",
  fontSize: 16,
  colorScheme: "blue",
  notificationsEnabled: true,
  soundEnabled: true,
  animationsEnabled: true,
  denseMode: false,
  sidebarCollapsed: false,
  language: "zh-CN",
}

export function UserPreferencesPanel() {
  const { theme, setTheme } = useTheme()
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [mounted, setMounted] = useState(false)

  // 加载保存的偏好
  useEffect(() => {
    setMounted(true)
    const savedPreferences = localStorage.getItem("userPreferences")
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
  }, [])

  // 保存偏好
  const savePreferences = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences)
    localStorage.setItem("userPreferences", JSON.stringify(newPreferences))
    applyPreferences(newPreferences)
  }

  // 应用偏好
  const applyPreferences = (prefs: UserPreferences) => {
    // 应用主题
    setTheme(prefs.theme)

    // 应用字体大小
    document.documentElement.style.fontSize = `${prefs.fontSize}px`

    // 应用颜色方案
    document.documentElement.setAttribute("data-color-scheme", prefs.colorScheme)

    // 应用动画设置
    if (prefs.animationsEnabled) {
      document.documentElement.classList.remove("reduce-motion")
    } else {
      document.documentElement.classList.add("reduce-motion")
    }

    // 应用密集模式
    if (prefs.denseMode) {
      document.documentElement.classList.add("dense-mode")
    } else {
      document.documentElement.classList.remove("dense-mode")
    }

    // 应用语言
    document.documentElement.lang = prefs.language
  }

  // 更新单个偏好
  const updatePreference = (key: keyof UserPreferences, value: any) => {
    const newPreferences = { ...preferences, [key]: value }
    savePreferences(newPreferences)
  }

  // 重置偏好
  const resetPreferences = () => {
    savePreferences(defaultPreferences)
  }

  if (!mounted) {
    return null
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>用户偏好设置</CardTitle>
        <CardDescription>自定义系统外观和行为以满足您的需求</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="appearance">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="appearance">外观</TabsTrigger>
            <TabsTrigger value="behavior">行为</TabsTrigger>
            <TabsTrigger value="notifications">通知</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">主题</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 gap-2"
                  onClick={() => updatePreference("theme", "light")}
                >
                  <Sun className="h-6 w-6" />
                  <span>浅色</span>
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 gap-2"
                  onClick={() => updatePreference("theme", "dark")}
                >
                  <Moon className="h-6 w-6" />
                  <span>深色</span>
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-20 gap-2"
                  onClick={() => updatePreference("theme", "system")}
                >
                  <Monitor className="h-6 w-6" />
                  <span>系统</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">字体大小</h3>
              <div className="flex items-center gap-4">
                <Type className="h-4 w-4" />
                <Slider
                  value={[preferences.fontSize]}
                  min={12}
                  max={20}
                  step={1}
                  onValueChange={(value) => updatePreference("fontSize", value[0])}
                  className="flex-1"
                />
                <span className="w-8 text-center">{preferences.fontSize}px</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">颜色方案</h3>
              <Select value={preferences.colorScheme} onValueChange={(value) => updatePreference("colorScheme", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择颜色方案" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">蓝色</SelectItem>
                  <SelectItem value="green">绿色</SelectItem>
                  <SelectItem value="purple">紫色</SelectItem>
                  <SelectItem value="orange">橙色</SelectItem>
                  <SelectItem value="red">红色</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">密集模式</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="dense-mode">��用密集模式（减少间距，显示更多内容）</Label>
                <Switch
                  id="dense-mode"
                  checked={preferences.denseMode}
                  onCheckedChange={(checked) => updatePreference("denseMode", checked)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">动画效果</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="animations">启用界面动画效果</Label>
                <Switch
                  id="animations"
                  checked={preferences.animationsEnabled}
                  onCheckedChange={(checked) => updatePreference("animationsEnabled", checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">侧边栏</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="sidebar-collapsed">默认折叠侧边栏</Label>
                <Switch
                  id="sidebar-collapsed"
                  checked={preferences.sidebarCollapsed}
                  onCheckedChange={(checked) => updatePreference("sidebarCollapsed", checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">语言</h3>
              <Select value={preferences.language} onValueChange={(value) => updatePreference("language", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择语言" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zh-CN">简体中文</SelectItem>
                  <SelectItem value="zh-TW">繁体中文</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="ja-JP">日本語</SelectItem>
                  <SelectItem value="ko-KR">한국어</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">通知设置</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">启用系统通知</Label>
                <Switch
                  id="notifications"
                  checked={preferences.notificationsEnabled}
                  onCheckedChange={(checked) => updatePreference("notificationsEnabled", checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">声音效果</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="sound">启用操作声音反馈</Label>
                <Switch
                  id="sound"
                  checked={preferences.soundEnabled}
                  onCheckedChange={(checked) => updatePreference("soundEnabled", checked)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetPreferences}>
          恢复默认设置
        </Button>
        <Button>保存设置</Button>
      </CardFooter>
    </Card>
  )
}
