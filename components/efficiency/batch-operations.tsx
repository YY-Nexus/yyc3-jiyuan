"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import { Check, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

// 批量操作类型
export interface BatchOperation<T> {
  id: string
  label: string
  icon?: ReactNode
  action: (items: T[]) => void
  disabled?: boolean
  destructive?: boolean
}

// 批量操作工具栏属性
interface BatchOperationsToolbarProps<T> {
  selectedItems: T[]
  operations: BatchOperation<T>[]
  onSelectAll?: () => void
  onDeselectAll?: () => void
  totalItems?: number
  className?: string
  showSelectOptions?: boolean
  showItemCount?: boolean
}

// 批量操作工具栏组件
export function BatchOperationsToolbar<T>({
  selectedItems,
  operations,
  onSelectAll,
  onDeselectAll,
  totalItems,
  className,
  showSelectOptions = true,
  showItemCount = true,
}: BatchOperationsToolbarProps<T>) {
  const hasSelectedItems = selectedItems.length > 0

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border bg-background p-2 shadow-sm",
        !hasSelectedItems && "hidden",
        className,
      )}
    >
      {showSelectOptions && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Check className="mr-1 h-3.5 w-3.5" />
                选择
                <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={onSelectAll}>全选</DropdownMenuItem>
              <DropdownMenuItem onClick={onDeselectAll}>取消全选</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-6 w-px bg-border" />
        </>
      )}

      {showItemCount && (
        <span className="text-sm text-muted-foreground">
          已选择 {selectedItems.length} {totalItems ? `/ ${totalItems}` : ""} 项
        </span>
      )}

      <div className="h-6 w-px bg-border" />

      <div className="flex items-center gap-1">
        {operations.map((operation) => (
          <Button
            key={operation.id}
            variant={operation.destructive ? "destructive" : "outline"}
            size="sm"
            className="h-8"
            onClick={() => operation.action(selectedItems)}
            disabled={operation.disabled}
          >
            {operation.icon && <span className="mr-1">{operation.icon}</span>}
            {operation.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

// 批量操作菜单属性
interface BatchOperationsMenuProps<T> {
  selectedItems: T[]
  operations: BatchOperation<T>[]
  trigger?: ReactNode
  disabled?: boolean
  className?: string
}

// 批量操作菜单组件
export function BatchOperationsMenu<T>({
  selectedItems,
  operations,
  trigger,
  disabled,
  className,
}: BatchOperationsMenuProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={disabled} className={className}>
          {trigger || <MoreHorizontal className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>批量操作</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {operations.map((operation) => (
          <DropdownMenuItem
            key={operation.id}
            onClick={() => operation.action(selectedItems)}
            disabled={operation.disabled}
            className={operation.destructive ? "text-destructive" : ""}
          >
            {operation.icon && <span className="mr-2">{operation.icon}</span>}
            {operation.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// 批量选择属性
interface BatchSelectionProps<T> {
  items: T[]
  idField?: keyof T
  render: (props: BatchSelectionRenderProps<T>) => ReactNode
  operations: BatchOperation<T>[]
  toolbarClassName?: string
  showSelectOptions?: boolean
  showItemCount?: boolean
}

// 批量选择渲染属性
interface BatchSelectionRenderProps<T> {
  items: T[]
  selectedItems: T[]
  isSelected: (item: T) => boolean
  toggleSelection: (item: T) => void
  selectAll: () => void
  deselectAll: () => void
  toolbar: ReactNode
  menu: (selectedItems: T[]) => ReactNode
}

// 批量选择组件
export function BatchSelection<T>({
  items,
  idField = "id" as keyof T,
  render,
  operations,
  toolbarClassName,
  showSelectOptions = true,
  showItemCount = true,
}: BatchSelectionProps<T>) {
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  // 检查项目是否被选中
  const isSelected = (item: T) => {
    return selectedItems.some((selectedItem) => selectedItem[idField] === item[idField])
  }

  // 切换项目选中状态
  const toggleSelection = (item: T) => {
    if (isSelected(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem[idField] !== item[idField]))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  // 全选
  const selectAll = () => {
    setSelectedItems([...items])
  }

  // 取消全选
  const deselectAll = () => {
    setSelectedItems([])
  }

  // 批量操作工具栏
  const toolbar = (
    <BatchOperationsToolbar
      selectedItems={selectedItems}
      operations={operations}
      onSelectAll={selectAll}
      onDeselectAll={deselectAll}
      totalItems={items.length}
      className={toolbarClassName}
      showSelectOptions={showSelectOptions}
      showItemCount={showItemCount}
    />
  )

  // 批量操作菜单
  const menu = (items: T[]) => (
    <BatchOperationsMenu selectedItems={items} operations={operations} disabled={items.length === 0} />
  )

  return render({
    items,
    selectedItems,
    isSelected,
    toggleSelection,
    selectAll,
    deselectAll,
    toolbar,
    menu,
  })
}

// 添加缺少的 BatchOperations 命名导出
export const BatchOperationsComponent = {
  Toolbar: BatchOperationsToolbar,
  Menu: BatchOperationsMenu,
  Selection: BatchSelection,
}

interface BatchAction {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

interface BatchOperationsProps {
  selectedCount: number
  actions: BatchAction[]
  onClearSelection: () => void
  className?: string
}

export function BatchOperations({ selectedCount, actions, onClearSelection, className }: BatchOperationsProps) {
  if (selectedCount === 0) return null

  return (
    <div
      className={cn(
        "flex items-center justify-between bg-blue-50 border-y border-blue-100 px-4 py-2 animate-in slide-in-from-top duration-200",
        className,
      )}
    >
      <div className="flex items-center">
        <span className="text-blue-700 font-medium mr-2">已选择 {selectedCount} 项</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
        >
          <X className="h-4 w-4 mr-1" />
          清除选择
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || "secondary"}
            size="sm"
            onClick={action.onClick}
            className="h-8"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
