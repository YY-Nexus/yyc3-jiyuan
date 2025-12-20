"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "zh-CN" | "en-US"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 翻译字典
const translations = {
  "zh-CN": {
    "operation.guide.title": "操作指南",
    "operation.guide.description": "了解如何使用消息任务功能",
    "operation.steps": "操作步骤",
    "operation.details": "详细说明",
    // 添加更多翻译键值对
  },
  "en-US": {
    "operation.guide.title": "Operation Guide",
    "operation.guide.description": "Learn how to use message task features",
    "operation.steps": "Operation Steps",
    "operation.details": "Detailed Instructions",
    // 添加更多翻译键值对
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // 默认使用中文
  const [language, setLanguageState] = useState<Language>("zh-CN")

  // 在客户端加载时检查本地存储的语言偏好
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "zh-CN" || savedLanguage === "en-US")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // 设置语言并保存到本地存储
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  // 翻译函数
  const t = (key: string) => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// 自定义钩子，用于在组件中访问语言上下文
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
