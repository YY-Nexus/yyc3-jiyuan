"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Brand */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img src="/logo.png" alt="YanYu Cloud" className="h-20 w-20 drop-shadow-lg" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              言语云³
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">YanYu Cloud - 企业级云管理系统</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold">欢迎回来</CardTitle>
            <CardDescription>请登录您的账户以继续使用系统</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border-0">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-center">演示账号</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between items-center p-2 rounded bg-blue-50 dark:bg-blue-900/20">
                <span className="font-medium">系统管理员</span>
                <span className="text-gray-600 dark:text-gray-400">admin@yanyu.cloud</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-green-50 dark:bg-green-900/20">
                <span className="font-medium">业务经理</span>
                <span className="text-gray-600 dark:text-gray-400">manager@yanyu.cloud</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-purple-50 dark:bg-purple-900/20">
                <span className="font-medium">普通用户</span>
                <span className="text-gray-600 dark:text-gray-400">user@yanyu.cloud</span>
              </div>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 mt-2">密码均为：secret123</p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© 2024 YanYu Cloud. 保留所有权利.</p>
        </div>
      </div>
    </div>
  )
}
