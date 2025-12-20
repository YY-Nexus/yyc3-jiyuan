"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import {
  getAllBusinessCards,
  getBusinessCardById,
  createBusinessCard,
  updateBusinessCard,
  deleteBusinessCard,
} from "@/lib/data/business-cards"
import { getUserFromToken } from "@/lib/auth/jwt"

// 获取当前用户
function getCurrentUser() {
  const authToken = cookies().get("auth_token")?.value
  return authToken ? getUserFromToken(authToken) : null
}

// 获取业务卡片列表
export async function getBusinessCards(page = 1, limit = 10, search?: string) {
  try {
    const user = getCurrentUser()

    if (!user) {
      return { error: "未认证" }
    }

    // 管理员可以查看所有卡片，普通用户只能查看自己的卡片
    const userId = user.role === "admin" ? undefined : user.id

    const { cards, total } = await getAllBusinessCards(page, limit, search, userId)

    return {
      cards,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error("获取业务卡片失败:", error)
    return { error: (error as Error).message }
  }
}

// 获取单个业务卡片
export async function getBusinessCard(id: string) {
  try {
    const user = getCurrentUser()

    if (!user) {
      return { error: "未认证" }
    }

    const card = await getBusinessCardById(id)

    if (!card) {
      return { error: "业务卡片不存在" }
    }

    // 检查权限（只有创建者或管理员可以查看）
    if (card.userId !== user.id && user.role !== "admin") {
      return { error: "无权限查看此业务卡片" }
    }

    return { card }
  } catch (error) {
    console.error("获取业务卡片失败:", error)
    return { error: (error as Error).message }
  }
}

// 创建业务卡片
export async function createBusinessCardAction(formData: FormData) {
  try {
    const user = getCurrentUser()

    if (!user) {
      return { error: "未认证" }
    }

    // 从表单数据中提取字段
    const name = formData.get("name") as string
    const title = formData.get("title") as string
    const company = formData.get("company") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const address = formData.get("address") as string
    const website = formData.get("website") as string

    // 验证必填字段
    if (!name || !company || !phone) {
      return { error: "姓名、公司和电话为必填字段" }
    }

    // 创建业务卡片
    const card = await createBusinessCard({
      name,
      title,
      company,
      phone,
      email,
      address,
      website,
      userId: user.id,
    })

    // 重新验证路径，更新缓存
    revalidatePath("/business-card")

    return { success: true, card }
  } catch (error) {
    console.error("创建业务卡片失败:", error)
    return { error: (error as Error).message }
  }
}

// 更新业务卡片
export async function updateBusinessCardAction(id: string, formData: FormData) {
  try {
    const user = getCurrentUser()

    if (!user) {
      return { error: "未认证" }
    }

    // 检查卡片是否存在
    const existingCard = await getBusinessCardById(id)

    if (!existingCard) {
      return { error: "业务卡片不存在" }
    }

    // 检查权限（只有创建者或管理员可以更新）
    if (existingCard.userId !== user.id && user.role !== "admin") {
      return { error: "无权限更新此业务卡片" }
    }

    // 从表单数据中提取字段
    const name = formData.get("name") as string
    const title = formData.get("title") as string
    const company = formData.get("company") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const address = formData.get("address") as string
    const website = formData.get("website") as string

    // 验证必填字段
    if (!name || !company || !phone) {
      return { error: "姓名、公司和电话为必填字段" }
    }

    // 更新业务卡片
    const updatedCard = await updateBusinessCard(id, {
      name,
      title,
      company,
      phone,
      email,
      address,
      website,
    })

    // 重新验证路径，更新缓存
    revalidatePath("/business-card")
    revalidatePath(`/business-card/${id}`)

    return { success: true, card: updatedCard }
  } catch (error) {
    console.error("更新业务卡片失败:", error)
    return { error: (error as Error).message }
  }
}

// 删除业务卡片
export async function deleteBusinessCardAction(id: string) {
  try {
    const user = getCurrentUser()

    if (!user) {
      return { error: "未认证" }
    }

    // 检查卡片是否存在
    const existingCard = await getBusinessCardById(id)

    if (!existingCard) {
      return { error: "业务卡片不存在" }
    }

    // 检查权限（只有创建者或管理员可以删除）
    if (existingCard.userId !== user.id && user.role !== "admin") {
      return { error: "无权限删除此业务卡片" }
    }

    // 删除业务卡片
    const success = await deleteBusinessCard(id)

    if (!success) {
      return { error: "删除业务卡片失败" }
    }

    // 重新验证路径，更新缓存
    revalidatePath("/business-card")

    return { success: true }
  } catch (error) {
    console.error("删除业务卡片失败:", error)
    return { error: (error as Error).message }
  }
}
