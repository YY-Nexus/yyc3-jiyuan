"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Paperclip, Send, Smile, ImageIcon, Phone, Video, MoreVertical } from "lucide-react"
import Sidebar from "@/components/sidebar"

interface Message {
  id: number
  sender: {
    id: string
    name: string
    avatar: string
  }
  content: string
  time: string
  isMe: boolean
  isRead: boolean
}

export default function ChatRoom() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 模拟数据
  const currentUser = {
    id: "user1",
    name: "陈三",
    avatar: "/abstract-geometric-shapes.png",
  }

  const contact = {
    id: "contact1",
    name: "张三",
    avatar: "/contact-us-concept.png",
    status: "在线",
    company: "齐齐哈尔老董餐饮股份有限公司",
    title: "销售经理",
  }

  // 初始化消息
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: 1,
        sender: contact,
        content: "您好，请问有什么可以帮助您的吗？",
        time: "09:15 AM",
        isMe: false,
        isRead: true,
      },
      {
        id: 2,
        sender: currentUser,
        content: "您好，我想了解一下贵公司的产品。",
        time: "09:16 AM",
        isMe: true,
        isRead: true,
      },
      {
        id: 3,
        sender: contact,
        content: "好的，我们公司主要提供餐饮管理软件和服务，包括点餐系统、库存管理、会员管理等。",
        time: "09:18 AM",
        isMe: false,
        isRead: true,
      },
      {
        id: 4,
        sender: currentUser,
        content: "这些功能看起来很全面，价格是怎么样的？",
        time: "09:20 AM",
        isMe: true,
        isRead: true,
      },
      {
        id: 5,
        sender: contact,
        content: "我们有不同的套餐可以选择，基础版每月299元，标准版每月599元，高级版每月999元。不同版本功能有所不同。",
        time: "09:22 AM",
        isMe: false,
        isRead: true,
      },
    ]
    setMessages(initialMessages)
  }, [])

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim() === "") return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: currentUser,
      content: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
      isRead: false,
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // 模拟回复
    setTimeout(() => {
      const replyMessage: Message = {
        id: messages.length + 2,
        sender: contact,
        content: "好的，我明白了。还有其他问题吗？",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: false,
        isRead: true,
      }
      setMessages((prev) => [...prev, replyMessage])
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 聊天头部 */}
        <div className="bg-white p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-base font-medium flex items-center">
                {contact.name}
                <span className="ml-2 text-xs text-green-500">{contact.status}</span>
              </h2>
              <p className="text-xs text-gray-500">
                {contact.company} | {contact.title}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* 聊天内容区 */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                {!msg.isMe && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage src={msg.sender.avatar || "/placeholder.svg"} alt={msg.sender.name} />
                    <AvatarFallback>{msg.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[70%]`}>
                  <div
                    className={`p-3 rounded-lg ${
                      msg.isMe ? "bg-blue-600 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${msg.isMe ? "text-right" : ""}`}>
                    {msg.time} {msg.isMe && (msg.isRead ? "已读" : "未读")}
                  </div>
                </div>
                {msg.isMe && (
                  <Avatar className="h-8 w-8 ml-2 mt-1">
                    <AvatarImage src={msg.sender.avatar || "/placeholder.svg"} alt={msg.sender.name} />
                    <AvatarFallback>{msg.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 聊天输入区 */}
        <div className="bg-white p-4 border-t">
          <div className="flex items-center space-x-2 mb-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Smile className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Paperclip className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="请输入消息..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
              className="flex-1"
            />
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
