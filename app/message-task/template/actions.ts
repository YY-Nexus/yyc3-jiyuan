"use server"

export async function handleFormSubmit(data: any) {
  console.log("表单数据:", data)
  // 服务器端处理逻辑
  return { success: true }
}
