"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Search, Filter, X, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export interface FilterOption {
  id: string
  type: "text" | "select" | "date" | "number" | "boolean"
  field: string
  label: string
  options?: { value: string; label: string }[]
}

interface SmartSearchProps {
  placeholder?: string
  filterOptions: FilterOption[]
  onSearch: (query: string, filters: any[]) => void
  className?: string
}

export function SmartSearch({ placeholder = "搜索...", filterOptions, onSearch, className }: SmartSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})

  const handleSearch = () => {
    const filters = Object.entries(activeFilters).map(([id, value]) => {
      const option = filterOptions.find((opt) => opt.id === id)
      return {
        field: option?.field || id,
        value,
        type: option?.type || "text",
      }
    })
    onSearch(searchQuery, filters)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleFilterChange = (id: string, value: any) => {
    if (value === undefined || value === null || value === "") {
      const newFilters = { ...activeFilters }
      delete newFilters[id]
      setActiveFilters(newFilters)
    } else {
      setActiveFilters((prev) => ({ ...prev, [id]: value }))
    }
  }

  const clearFilters = () => {
    setActiveFilters({})
    setSearchQuery("")
    onSearch("", [])
  }

  const activeFilterCount = Object.keys(activeFilters).length

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />
        </div>
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("flex items-center", activeFilterCount > 0 && "bg-blue-50 text-blue-600 border-blue-200")}
            >
              <Filter className="h-4 w-4 mr-2" />
              筛选
              {activeFilterCount > 0 && (
                <span className="ml-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">高级筛选</h3>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
                    <X className="h-4 w-4 mr-1" />
                    清除筛选
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {filterOptions.map((option) => (
                  <div key={option.id} className="space-y-1">
                    <Label htmlFor={option.id}>{option.label}</Label>
                    {option.type === "text" && (
                      <Input
                        id={option.id}
                        value={activeFilters[option.id] || ""}
                        onChange={(e) => handleFilterChange(option.id, e.target.value)}
                        placeholder={`输入${option.label}`}
                      />
                    )}
                    {option.type === "select" && option.options && (
                      <Select
                        value={activeFilters[option.id] || ""}
                        onValueChange={(value) => handleFilterChange(option.id, value)}
                      >
                        <SelectTrigger id={option.id}>
                          <SelectValue placeholder={`选择${option.label}`} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全部</SelectItem>
                          {option.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {option.type === "date" && (
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !activeFilters[option.id] && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {activeFilters[option.id] ? (
                                format(new Date(activeFilters[option.id]), "PPP")
                              ) : (
                                <span>选择日期</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={activeFilters[option.id] ? new Date(activeFilters[option.id]) : undefined}
                              onSelect={(date) => handleFilterChange(option.id, date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    handleSearch()
                    setIsFilterOpen(false)
                  }}
                >
                  应用筛选
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSearch}>
          搜索
        </Button>
      </div>
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {Object.entries(activeFilters).map(([id, value]) => {
            const option = filterOptions.find((opt) => opt.id === id)
            if (!option) return null

            let displayValue = value
            if (option.type === "select" && option.options) {
              const selectedOption = option.options.find((opt) => opt.value === value)
              displayValue = selectedOption?.label || value
            } else if (option.type === "date" && value) {
              displayValue = format(new Date(value), "yyyy-MM-dd")
            }

            return (
              <div key={id} className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm">
                <span className="font-medium mr-1">{option.label}:</span>
                <span>{displayValue}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFilterChange(id, "")}
                  className="h-5 w-5 p-0 ml-1 text-blue-700 hover:bg-blue-100 hover:text-blue-900"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-7 px-2 text-blue-600 hover:bg-blue-50 hover:text-blue-800"
          >
            清除全部
          </Button>
        </div>
      )}
    </div>
  )
}
