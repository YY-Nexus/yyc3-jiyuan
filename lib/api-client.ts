import type { ApiResponse, PaginationParams } from "@/types"

type FetchOptions = RequestInit & {
  params?: Record<string, string>
}

/**
 * 通用API请求客户端
 * @param endpoint API端点路径，不包含/api前缀
 * @param options 请求选项
 * @returns 响应数据
 */
export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
  const { params, ...fetchOptions } = options

  let url = `/api${endpoint}`
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value)
      }
    })
    const queryString = searchParams.toString()
    if (queryString) {
      url += `?${queryString}`
    }
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        error: data.error || `请求失败: ${response.status}`,
        status: "error",
      }
    }

    return {
      data: data as T,
      status: "success",
      message: data.message,
    }
  } catch (error) {
    console.error(`API请求错误 (${url}):`, error)
    return {
      error: (error as Error).message || "网络请求失败",
      status: "error",
    }
  }
}

/**
 * 构建分页参数
 * @param params 分页参数
 * @returns 格式化后的URL参数对象
 */
export function buildPaginationParams(params: PaginationParams): Record<string, string> {
  const result: Record<string, string> = {}

  if (params.page !== undefined) {
    result.page = params.page.toString()
  }

  if (params.limit !== undefined) {
    result.limit = params.limit.toString()
  }

  if (params.query) {
    result.query = params.query
  }

  if (params.sort) {
    result.sort = params.sort
  }

  if (params.order) {
    result.order = params.order
  }

  return result
}

/**
 * 用户API
 */
export const userApi = {
  getUsers: (params?: PaginationParams) => fetchApi("/users", { params: buildPaginationParams(params || {}) }),

  getUserById: (id: string) => fetchApi(`/users/${id}`),

  createUser: (userData: Partial<User>) => fetchApi("/users", { method: "POST", body: JSON.stringify(userData) }),

  updateUser: (id: string, userData: Partial<User>) =>
    fetchApi(`/users/${id}`, { method: "PUT", body: JSON.stringify(userData) }),

  deleteUser: (id: string) => fetchApi(`/users/${id}`, { method: "DELETE" }),
}

/**
 * 认证API
 */
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    fetchApi("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),

  logout: () => fetchApi("/auth/logout", { method: "POST" }),

  getSession: () => fetchApi("/auth/session"),

  register: (userData: any) => fetchApi("/auth/register", { method: "POST", body: JSON.stringify(userData) }),
}

// Define the User type
export interface User {
  id: string
  name: string
  email: string
  // Add other properties as needed
}
