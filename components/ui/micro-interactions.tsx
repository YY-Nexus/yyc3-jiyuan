"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export function RippleButton({ children, className, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const nextId = useRef(0)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = nextId.current++

    setRipples([...ripples, { x, y, id }])

    // 调用原始的onClick处理程序
    props.onClick?.(e)
  }

  // 清除完成动画的涟漪
  useEffect(() => {
    if (ripples.length > 0) {
      const timeoutId = setTimeout(() => {
        setRipples((prevRipples) => prevRipples.slice(1))
      }, 600) // 与CSS动画持续时间匹配

      return () => clearTimeout(timeoutId)
    }
  }, [ripples])

  return (
    <button {...props} className={cn("relative overflow-hidden", className)} onClick={handleClick}>
      {ripples.map(({ x, y, id }) => (
        <span
          key={id}
          className="absolute rounded-full bg-white opacity-30 animate-ripple"
          style={{
            left: x,
            top: y,
            width: 10,
            height: 10,
            transform: "translate(-50%, -50%) scale(0)",
          }}
        />
      ))}
      {children}
    </button>
  )
}

interface NotificationToastProps {
  message: string
  type?: "info" | "success" | "error" | "warning"
  duration?: number
  onClose: () => void
}

export function NotificationToast({ message, type = "info", duration = 3000, onClose }: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // 等待动画完成后关闭
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  }

  const backgrounds = {
    info: "bg-blue-50 border-blue-200",
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-amber-50 border-amber-200",
  }

  return (
    <div
      className={cn(
        "flex items-center p-4 rounded-lg shadow-md border transition-all duration-300 max-w-md",
        backgrounds[type],
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
      )}
    >
      <div className="flex-shrink-0 mr-3">{icons[type]}</div>
      <div className="flex-1 mr-2">{message}</div>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}
