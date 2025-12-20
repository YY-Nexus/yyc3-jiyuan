"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"

export interface Operation {
  id: string
  type: string
  description: string
  timestamp: number
  data: any
  undoAction: () => void
  redoAction: () => void
}

interface HistoryContextType {
  operations: Operation[]
  addOperation: (operation: Operation) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined)

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [operations, setOperations] = useState<Operation[]>([])
  const [undoneOperations, setUndoneOperations] = useState<Operation[]>([])

  const addOperation = useCallback((operation: Operation) => {
    setOperations((prev) => [operation, ...prev])
    setUndoneOperations([])
  }, [])

  const undo = useCallback(() => {
    if (operations.length === 0) return

    const [latestOperation, ...restOperations] = operations
    latestOperation.undoAction()

    setOperations(restOperations)
    setUndoneOperations((prev) => [latestOperation, ...prev])
  }, [operations])

  const redo = useCallback(() => {
    if (undoneOperations.length === 0) return

    const [latestUndone, ...restUndone] = undoneOperations
    latestUndone.redoAction()

    setUndoneOperations(restUndone)
    setOperations((prev) => [latestUndone, ...prev])
  }, [undoneOperations])

  return (
    <HistoryContext.Provider
      value={{
        operations,
        addOperation,
        undo,
        redo,
        canUndo: operations.length > 0,
        canRedo: undoneOperations.length > 0,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)
  if (context === undefined) {
    throw new Error("useHistory must be used within a HistoryProvider")
  }
  return context
}
