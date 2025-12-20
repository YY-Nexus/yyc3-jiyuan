"use client"

import { useEffect, useState, createContext, useContext, type ReactNode } from "react"
import { KeyboardIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// 快捷键类型
export interface Shortcut {
  id: string
  key: string
  description: string
  category: string
  action: () => void
  global?: boolean
}

// 快捷键上下文类型
interface KeyboardShortcutsContextType {
  shortcuts: Shortcut[]
  registerShortcut: (shortcut: Shortcut) => void
  unregisterShortcut: (id: string) => void
  showShortcutsDialog: () => void
}

// 创建上下文
const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined)

// 快捷键Provider组件
interface KeyboardShortcutsProviderProps {
  children: ReactNode
}

export function KeyboardShortcutsProvider({ children }: KeyboardShortcutsProviderProps) {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([])
  const [showDialog, setShowDialog] = useState(false)

  // 注册快捷键
  const registerShortcut = (shortcut: Shortcut) => {
    setShortcuts((prev) => {
      // 如果已存在相同ID的快捷键，则替换它
      const exists = prev.some((s) => s.id === shortcut.id)
      if (exists) {
        return prev.map((s) => (s.id === shortcut.id ? shortcut : s))
      }
      // 否则添加新快捷键
      return [...prev, shortcut]
    })
  }

  // 注销快捷键
  const unregisterShortcut = (id: string) => {
    setShortcuts((prev) => prev.filter((shortcut) => shortcut.id !== id))
  }

  // 显示快捷键对话框
  const showShortcutsDialog = () => {
    setShowDialog(true)
  }

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 忽略输入框中的按键
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }

      // 构建按键组合字符串
      let keyCombo = ""
      if (event.ctrlKey) keyCombo += "Ctrl+"
      if (event.altKey) keyCombo += "Alt+"
      if (event.shiftKey) keyCombo += "Shift+"
      if (event.metaKey) keyCombo += "Meta+"

      // 特殊键处理
      if (event.key === " ") {
        keyCombo += "Space"
      } else if (event.key.length === 1) {
        keyCombo += event.key.toUpperCase()
      } else {
        keyCombo += event.key
      }

      // 查找匹配的快捷键
      const matchedShortcut = shortcuts.find((shortcut) => shortcut.key === keyCombo)
      if (matchedShortcut) {
        event.preventDefault()
        matchedShortcut.action()
      }

      // 显示快捷键对话框的特殊组合键 (Shift+?)
      if (event.shiftKey && event.key === "?") {
        event.preventDefault()
        setShowDialog(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [shortcuts])

  const value = {
    shortcuts,
    registerShortcut,
    unregisterShortcut,
    showShortcutsDialog,
  }

  return (
    <KeyboardShortcutsContext.Provider value={value}>
      {children}
      <ShortcutsDialog open={showDialog} onOpenChange={setShowDialog} shortcuts={shortcuts} />
    </KeyboardShortcutsContext.Provider>
  )
}

// 快捷键对话框组件
interface ShortcutsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shortcuts: Shortcut[]
}

function ShortcutsDialog({ open, onOpenChange, shortcuts }: ShortcutsDialogProps) {
  // 按类别分组快捷键
  const shortcutsByCategory = shortcuts.reduce<Record<string, Shortcut[]>>((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = []
    }
    acc[shortcut.category].push(shortcut)
    return acc
  }, {})

  // 格式化快捷键显示
  const formatKey = (key: string) => {
    return key.split("+").map((part) => (
      <kbd
        key={part}
        className="mx-0.5 rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-xs font-semibold text-gray-800"
      >
        {part}
      </kbd>
    ))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-3xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyboardIcon className="h-5 w-5" />
            键盘快捷键
          </DialogTitle>
          <DialogDescription>
            使用这些键盘快捷键可以更快地操作系统。按{" "}
            <kbd className="rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-xs font-semibold text-gray-800">
              Shift
            </kbd>{" "}
            +{" "}
            <kbd className="rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-xs font-semibold text-gray-800">
              ?
            </kbd>{" "}
            随时打开此对话框。
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 p-4">
            {Object.entries(shortcutsByCategory).map(([category, categoryShortcuts]) => (
              <div key={category}>
                <h3 className="mb-2 text-lg font-semibold">{category}</h3>
                <div className="rounded-md border">
                  {categoryShortcuts.map((shortcut, index) => (
                    <div
                      key={shortcut.id}
                      className={cn(
                        "flex items-center justify-between p-3",
                        index !== categoryShortcuts.length - 1 && "border-b",
                      )}
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex items-center">
                        {formatKey(shortcut.key)}
                        {shortcut.global && (
                          <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">全局</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            关闭
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// 自定义Hook，用于访问快捷键上下文
export function useKeyboardShortcuts() {
  const context = useContext(KeyboardShortcutsContext)

  if (context === undefined) {
    throw new Error("useKeyboardShortcuts必须在KeyboardShortcutsProvider内部使用")
  }

  return context
}

// 快捷键按钮组件
interface KeyboardShortcutButtonProps {
  className?: string
}

export function KeyboardShortcutButton({ className }: KeyboardShortcutButtonProps) {
  const { showShortcutsDialog } = useKeyboardShortcuts()

  return (
    <Button
      variant="outline"
      size="icon"
      className={className}
      onClick={showShortcutsDialog}
      title="键盘快捷键 (Shift+?)"
    >
      <KeyboardIcon className="h-4 w-4" />
    </Button>
  )
}

// 导出上下文
export default KeyboardShortcutsContext
