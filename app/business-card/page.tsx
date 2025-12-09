"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BusinessCardFormDialog } from "@/components/business-card-form-dialog"
import { BusinessCardViewDialog } from "@/components/business-card-view-dialog"
import { BusinessCardEditDialog } from "@/components/business-card-edit-dialog"
import { BusinessCardDeleteDialog } from "@/components/business-card-delete-dialog"
import { Eye, Pencil, Trash2, Plus, Search, History, Undo, Redo } from "lucide-react"
import { HistoryProvider, useHistory } from "@/components/efficiency/operation-history"
import { OperationHistoryPanel } from "@/components/efficiency/operation-history-panel"
import { BatchOperations } from "@/components/efficiency/batch-operations"
import { SmartSearch, type FilterOption } from "@/components/efficiency/smart-search"
import { RippleButton } from "@/components/ui/micro-interactions"
import { useToast } from "@/hooks/use-toast"
import { getBusinessCards, deleteBusinessCardAction } from "./actions"
import type { BusinessCard } from "@/types"

// 过滤器选项
const filterOptions: FilterOption[] = [
  {
    id: "name",
    type: "text",
    field: "name",
    label: "姓名",
  },
  {
    id: "title",
    type: "select",
    field: "title",
    label: "职位",
    options: [
      { value: "销售经理", label: "销售经理" },
      { value: "市场总监", label: "市场总监" },
      { value: "技术总监", label: "技术总监" },
      { value: "产品经理", label: "产品经理" },
    ],
  },
  {
    id: "company",
    type: "text",
    field: "company",
    label: "公司",
  },
  {
    id: "createdAt",
    type: "date",
    field: "createdAt",
    label: "创建时间",
  },
]

// 内部组件，使用历史上下文
function BusinessCardPageContent() {
  const [cards, setCards] = useState<BusinessCard[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<BusinessCard | null>(null)
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const { toast } = useToast()

  // 使用历史记录
  const { addOperation, undo, redo, canUndo, canRedo } = useHistory()

  // 加载业务卡片数据
  useEffect(() => {
    async function loadCards() {
      setIsLoading(true)
      try {
        const result = await getBusinessCards(page, limit, searchQuery)

        if (result.error) {
          toast({
            title: "加载失败",
            description: result.error,
            variant: "destructive",
          })
        } else {
          setCards(result.cards || [])
          setTotal(result.total || 0)
        }
      } catch (error) {
        toast({
          title: "加载失败",
          description: (error as Error).message,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadCards()
  }, [page, limit, searchQuery, toast])

  // 处理智能搜索
  const handleSearch = (query: string, filters: any[]) => {
    setSearchQuery(query)
    setPage(1)
    // 这里可以根据filters进行更复杂的过滤
    console.log("应用过滤器:", filters)
  }

  const handleCreate = (newCard: BusinessCard) => {
    // 添加操作历史
    addOperation({
      id: `create-card-${newCard.id}`,
      type: "CREATE",
      description: `创建名片: ${newCard.name}`,
      timestamp: Date.now(),
      data: { card: newCard },
      undoAction: () => {
        // 在实际应用中，这里应该调用删除API
        setCards(cards.filter((card) => card.id !== newCard.id))
        toast({
          title: "已撤销",
          description: `已撤销创建名片: ${newCard.name}`,
        })
      },
      redoAction: () => {
        // 在实际应用中，这里应该调用创建API
        setCards([...cards, newCard])
        toast({
          title: "已重做",
          description: `已重新创建名片: ${newCard.name}`,
        })
      },
    })

    // 刷新列表
    setPage(1)

    toast({
      title: "创建成功",
      description: `已成功创建名片: ${newCard.name}`,
    })
  }

  const handleEdit = (updatedCard: BusinessCard) => {
    const oldCard = cards.find((card) => card.id === updatedCard.id)

    // 添加操作历史
    addOperation({
      id: `edit-card-${updatedCard.id}`,
      type: "UPDATE",
      description: `编辑名片: ${updatedCard.name}`,
      timestamp: Date.now(),
      data: { oldCard, newCard: updatedCard },
      undoAction: () => {
        if (oldCard) {
          setCards(cards.map((card) => (card.id === oldCard.id ? oldCard : card)))
          toast({
            title: "已撤销",
            description: `已撤销编辑名片: ${updatedCard.name}`,
          })
        }
      },
      redoAction: () => {
        setCards(cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)))
        toast({
          title: "已重做",
          description: `已重新编辑名片: ${updatedCard.name}`,
        })
      },
    })

    // 更新本地状态
    setCards(cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)))

    toast({
      title: "更新成功",
      description: `已成功更新名片: ${updatedCard.name}`,
    })
  }

  const handleDelete = async () => {
    if (selectedCard) {
      try {
        const result = await deleteBusinessCardAction(selectedCard.id)

        if (result.error) {
          toast({
            title: "删除失败",
            description: result.error,
            variant: "destructive",
          })
          return
        }

        // 添加操作历史
        addOperation({
          id: `delete-card-${selectedCard.id}`,
          type: "DELETE",
          description: `删除名片: ${selectedCard.name}`,
          timestamp: Date.now(),
          data: { card: selectedCard },
          undoAction: () => {
            // 在实际应用中，这里应该调用创建API
            setCards([...cards, selectedCard])
            toast({
              title: "已撤销",
              description: `已撤销删除名片: ${selectedCard.name}`,
            })
          },
          redoAction: () => {
            // 在实际应用中，这里应该调用删除API
            setCards(cards.filter((card) => card.id !== selectedCard.id))
            toast({
              title: "已重做",
              description: `已重新删除名片: ${selectedCard.name}`,
            })
          },
        })

        // 更新本地状态
        setCards(cards.filter((card) => card.id !== selectedCard.id))

        toast({
          title: "删除成功",
          description: `已成功删除名片: ${selectedCard.name}`,
        })
      } catch (error) {
        toast({
          title: "删除失败",
          description: (error as Error).message,
          variant: "destructive",
        })
      }
    }
  }

  // 批量删除
  const handleBatchDelete = async () => {
    if (selectedItems.length > 0) {
      const selectedCards = cards.filter((card) => selectedItems.includes(card.id))

      // 在实际应用中，这里应该调用批量删除API

      // 添加操作历史
      addOperation({
        id: `batch-delete-cards-${Date.now()}`,
        type: "BATCH_DELETE",
        description: `批量删除名片: ${selectedItems.length}张`,
        timestamp: Date.now(),
        data: { cards: selectedCards },
        undoAction: () => {
          setCards([...cards, ...selectedCards])
          toast({
            title: "已撤销",
            description: `已撤销批量删除${selectedItems.length}张名片`,
          })
        },
        redoAction: () => {
          setCards(cards.filter((card) => !selectedItems.includes(card.id)))
          toast({
            title: "已重做",
            description: `已重新批量删除${selectedItems.length}张名片`,
          })
        },
      })

      setCards(cards.filter((card) => !selectedItems.includes(card.id)))
      setSelectedItems([])
      toast({
        title: "批量删除成功",
        description: `已成功删除${selectedItems.length}张名片`,
      })
    }
  }

  const openViewDialog = (card: BusinessCard) => {
    setSelectedCard(card)
    setIsViewDialogOpen(true)
  }

  const openEditDialog = (card: BusinessCard) => {
    setSelectedCard(card)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (card: BusinessCard) => {
    setSelectedCard(card)
    setIsDeleteDialogOpen(true)
  }

  // 批量操作项
  const batchActions = [
    {
      label: "批量删除",
      icon: <Trash2 className="h-4 w-4 mr-2" />,
      onClick: handleBatchDelete,
    },
    {
      label: "导出选中",
      icon: <Search className="h-4 w-4 mr-2" />,
      onClick: () => {
        toast({
          title: "导出功能",
          description: `已选择${selectedItems.length}张名片进行导出`,
        })
      },
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">名片管理</h1>
        <div className="flex items-center gap-2">
          <RippleButton
            onClick={() => setIsHistoryPanelOpen(!isHistoryPanelOpen)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md flex items-center"
          >
            <History className="h-4 w-4 mr-2" />
            操作历史
          </RippleButton>

          <Button variant="outline" size="icon" onClick={undo} disabled={!canUndo} title="撤销 (Ctrl+Z)">
            <Undo className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={redo} disabled={!canRedo} title="重做 (Ctrl+Y)">
            <Redo className="h-4 w-4" />
          </Button>

          <RippleButton
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            新建名片
          </RippleButton>
        </div>
      </div>

      <div className="mb-6">
        <SmartSearch placeholder="搜索名片..." filterOptions={filterOptions} onSearch={handleSearch} />
      </div>

      {selectedItems.length > 0 && (
        <BatchOperations
          selectedCount={selectedItems.length}
          actions={batchActions}
          onClearSelection={() => setSelectedItems([])}
        />
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selectedItems.length === cards.length && cards.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(cards.map((card) => card.id))
                    } else {
                      setSelectedItems([])
                    }
                  }}
                />
              </TableHead>
              <TableHead className="w-12">序号</TableHead>
              <TableHead>姓名</TableHead>
              <TableHead>职位</TableHead>
              <TableHead>公司</TableHead>
              <TableHead>电话</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                  <div className="mt-2 text-gray-500">加载中...</div>
                </TableCell>
              </TableRow>
            ) : cards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="text-gray-500">暂无数据</div>
                </TableCell>
              </TableRow>
            ) : (
              cards.map((card, index) => (
                <TableRow key={card.id} className="group">
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedItems.includes(card.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, card.id])
                        } else {
                          setSelectedItems(selectedItems.filter((id) => id !== card.id))
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>{card.name}</TableCell>
                  <TableCell>{card.title || "-"}</TableCell>
                  <TableCell>{card.company}</TableCell>
                  <TableCell>{card.phone}</TableCell>
                  <TableCell>{new Date(card.createdAt).toLocaleString("zh-CN")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openViewDialog(card)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">查看</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(card)}
                        className="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">编辑</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(card)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">删除</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 分页控件 */}
      {total > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div>共 {total} 条</div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>
              上一页
            </Button>
            <span>
              第 {page} 页，共 {Math.ceil(total / limit)} 页
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page < Math.ceil(total / limit) ? page + 1 : Math.ceil(total / limit))}
              disabled={page >= Math.ceil(total / limit)}
            >
              下一页
            </Button>
          </div>
        </div>
      )}

      {isHistoryPanelOpen && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 overflow-auto">
          <OperationHistoryPanel onClose={() => setIsHistoryPanelOpen(false)} />
        </div>
      )}

      <BusinessCardFormDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreate}
      />

      <BusinessCardViewDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        card={selectedCard}
      />

      <BusinessCardEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEdit}
        card={selectedCard}
      />

      <BusinessCardDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        cardName={selectedCard?.name}
      />
    </div>
  )
}

// 包装组件，提供历史上下文
export default function BusinessCardPage() {
  return (
    <HistoryProvider>
      <BusinessCardPageContent />
    </HistoryProvider>
  )
}
