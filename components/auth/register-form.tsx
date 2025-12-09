"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 模拟注册请求
    setTimeout(() => {
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  return (
    <div className="p-6">
      <div className="mb-6 text-center">
        <div className="inline-block p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">创建账户</h2>
        <p className="text-white/70">注册以开始使用我们的服务</p>
      </div>

      <form onSubmit={handleRegister}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white">
                姓
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <Input
                  id="firstName"
                  placeholder="张"
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white">
                名
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <Input
                  id="lastName"
                  placeholder="三"
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-white">
              公司名称
            </Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                id="company"
                placeholder="您的公司"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="registerEmail" className="text-white">
              邮箱
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                id="registerEmail"
                type="email"
                placeholder="your@email.com"
                required
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="registerPassword" className="text-white">
              密码
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                id="registerPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-white/50">密码至少需要8个字符，包含字母和数字</p>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              className="mt-1 border-white/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <label htmlFor="terms" className="text-sm leading-tight text-white/80">
              我同意{" "}
              <a href="#" className="text-blue-300 hover:text-blue-200 underline">
                服务条款
              </a>{" "}
              和{" "}
              <a href="#" className="text-blue-300 hover:text-blue-200 underline">
                隐私政策
              </a>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            disabled={isLoading}
          >
            {isLoading ? "注册中..." : "创建账户"}
          </Button>
        </div>
      </form>
    </div>
  )
}
