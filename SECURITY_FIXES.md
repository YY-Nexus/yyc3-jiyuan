# Security Vulnerability Fixes - Updated After Main Branch Merge

## 概述
本次修复原计划解决**13个关键安全漏洞**。在与main分支合并后，由于代码库结构的重大变更，部分修复已不再适用，但核心安全工具和配置仍然有效。

## 合并后的状态

### ✅ 保留的安全功能

#### 1. 安全工具库 (`lib/security-utils.ts`)
完整保留，提供以下功能：
- HTML 清理和转义
- 输入验证（邮箱、密码）
- 搜索查询清理（防止ReDoS）
- URL 清理（防止开放重定向）
- CSRF Token 生成和验证
- 安全存储类（SecureStorage）
- 速率限制类（RateLimiter）
- Token 过期检查
- 安全 JSON 解析
- 文件名清理
- 输入清理

#### 2. HTTP 安全标头 (`next.config.mjs`)
已合并到新的配置中：
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

#### 3. 文档
- `SECURITY_FIXES.md` - 安全修复详细文档（本文件，已更新）
- `SECURITY_SUMMARY.md` - 执行摘要
- `next-security.config.js` - 安全配置示例

### ❌ 已移除的功能（因main分支中文件已删除）

以下文件在main分支中已被删除或重写，因此相关的安全修复不再适用：

1. **components/auth/auth-provider.tsx** - 已删除
   - 原修复：安全存储、输入验证、Token过期检查
   - 新代码：main分支使用了不同的认证实现

2. **components/smart-chat-dialog.tsx** - 已删除  
   - 原修复：移除dangerouslySetInnerHTML、清理搜索查询
   - 新代码：该组件在main分支中不再存在

3. **lib/user-feedback.ts** - 已删除
   - 原修复：移除innerHTML、安全渲染调查问卷
   - 新代码：用户反馈功能可能被重新实现

4. **lib/api-client.ts** - 已简化
   - 原修复：CSRF保护、速率限制、请求拦截器
   - 当前状态：保留了简化版本，未包含原有的复杂安全功能
   - 建议：可以基于新的简单结构重新实现这些功能

## 建议：为新的main分支实现安全功能

虽然某些文件已被删除，但安全功能仍然重要。以下是如何在新代码中应用这些安全工具的建议：

### 1. 在新的认证流程中使用安全工具

如果您的应用有新的登录/注册表单，可以这样使用：

```typescript
import { validateEmail, validatePassword, secureStorage } from "@/lib/security-utils"

// 在表单验证中
if (!validateEmail(email)) {
  setError("请输入有效的邮箱地址")
  return
}

const { isValid, errors } = validatePassword(password)
if (!isValid) {
  setError(errors.join(", "))
  return
}

// 存储认证token时
await secureStorage.setItem("authToken", token)
```

### 2. 在API调用中添加CSRF保护

虽然api-client.ts已简化，但您可以在需要的地方手动添加CSRF token：

```typescript
import { generateCsrfToken } from "@/lib/security-utils"

// 获取或生成CSRF token
const getCsrfToken = () => {
  let token = sessionStorage.getItem("csrf_token")
  if (!token) {
    token = generateCsrfToken()
    sessionStorage.setItem("csrf_token", token)
  }
  return token
}

// 在POST/PUT/PATCH/DELETE请求中添加
const response = await fetch("/api/endpoint", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRF-Token": getCsrfToken(),
  },
  body: JSON.stringify(data)
})
```

### 3. 在搜索或用户输入中使用清理功能

```typescript
import { sanitizeSearchQuery, sanitizeInput, escapeHtml } from "@/lib/security-utils"

// 清理搜索查询（防止ReDoS）
const cleanQuery = sanitizeSearchQuery(userInput)
const regex = new RegExp(cleanQuery, "gi")

// 清理表单输入
const cleanName = sanitizeInput(userName, 100)

// 在显示用户生成内容时
<div>{escapeHtml(userContent)}</div>
```

### 4. 实现速率限制

```typescript
import { rateLimiter } from "@/lib/security-utils"

// 在API路由中
export async function POST(request: Request) {
  const userId = getUserIdFromSession(request)
  
  if (!rateLimiter.isAllowed(userId, 10, 60000)) {
    return new Response("Too many requests", { status: 429 })
  }
  
  // 处理请求...
}
```

## 新增的安全工具

### SecurityUtils (`lib/security-utils.ts`)
提供了以下安全功能：

1. **HTML 清理**: `sanitizeHtml()`, `escapeHtml()`
2. **输入验证**: `validateEmail()`, `validatePassword()`
3. **搜索查询清理**: `sanitizeSearchQuery()`
4. **URL 清理**: `sanitizeUrl()`
5. **CSRF Token**: `generateCsrfToken()`, `validateCsrfToken()`
6. **安全存储**: `SecureStorage` 类
7. **速率限制**: `RateLimiter` 类
8. **Token 过期检查**: `isTokenExpired()`
9. **安全 JSON 解析**: `safeJsonParse()`
10. **文件名清理**: `sanitizeFilename()`
11. **输入清理**: `sanitizeInput()`

## 使用指南

### 1. 使用安全存储
```typescript
import { secureStorage } from "@/lib/security-utils"

// 存储敏感数据
await secureStorage.setItem("key", "sensitive-data")

// 读取敏感数据
const data = await secureStorage.getItem("key")

// 删除数据
secureStorage.removeItem("key")
```

### 2. 验证用户输入
```typescript
import { validateEmail, validatePassword } from "@/lib/security-utils"

if (!validateEmail(email)) {
  throw new Error("无效的邮箱地址")
}

const { isValid, errors } = validatePassword(password)
if (!isValid) {
  console.error("密码验证失败:", errors)
}
```

### 3. 清理用户输入
```typescript
import { sanitizeInput, escapeHtml } from "@/lib/security-utils"

const cleanInput = sanitizeInput(userInput)
const safeHtml = escapeHtml(userGeneratedContent)
```

### 4. 速率限制
```typescript
import { rateLimiter } from "@/lib/security-utils"

if (!rateLimiter.isAllowed(userId, 10, 60000)) {
  throw new Error("请求过于频繁")
}
```

## 测试建议

1. **XSS 测试**: 尝试在输入框中输入 `<script>alert('xss')</script>`
2. **CSRF 测试**: 尝试从外部站点发送请求
3. **速率限制测试**: 快速发送多个请求验证限制
4. **Token 过期测试**: 修改 token 过期时间验证自动登出
5. **URL 重定向测试**: 尝试重定向到外部恶意网站

## 安全最佳实践

1. **永远不要信任用户输入** - 所有输入必须经过验证和清理
2. **使用参数化查询** - 防止 SQL 注入
3. **实施最小权限原则** - 用户只能访问必要的资源
4. **定期更新依赖** - 及时修复已知漏洞
5. **使用 HTTPS** - 加密所有数据传输
6. **实施日志和监控** - 及时发现安全事件
7. **安全的会话管理** - 使用安全的 cookie 设置
8. **多因素认证** - 为敏感操作添加额外验证

## 重要说明

### 加密实现
当前的 `SecureStorage` 实现使用简单的 XOR 混淆方法，这**不是**真正的加密，仅提供基本的数据混淆。对于生产环境，强烈建议：

1. **使用 Web Crypto API**: 实现 AES-GCM 加密
2. **密钥管理**: 从用户密码派生密钥，而不是存储在客户端
3. **考虑服务器端存储**: 对于敏感数据，使用服务器端会话管理

示例实现（Web Crypto API）:
```typescript
async function encryptData(data: string, password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  )
  
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  )
  
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encoder.encode(data)
  )
  
  return btoa(JSON.stringify({
    salt: Array.from(salt),
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted))
  }))
}
```

## 未来改进

1. ✅ ~~实施更强的加密算法（Web Crypto API 的 AES-GCM）~~ - 需要在生产环境实现
2. 添加 API 请求签名验证
3. 实施基于角色的访问控制（RBAC）
4. 添加安全审计日志
5. 实施内容安全策略报告（CSP报告URI）
6. 添加威胁检测和响应机制
7. 实施数据库查询参数化
8. 添加自动安全扫描到 CI/CD 流程
9. 移除 CSP 中的 'unsafe-inline' 和 'unsafe-eval'，使用 nonce 或 hash
10. 实现更严格的速率限制策略（按用户、IP等）

## 参考资源

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
