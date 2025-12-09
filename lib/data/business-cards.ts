import { executeQuery } from "../db"
import type { BusinessCard } from "@/types"

export interface CreateBusinessCardData {
  name: string
  title?: string
  company: string
  phone: string
  email?: string
  address?: string
  website?: string
  avatarUrl?: string
  qrCodeUrl?: string
  userId?: string
}

export interface UpdateBusinessCardData {
  name?: string
  title?: string
  company?: string
  phone?: string
  email?: string
  address?: string
  website?: string
  avatarUrl?: string
  qrCodeUrl?: string
  userId?: string
}

// 获取所有业务卡片
export async function getAllBusinessCards(
  page = 1,
  limit = 10,
  search?: string,
  userId?: string,
): Promise<{ cards: BusinessCard[]; total: number }> {
  const offset = (page - 1) * limit

  let query = `
    SELECT id, name, title, company, phone, email, address, website, 
           avatar_url as "avatarUrl", qr_code_url as "qrCodeUrl", 
           user_id as "userId", created_at as "createdAt", updated_at as "updatedAt"
    FROM business_cards
  `

  let countQuery = `SELECT COUNT(*) FROM business_cards`
  const params: any[] = []
  const conditions: string[] = []

  if (search) {
    conditions.push(
      `(name ILIKE $${params.length + 1} OR company ILIKE $${params.length + 1} OR phone ILIKE $${params.length + 1})`,
    )
    params.push(`%${search}%`)
  }

  if (userId) {
    conditions.push(`user_id = $${params.length + 1}`)
    params.push(userId)
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`
    countQuery += ` WHERE ${conditions.join(" AND ")}`
  }

  query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
  params.push(limit, offset)

  const cards = await executeQuery<BusinessCard>(query, params)
  const [{ count }] = await executeQuery<{ count: string }>(countQuery, params.slice(0, conditions.length))

  return {
    cards,
    total: Number.parseInt(count, 10),
  }
}

// 根据ID获取业务卡片
export async function getBusinessCardById(id: string): Promise<BusinessCard | null> {
  const cards = await executeQuery<BusinessCard>(
    `
    SELECT id, name, title, company, phone, email, address, website, 
           avatar_url as "avatarUrl", qr_code_url as "qrCodeUrl", 
           user_id as "userId", created_at as "createdAt", updated_at as "updatedAt"
    FROM business_cards
    WHERE id = $1
  `,
    [id],
  )

  return cards.length > 0 ? cards[0] : null
}

// 创建业务卡片
export async function createBusinessCard(data: CreateBusinessCardData): Promise<BusinessCard> {
  const { name, title, company, phone, email, address, website, avatarUrl, qrCodeUrl, userId } = data

  const cards = await executeQuery<BusinessCard>(
    `
    INSERT INTO business_cards (
      name, title, company, phone, email, address, 
      website, avatar_url, qr_code_url, user_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id, name, title, company, phone, email, address, website, 
              avatar_url as "avatarUrl", qr_code_url as "qrCodeUrl", 
              user_id as "userId", created_at as "createdAt", updated_at as "updatedAt"
  `,
    [name, title, company, phone, email, address, website, avatarUrl, qrCodeUrl, userId],
  )

  return cards[0]
}

// 更新业务卡片
export async function updateBusinessCard(id: string, data: UpdateBusinessCardData): Promise<BusinessCard> {
  const { name, title, company, phone, email, address, website, avatarUrl, qrCodeUrl, userId } = data

  // 构建更新字段
  const updates: string[] = []
  const params: any[] = []

  if (name) {
    updates.push(`name = $${params.length + 1}`)
    params.push(name)
  }

  if (title !== undefined) {
    updates.push(`title = $${params.length + 1}`)
    params.push(title)
  }

  if (company) {
    updates.push(`company = $${params.length + 1}`)
    params.push(company)
  }

  if (phone) {
    updates.push(`phone = $${params.length + 1}`)
    params.push(phone)
  }

  if (email !== undefined) {
    updates.push(`email = $${params.length + 1}`)
    params.push(email)
  }

  if (address !== undefined) {
    updates.push(`address = $${params.length + 1}`)
    params.push(address)
  }

  if (website !== undefined) {
    updates.push(`website = $${params.length + 1}`)
    params.push(website)
  }

  if (avatarUrl !== undefined) {
    updates.push(`avatar_url = $${params.length + 1}`)
    params.push(avatarUrl)
  }

  if (qrCodeUrl !== undefined) {
    updates.push(`qr_code_url = $${params.length + 1}`)
    params.push(qrCodeUrl)
  }

  if (userId !== undefined) {
    updates.push(`user_id = $${params.length + 1}`)
    params.push(userId)
  }

  // 添加更新时间
  updates.push(`updated_at = $${params.length + 1}`)
  params.push(new Date())

  // 添加ID参数
  params.push(id)

  if (updates.length === 0) {
    throw new Error("没有提供要更新的字段")
  }

  const cards = await executeQuery<BusinessCard>(
    `
    UPDATE business_cards
    SET ${updates.join(", ")}
    WHERE id = $${params.length}
    RETURNING id, name, title, company, phone, email, address, website, 
              avatar_url as "avatarUrl", qr_code_url as "qrCodeUrl", 
              user_id as "userId", created_at as "createdAt", updated_at as "updatedAt"
  `,
    params,
  )

  if (cards.length === 0) {
    throw new Error("业务卡片不存在")
  }

  return cards[0]
}

// 删除业务卡片
export async function deleteBusinessCard(id: string): Promise<boolean> {
  const result = await executeQuery(
    `
    DELETE FROM business_cards
    WHERE id = $1
    RETURNING id
  `,
    [id],
  )

  return result.length > 0
}
