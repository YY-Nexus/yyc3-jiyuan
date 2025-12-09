import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getAllBusinessCards, createBusinessCard } from "@/lib/data/business-cards"
import { getUserFromToken } from "@/lib/auth/jwt"

export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || undefined

    // 获取用户ID（可选，用于过滤特定用户的卡片）
    const userId = searchParams.get("userId") || undefined

    // 获取业务卡片
    const { cards, total } = await getAllBusinessCards(page, limit, search, userId)

    return NextResponse.json({
      cards,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("获取业务卡片失败:", error)
    return NextResponse.json({ error: "获取业务卡片失败", details: (error as Error).message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // 获取当前用户
    const authToken = request.cookies.get("auth_token")?.value
    const user = authToken ? getUserFromToken(authToken) : null

    if (!user) {
      return NextResponse.json({ error: "未认证" }, { status: 401 })
    }

    const body = await request.json()

    // 验证必填字段
    if (!body.name || !body.company || !body.phone) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 })
    }

    // 创建业务卡片
    const card = await createBusinessCard({
      ...body,
      userId: user.id, // 设置创建者ID
    })

    return NextResponse.json(
      {
        message: "业务卡片创建成功",
        card,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("创建业务卡片失败:", error)
    return NextResponse.json({ error: "创建业务卡片失败", details: (error as Error).message }, { status: 500 })
  }
}
