import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// 配置neon
neonConfig.fetchConnectionCache = true

// 创建SQL客户端
const sql = neon(process.env.DATABASE_URL!)

// 创建drizzle客户端
export const db = drizzle(sql)

// 直接执行SQL查询的辅助函数 - 使用标签模板字符串
export async function executeQuery<T = any>(queryString: string, params: any[] = []): Promise<T[]> {
  try {
    // 使用sql.query方法，这是推荐的方式
    return (await sql.query(queryString, params)) as T[]
  } catch (error) {
    console.error("数据库查询错误:", error)
    throw new Error(`数据库查询失败: ${(error as Error).message}`)
  }
}

// 事务执行辅助函数
export async function executeTransaction<T = any>(queries: { query: string; params?: any[] }[]): Promise<T[][]> {
  const results: T[][] = []

  try {
    // 开始事务 - 使用标签模板字符串
    await sql`BEGIN`

    // 执行所有查询
    for (const { query, params = [] } of queries) {
      const result = (await sql.query(query, params)) as T[]
      results.push(result)
    }

    // 提交事务 - 使用标签模板字符串
    await sql`COMMIT`

    return results
  } catch (error) {
    // 回滚事务 - 使用标签模板字符串
    await sql`ROLLBACK`
    console.error("事务执行错误:", error)
    throw new Error(`事务执行失败: ${(error as Error).message}`)
  }
}
