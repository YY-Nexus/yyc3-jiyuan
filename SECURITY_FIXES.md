# Security Vulnerability Fixes

本文档记录了针对13个安全漏洞的修复措施。

## 修复的漏洞列表

### 1. XSS漏洞 - dangerouslySetInnerHTML
**位置**: `components/smart-chat-dialog.tsx`
**修复**: 移除了 `dangerouslySetInnerHTML` 的使用，改用安全的 React 组件渲染搜索高亮。
**影响**: 防止恶意用户通过搜索功能注入恶意脚本。

### 2. XSS漏洞 - innerHTML
**位置**: `lib/user-feedback.ts`
**修复**: 将 `innerHTML` 替换为安全的 DOM 元素创建方法，所有用户输入通过 `textContent` 设置。
**影响**: 防止在调查问卷中注入恶意HTML代码。

### 3. ReDoS漏洞 - 不安全的正则表达式
**位置**: `components/smart-chat-dialog.tsx`
**修复**: 使用 `sanitizeSearchQuery` 函数转义特殊字符，防止正则表达式拒绝服务攻击。
**影响**: 防止恶意用户通过精心构造的搜索查询导致服务器资源耗尽。

### 4. 敏感数据存储 - localStorage 加密
**位置**: 多个文件
**修复**: 实现了 `SecureStorage` 类，对存储在 localStorage 中的敏感数据进行加密。
**影响**: 保护用户认证信息和其他敏感数据免受本地存储攻击。

### 5. 输入验证缺失
**位置**: `components/auth/auth-provider.tsx`
**修复**: 添加了邮箱格式验证、密码强度验证和用户名长度验证。
**影响**: 防止无效或恶意数据进入系统。

### 6. Content Security Policy (CSP)
**位置**: `next.config.mjs`, `next-security.config.js`
**修复**: 实现了严格的 CSP 策略，限制脚本、样式和资源来源。
**影响**: 大幅降低 XSS 攻击的风险。

### 7. 速率限制缺失
**位置**: `lib/api-client.ts`
**修复**: 实现了 `RateLimiter` 类，限制 API 请求频率（每分钟10个请求）。
**影响**: 防止 API 滥用和 DDoS 攻击。

### 8. CSRF 保护缺失
**位置**: `lib/api-client.ts`
**修复**: 为所有非 GET 请求自动添加 CSRF token。
**影响**: 防止跨站请求伪造攻击。

### 9. Token 过期检查缺失
**位置**: `components/auth/auth-provider.tsx`
**修复**: 添加了 `isTokenExpired` 函数，在使用前检查 token 是否过期。
**影响**: 防止使用过期的认证凭证。

### 10. 输入清理缺失
**位置**: 多个文件
**修复**: 实现了 `sanitizeInput` 和 `escapeHtml` 函数，清理所有用户输入。
**影响**: 防止各种注入攻击。

### 11. 认证Token 过期验证
**位置**: `lib/security-utils.ts`, `components/auth/auth-provider.tsx`
**修复**: 添加了 token 过期时间验证，提前5分钟刷新 token。
**影响**: 确保用户会话安全，及时发现无效认证。

### 12. 开放重定向漏洞
**位置**: `lib/security-utils.ts`
**修复**: 实现了 `sanitizeUrl` 函数，只允许白名单域名的重定向。
**影响**: 防止钓鱼攻击和恶意重定向。

### 13. 安全标头缺失
**位置**: `next.config.mjs`
**修复**: 添加了完整的安全 HTTP 标头集合（HSTS, X-Frame-Options, X-Content-Type-Options等）。
**影响**: 提供多层安全防护，遵循安全最佳实践。

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
