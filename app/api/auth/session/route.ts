import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getUserFromToken } from "@/lib/auth/jwt"

export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get("auth_token")?.value

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          error: "未找到认证令牌",
        },
        { status: 401 },
      )
    }

    const user = await getUserFromToken(authToken)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "无效的认证令牌",
        },
        { status: 401 },
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    })
  } catch (error) {
    console.error("获取会话信息错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: "获取会话信息失败",
        details: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
      },
      { status: 500 },
    )
  }
}
