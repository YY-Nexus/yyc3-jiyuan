import { SignJWT, jwtVerify } from "jose"
import type { User } from "@/types"

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production-environment"
const secret = new TextEncoder().encode(JWT_SECRET)

export interface JwtPayload {
  userId: string
  email: string
  role: string
  name: string
  iat?: number
  exp?: number
}

/**
 * 生成JWT令牌
 */
export async function generateJwtToken(user: User): Promise<string> {
  try {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    }

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .setIssuer("yanyu-cloud")
      .setAudience("yanyu-cms")
      .sign(secret)

    return token
  } catch (error) {
    console.error("生成JWT令牌失败:", error)
    throw new Error("生成JWT令牌失败")
  }
}

/**
 * 验证JWT令牌
 */
export async function verifyJwtToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: "yanyu-cloud",
      audience: "yanyu-cms",
    })

    return payload as JwtPayload
  } catch (error) {
    console.error("JWT验证失败:", error)
    return null
  }
}

/**
 * 从令牌获取用户信息
 */
export async function getUserFromToken(token: string): Promise<User | null> {
  try {
    const payload = await verifyJwtToken(token)
    if (!payload) return null

    // 返回用户信息
    return {
      id: payload.userId,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatarUrl: "/logo.png",
    }
  } catch (error) {
    console.error("获取用户信息失败:", error)
    return null
  }
}

/**
 * 刷新JWT令牌
 */
export async function refreshJwtToken(token: string): Promise<string | null> {
  try {
    const payload = await verifyJwtToken(token)
    if (!payload) return null

    // 生成新令牌
    const newPayload: JwtPayload = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      name: payload.name,
    }

    const newToken = await new SignJWT(newPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .setIssuer("yanyu-cloud")
      .setAudience("yanyu-cms")
      .sign(secret)

    return newToken
  } catch (error) {
    console.error("刷新令牌失败:", error)
    return null
  }
}
