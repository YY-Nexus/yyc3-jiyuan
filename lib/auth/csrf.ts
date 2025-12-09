import { randomBytes } from "crypto"
import { SignJWT, jwtVerify } from "jose"

const CSRF_SECRET = process.env.CSRF_SECRET || "csrf-secret-key"

/**
 * 生成CSRF令牌
 */
export async function generateCsrfToken(): Promise<string> {
  const secret = new TextEncoder().encode(CSRF_SECRET)
  const randomValue = randomBytes(32).toString("hex")

  const token = await new SignJWT({ value: randomValue })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h") // 1小时过期
    .sign(secret)

  return token
}

/**
 * 验证CSRF令牌
 */
export async function verifyCsrfToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(CSRF_SECRET)
    await jwtVerify(token, secret)
    return true
  } catch (error) {
    return false
  }
}
