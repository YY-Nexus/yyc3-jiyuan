import { NextResponse } from "next/server"
import { generateCsrfToken } from "@/lib/auth/csrf"

export async function GET() {
  try {
    const csrfToken = await generateCsrfToken()

    return NextResponse.json({ csrfToken })
  } catch (error) {
    console.error("生成CSRF令牌失败:", error)
    return NextResponse.json({ error: "生成CSRF令牌失败" }, { status: 500 })
  }
}
