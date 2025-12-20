import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getBusinessCardById, updateBusinessCard, deleteBusinessCard } from "@/lib/data/business-cards"
import { getUserFromToken } from "@/lib/auth/jwt"

// 获取单个业务卡片
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const card = await getBusinessCardById(id)

    if (!card) {
      return NextResponse.json({ error: "业务卡片不存在" }, { status: 404 })
    }

    return NextResponse.json({ card })
  } catch (error) {
    console.error("获取业务卡片失败:", error)
    return NextResponse.json({ error: "获取业务卡片失败", details: (error as Error).message }, { status: 500 })
  }
}

// 更新业务卡片
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // 获取当前用户
    const authToken = request.cookies.get("auth_token")?.value
    const user = authToken ? getUserFromToken(authToken) : null

    if (!user) {
      return NextResponse.json({ error: "未认证" }, { status: 401 })
    }

    // 检查卡片是否存在
    const existingCard = await getBusinessCardById(id)

    if (!existingCard) {
      return NextResponse.json({ error: "业务卡片不存在" }, { status: 404 })
    }

    // 检查权限（只有创建者或管理员可以更新）
    if (existingCard.userId !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "无权限更新此业务卡片" }, { status: 403 })
    }

    const body = await request.json()

    // 更新业务卡片
    const updatedCard = await updateBusinessCard(id, body)

    return NextResponse.json({
      message: "业务卡片更新成功",
      card: updatedCard,
    })
  } catch (error) {
    console.error("更新业务卡片失败:", error)
    return NextResponse.json({ error: "更新业务卡片失败", details: (error as Error).message }, { status: 500 })
  }
}

// 删除业务卡片
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // 获取当前用户
    const authToken = request.cookies.get("auth_token")?.value
    const user = authToken ? getUserFromToken(authToken) : null

    if (!user) {
      return NextResponse.json({ error: "未认证" }, { status: 401 })
    }

    // 检查卡片是否存在
    const existingCard = await getBusinessCardById(id)

    if (!existingCard) {
      return NextResponse.json({ error: "业务卡片不存在" }, { status: 404 })
    }

    // 检查权限（只有创建者或管理员可以删除）
    if (existingCard.userId !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "无权限删除此业务卡片" }, { status: 403 })
    }

    // 删除业务卡片
    const success = await deleteBusinessCard(id)

    if (!success) {
      return NextResponse.json({ error: "删除业务卡片失败" }, { status: 500 })
    }

    return NextResponse.json({
      message: "业务卡片删除成功",
    })
  } catch (error) {
    console.error("删除业务卡片失败:", error)
    return NextResponse.json({ error: "删除业务卡片失败", details: (error as Error).message }, { status: 500 })
  }
}
