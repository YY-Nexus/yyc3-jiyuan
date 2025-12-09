"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useHistory, type Operation } from "./operation-history"

interface OperationHistoryPanelProps {
  onClose: () => void
}

export function OperationHistoryPanel({ onClose }: OperationHistoryPanelProps) {
  const { operations, undo, redo, canUndo, canRedo } = useHistory()

  const getOperationTypeLabel = (type: string) => {
    switch (type) {
      case "CREATE":
        return "创建"
      case "UPDATE":
        return "更新"
      case "DELETE":
        return "删除"
      case "BATCH_DELETE":
        return "批量删除"
      default:
        return type
    }
  }

  const getOperationTypeColor = (type: string) => {
    switch (type) {
      case "CREATE":
        return "bg-green-100 text-green-800"
      case "UPDATE":
        return "bg-blue-100 text-blue-800"
      case "DELETE":
        return "bg-red-100 text-red-800"
      case "BATCH_DELETE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold">操作历史</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 border-b">
        <div className="flex space-x-2">
          <Button onClick={undo} disabled={!canUndo} className="flex-1">
            撤销
          </Button>
          <Button onClick={redo} disabled={!canRedo} className="flex-1">
            重做
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {operations.length === 0 ? (
          <div className="text-center text-gray-500 py-8">暂无操作历史</div>
        ) : (
          <div className="space-y-4">
            {operations.map((operation: Operation) => (
              <div key={operation.id} className="border rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getOperationTypeColor(operation.type)}`}>
                    {getOperationTypeLabel(operation.type)}
                  </span>
                  <span className="text-xs text-gray-500">{formatTime(operation.timestamp)}</span>
                </div>
                <p className="text-sm">{operation.description}</p>
                <div className="mt-2 flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => operation.undoAction()}
                    className="text-xs h-7 px-2"
                  >
                    撤销此操作
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
