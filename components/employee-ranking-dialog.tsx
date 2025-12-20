"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"

interface EmployeeRankingDialogProps {
  isOpen: boolean
  onClose: () => void
  activityName: string
}

interface RankingData {
  rank: number
  name: string
  inviteCount: number
  percentage: string
  medal?: string // 金银铜牌标识
}

export function EmployeeRankingDialog({ isOpen, onClose, activityName }: EmployeeRankingDialogProps) {
  // 模拟排行榜数据
  const rankingData: RankingData[] = [
    { rank: 1, name: "陈陈陈", inviteCount: 26, percentage: "11.2%", medal: "🥇" },
    { rank: 2, name: "陈陈陈", inviteCount: 26, percentage: "11.2%", medal: "🥈" },
    { rank: 3, name: "陈陈陈", inviteCount: 26, percentage: "11.2%", medal: "🥉" },
    { rank: 4, name: "陈陈陈", inviteCount: 26, percentage: "11.2%" },
    { rank: 5, name: "陈陈陈", inviteCount: 26, percentage: "11.2%" },
    { rank: 6, name: "陈陈陈", inviteCount: 26, percentage: "11.2%" },
    { rank: 7, name: "陈陈陈", inviteCount: 26, percentage: "11.2%" },
    { rank: 8, name: "陈陈陈", inviteCount: 26, percentage: "11.2%" },
    { rank: 9, name: "陈陈陈", inviteCount: 26, percentage: "11.2%" },
    { rank: 10, name: "陈陈陈", inviteCount: 26, percentage: "11.2%" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{activityName}活动员工排行</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">排名</TableHead>
                <TableHead>员工姓名</TableHead>
                <TableHead>拉新/邀约人数</TableHead>
                <TableHead>占比</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankingData.map((item) => (
                <TableRow key={item.rank}>
                  <TableCell className="font-medium">
                    {item.medal ? <span className="text-lg">{item.medal}</span> : item.rank}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.inviteCount}</TableCell>
                  <TableCell>{item.percentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* 分页控件 */}
          <div className="p-4 flex items-center justify-between text-sm">
            <div>共 28 条</div>
            <div className="flex items-center space-x-1">
              <div className="flex items-center mr-2">
                <span>10条/页</span>
                <ChevronLeft className="w-4 h-4" />
              </div>
              <Button variant="outline" size="icon" className="w-8 h-8 bg-blue-600 text-white">
                1
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8">
                2
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8">
                3
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8">
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="flex items-center ml-2">
                <span>前往</span>
                <Input className="w-12 h-8 mx-1" />
                <span>页</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
