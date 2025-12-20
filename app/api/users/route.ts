import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getAllUsers, createUser } from "@/lib/data/users"

export async function GET(request: NextRequest) {
  try {
    // 获取所有用户
    const users = await getAllUsers()

    // 支持搜索和分页
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")?.toLowerCase()
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredUsers = users
    if (query) {
      filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query),
      )
    }

    const startIndex = (page - 1) * limit
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      success: true,
      data: {
        users: paginatedUsers,
        total: filteredUsers.length,
        page,
        limit,
        totalPages: Math.ceil(filteredUsers.length / limit),
      },
    })
  } catch (error) {
    console.error("获取用户失败:", error)
    return NextResponse.json(
      {
        success: false,
        error: "获取用户失败",
        details: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 验证必填字段
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        {
          success: false,
          error: "缺少必填字段：姓名、邮箱和密码",
        },
        { status: 400 },
      )
    }

    // 创建新用户
    const newUser = await createUser({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role || "user",
      status: body.status || "active",
      avatarUrl: body.avatarUrl || "/logo.png",
    })

    return NextResponse.json(
      {
        success: true,
        message: "用户创建成功",
        data: { user: newUser },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("创建用户失败:", error)
    return NextResponse.json(
      {
        success: false,
        error: "创建用户失败",
        details: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
      },
      { status: 500 },
    )
  }
}
