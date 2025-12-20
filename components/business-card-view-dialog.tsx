"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, Globe, MapPin, Building } from "lucide-react"
import type { BusinessCard } from "@/types"

interface BusinessCardViewDialogProps {
  isOpen: boolean
  onClose: () => void
  card: BusinessCard | null
}

export function BusinessCardViewDialog({ isOpen, onClose, card }: BusinessCardViewDialogProps) {
  if (!card) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>查看名片</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={card.avatarUrl || `/placeholder.svg?height=64&width=64&query=${encodeURIComponent(card.name)}`}
                alt={card.name}
              />
              <AvatarFallback>{card.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{card.name}</h3>
              <p className="text-gray-500">{card.title || "无职位信息"}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building className="h-5 w-5 text-gray-500" />
              <span>{card.company}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <span>{card.phone}</span>
            </div>

            {card.email && (
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>{card.email}</span>
              </div>
            )}

            {card.website && (
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-500" />
                <span>{card.website}</span>
              </div>
            )}

            {card.address && (
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{card.address}</span>
              </div>
            )}
          </div>

          {card.qrCodeUrl && (
            <div className="mt-6 flex justify-center">
              <img src={card.qrCodeUrl || "/placeholder.svg"} alt="QR Code" className="h-32 w-32" />
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500">
            <p>创建时间: {new Date(card.createdAt).toLocaleString("zh-CN")}</p>
            <p>更新时间: {new Date(card.updatedAt).toLocaleString("zh-CN")}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>关闭</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
