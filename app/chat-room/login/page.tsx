"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Sidebar from "@/components/sidebar"

export default function ChatRoomLogin() {
  const [loginMethod, setLoginMethod] = useState<"qrcode" | "password">("qrcode")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    // 模拟登录成功
    router.push("/chat-room")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-bold text-center mb-6">聊天室登录</h1>

            <Tabs
              value={loginMethod}
              onValueChange={(value) => setLoginMethod(value as "qrcode" | "password")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="qrcode">扫码登录</TabsTrigger>
                <TabsTrigger value="password">账号密码</TabsTrigger>
              </TabsList>

              <TabsContent value="qrcode" className="flex flex-col items-center">
                <div className="border p-4 rounded-lg mb-4">
                  <Image src="/qrcode-login.png" alt="登录二维码" width={200} height={200} className="mx-auto" />
                </div>
                <p className="text-sm text-gray-500 text-center mb-4">扫描二维码登录</p>
                <Button variant="link" className="text-blue-600">
                  刷新二维码
                </Button>
              </TabsContent>

              <TabsContent value="password" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">用户名</Label>
                  <Input
                    id="username"
                    placeholder="请输入用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleLogin}>
                  登录
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
