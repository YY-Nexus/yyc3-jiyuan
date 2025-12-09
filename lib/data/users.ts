import type { User } from "@/types"

// 简单的密码验证函数（生产环境应使用bcrypt）
function verifyPassword(password: string, hash: string): boolean {
  // 简化的密码验证，生产环境应使用bcrypt
  return password === "secret123"
}

// 模拟用户数据库
const users: (User & { password: string })[] = [
  {
    id: "1",
    name: "系统管理员",
    email: "admin@yanyu.cloud",
    password: "secret123",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    lastLoginAt: null,
    loginAttempts: 0,
    avatarUrl: "/logo.png",
  },
  {
    id: "2",
    name: "业务经理",
    email: "manager@yanyu.cloud",
    password: "secret123",
    role: "manager",
    status: "active",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    lastLoginAt: null,
    loginAttempts: 0,
    avatarUrl: "/logo.png",
  },
  {
    id: "3",
    name: "普通用户",
    email: "user@yanyu.cloud",
    password: "secret123",
    role: "user",
    status: "active",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    lastLoginAt: null,
    loginAttempts: 0,
    avatarUrl: "/logo.png",
  },
]

/**
 * 验证用户凭据
 */
export async function verifyUserCredentials(email: string, password: string): Promise<User | null> {
  try {
    const user = users.find((u) => u.email === email)
    if (!user) return null

    const isValid = verifyPassword(password, user.password)
    if (!isValid) return null

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error("验证用户凭据失败:", error)
    return null
  }
}

/**
 * 根据ID获取用户
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    const user = users.find((u) => u.id === id)
    if (!user) return null

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error("获取用户失败:", error)
    return null
  }
}

/**
 * 根据邮箱获取用户
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = users.find((u) => u.email === email)
    if (!user) return null

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error("获取用户失败:", error)
    return null
  }
}

/**
 * 更新用户最后登录时间
 */
export async function updateUserLastLogin(userId: string): Promise<void> {
  try {
    const user = users.find((u) => u.id === userId)
    if (user) {
      user.lastLoginAt = new Date().toISOString()
      user.updatedAt = new Date().toISOString()
    }
  } catch (error) {
    console.error("更新最后登录时间失败:", error)
  }
}

/**
 * 获取登录失败次数
 */
export async function getLoginAttempts(email: string): Promise<number> {
  try {
    const user = users.find((u) => u.email === email)
    return user?.loginAttempts || 0
  } catch (error) {
    console.error("获取登录失败次数失败:", error)
    return 0
  }
}

/**
 * 增加登录失败次数
 */
export async function incrementLoginAttempts(email: string): Promise<void> {
  try {
    const user = users.find((u) => u.email === email)
    if (user) {
      user.loginAttempts = (user.loginAttempts || 0) + 1
      user.updatedAt = new Date().toISOString()
    }
  } catch (error) {
    console.error("增加登录失败次数失败:", error)
  }
}

/**
 * 重置登录失败次数
 */
export async function resetLoginAttempts(email: string): Promise<void> {
  try {
    const user = users.find((u) => u.email === email)
    if (user) {
      user.loginAttempts = 0
      user.updatedAt = new Date().toISOString()
    }
  } catch (error) {
    console.error("重置登录失败次数失败:", error)
  }
}

/**
 * 获取所有用户
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    return users.map(({ password: _, ...user }) => user)
  } catch (error) {
    console.error("获取所有用户失败:", error)
    return []
  }
}
