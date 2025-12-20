import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  verifyUserCredentials,
  updateUserLastLogin,
  getLoginAttempts,
  incrementLoginAttempts,
  resetLoginAttempts,
} from "@/lib/data/users"
import { generateJwtToken } from "@/lib/auth/jwt"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = body

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "邮箱和密码不能为空",
        },
        { status: 400 },
      )
    }

    // 检查登录失败次数
    const loginAttempts = await getLoginAttempts(email)
    if (loginAttempts >= 5) {
      return NextResponse.json(
        {
          success: false,
          error: "登录失败次数过多，账户已被临时锁定，请30分钟后重试",
        },
        { status: 423 },
      )
    }

    // 验证用户凭据
    const user = await verifyUserCredentials(email, password)

    if (!user) {
      // 增加登录失败次数
      await incrementLoginAttempts(email)

      return NextResponse.json(
        {
          success: false,
          error: "邮箱或密码错误",
        },
        { status: 401 },
      )
    }

    // 检查用户状态
    if (user.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          error: "账户已被禁用，请联系管理员",
        },
        { status: 403 },
      )
    }

    // 重置登录失败次数
    await resetLoginAttempts(email)

    // 更新最后登录时间
    await updateUserLastLogin(user.id)

    // 生成JWT令牌
    const token = await generateJwtToken(user)

    // 设置cookie
    const response = NextResponse.json({
      success: true,
      message: "登录成功",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    })

    // 设置认证cookie
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30天或1天
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("登录错误:", error)
    return NextResponse.json(
      {
        success: false,
        error: "登录失败",
        details: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
      },
      { status: 500 },
    )
  }
}
