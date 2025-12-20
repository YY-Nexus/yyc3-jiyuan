export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "user"
  status: "active" | "inactive" | "suspended"
  avatarUrl?: string
  createdAt: string
  updatedAt: string
  lastLoginAt?: string | null
  loginAttempts?: number
}

export interface BusinessCard {
  id: string
  name: string
  title: string
  company: string
  email: string
  phone: string
  address?: string
  website?: string
  description?: string
  tags: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface MessageTemplate {
  id: string
  name: string
  type: "email" | "sms" | "push"
  subject?: string
  content: string
  variables: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface MessageTask {
  id: string
  name: string
  templateId: string
  recipients: string[]
  scheduledAt?: string
  status: "draft" | "scheduled" | "sending" | "sent" | "failed"
  sentCount: number
  failedCount: number
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  isSystem: boolean
  createdAt: string
  updatedAt: string
}

export interface Menu {
  id: string
  name: string
  path: string
  icon?: string
  parentId?: string
  order: number
  isVisible: boolean
  permissions: string[]
  children?: Menu[]
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
