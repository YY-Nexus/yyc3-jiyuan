// 简单的内存存储，生产环境建议使用Redis
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

interface RateLimitResult {
  success: boolean
  count: number
  resetTime: number
}

/**
 * 检查速率限制
 * @param identifier 标识符（IP地址、用户ID等）
 * @param action 操作类型
 * @param limit 限制次数，默认5次
 * @param windowMs 时间窗口（毫秒），默认15分钟
 */
export async function checkRateLimit(
  identifier: string,
  action: string,
  limit = 5,
  windowMs: number = 15 * 60 * 1000, // 15分钟
): Promise<RateLimitResult> {
  const key = `${action}:${identifier}`
  const now = Date.now()
  const record = rateLimitStore.get(key)

  // 如果没有记录或者已过期，创建新记录
  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs
    rateLimitStore.set(key, { count: 1, resetTime })

    return {
      success: true,
      count: 1,
      resetTime: Math.ceil(windowMs / 1000),
    }
  }

  // 如果超过限制
  if (record.count >= limit) {
    return {
      success: false,
      count: record.count,
      resetTime: Math.ceil((record.resetTime - now) / 1000),
    }
  }

  // 增加计数
  record.count++
  rateLimitStore.set(key, record)

  return {
    success: true,
    count: record.count,
    resetTime: Math.ceil((record.resetTime - now) / 1000),
  }
}

/**
 * 重置速率限制
 * @param identifier 标识符
 * @param action 操作类型
 */
export async function resetRateLimit(identifier: string, action: string): Promise<void> {
  const key = `${action}:${identifier}`
  rateLimitStore.delete(key)
}

/**
 * 清理过期的记录
 */
export function cleanupExpiredRecords(): void {
  const now = Date.now()

  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// 每小时清理一次过期记录
setInterval(cleanupExpiredRecords, 60 * 60 * 1000)
