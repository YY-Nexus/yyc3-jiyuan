"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Globe, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import PartnerLogos from "./partner-logos"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* 背景图层 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/auth-background.jpg')",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      />

      {/* 背景渐变叠加 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent" />

      {/* 顶部导航 */}
      <header className="relative z-10 flex justify-between items-center p-4 md:p-6">
        <div className="text-white text-xl font-bold">YanYu丨Cloud³ CMS</div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Globe className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* 主要内容区 */}
      <main className="flex-1 flex flex-col md:flex-row items-center relative z-10 px-4 py-8 md:p-12">
        {/* 左侧信息区 */}
        <div
          className="w-full md:w-1/2 text-white mb-8 md:mb-0 md:pr-8 transform transition-all duration-700 ease-out"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">智能营销与客户管理平台</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">提升您的业务效率和客户体验</p>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">智能数据分析</h3>
                <p className="text-white/80">实时洞察客户行为，精准把握市场趋势</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">多渠道营销管理</h3>
                <p className="text-white/80">整合短信、邮件、社交媒体等多种营销渠道</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">客户全生命周期管理</h3>
                <p className="text-white/80">从获客到转化，再到维护，全流程精细化运营</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
              观看产品演示
            </Button>
          </div>
        </div>

        {/* 右侧登录区域 */}
        <div
          className="w-full md:w-1/2 md:pl-8 flex justify-center md:justify-end transform transition-all duration-700 ease-out delay-300"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {children}
        </div>
      </main>

      {/* 底部合作伙伴标志 */}
      <footer className="relative z-10 p-6">
        <div className="container mx-auto">
          <div className="text-white/70 text-sm mb-2">值得信赖的合作伙伴</div>
          <PartnerLogos />
        </div>
      </footer>
    </div>
  )
}
