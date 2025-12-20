"use server"

export async function handleFormSubmit(data: any) {
  console.log("表单数据:", data)
  // 服务器端处理逻辑
  return { success: true }
}

export async function handleEnableAccount(accountId: number) {
  console.log("启用账号:", accountId)
  // 服务器端处理逻辑
  return { success: true }
}

export async function handleEnableExpiredAccount(accountId: number) {
  console.log("启用过期账号:", accountId)
  // 服务器端处理逻辑
  return { success: true }
}
