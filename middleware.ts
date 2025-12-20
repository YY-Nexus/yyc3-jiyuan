import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyJwtToken } from "./lib/auth/jwt"

// 不需要认证的路径
const publicPaths = ["/auth/login", "/auth/register", "/api/auth/login", "/api/auth/register", "/api/auth/csrf"]

// 静态资源路径
const staticPaths = ["/_next", "/favicon.ico", "/images", "/fonts"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 跳过静态资源
  if (staticPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // 检查是否是公开路径
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  // 检查是否是API路径
  const isApiPath = pathname.startsWith("/api/")

  // 如果是公开路径，直接放行
  if (isPublicPath) {
    return NextResponse.next()
  }

  // 获取认证令牌
  const authToken = request.cookies.get("auth_token")?.value

  // 验证令牌
  const isAuthenticated = authToken ? await verifyJwtToken(authToken) : null

  // 如果未认证且不是公开路径
  if (!isAuthenticated) {
    // 对API请求返回401
    if (isApiPath) {
      return NextResponse.json({ error: "未认证" }, { status: 401 })
    }

    // 对页面请求重定向到登录页
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // 全局错误处理
  try {
    return NextResponse.next()
  } catch (error) {
    console.error("请求处理错误:", error)

    // 对API请求返回500
    if (isApiPath) {
      return NextResponse.json(
        {
          error: "服务器内部错误",
          message: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
        },
        { status: 500 },
      )
    }

    // 对页面请求重定向到错误页
    return NextResponse.redirect(new URL("/error?code=500", request.url))
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}
