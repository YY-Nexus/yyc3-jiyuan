/**
 * Security utilities for input sanitization, validation, and protection
 */

// HTML sanitization to prevent XSS attacks
export function sanitizeHtml(html: string): string {
  const div = document.createElement("div")
  div.textContent = html
  return div.innerHTML
}

// Escape HTML special characters
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  }
  return text.replace(/[&<>"'/]/g, (char) => map[char])
}

// Sanitize user input for search queries
export function sanitizeSearchQuery(query: string): string {
  // Remove special regex characters to prevent ReDoS
  return query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate password strength
export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("密码至少需要8个字符")
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("密码需要包含至少一个大写字母")
  }
  if (!/[a-z]/.test(password)) {
    errors.push("密码需要包含至少一个小写字母")
  }
  if (!/[0-9]/.test(password)) {
    errors.push("密码需要包含至少一个数字")
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("密码需要包含至少一个特殊字符")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Sanitize URL to prevent open redirect attacks
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url, window.location.origin)
    // Only allow same-origin URLs or explicitly whitelisted domains
    const allowedDomains = [window.location.hostname, "vercel.app", "v0.app"]

    if (allowedDomains.some((domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`))) {
      return parsed.toString()
    }

    // Return safe default for external URLs
    return window.location.origin
  } catch {
    // Invalid URL, return safe default
    return window.location.origin
  }
}

// Generate CSRF token
export function generateCsrfToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

// Validate CSRF token
export function validateCsrfToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false
  return token === storedToken
}

// Secure localStorage wrapper with encryption
class SecureStorage {
  private encryptionKey: string | null = null

  // Initialize encryption key
  async initializeKey(): Promise<void> {
    const stored = localStorage.getItem("_sk")
    if (stored) {
      this.encryptionKey = stored
    } else {
      this.encryptionKey = this.generateKey()
      localStorage.setItem("_sk", this.encryptionKey)
    }
  }

  private generateKey(): string {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
  }

  private async encrypt(data: string): Promise<string> {
    if (!this.encryptionKey) await this.initializeKey()

    // Simple XOR encryption for demonstration
    // In production, use proper encryption like Web Crypto API with AES-GCM
    const key = this.encryptionKey || ""
    let result = ""
    for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length))
    }
    return btoa(result)
  }

  private async decrypt(data: string): Promise<string> {
    if (!this.encryptionKey) await this.initializeKey()

    try {
      const decoded = atob(data)
      const key = this.encryptionKey || ""
      let result = ""
      for (let i = 0; i < decoded.length; i++) {
        result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length))
      }
      return result
    } catch {
      return ""
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    const encrypted = await this.encrypt(value)
    localStorage.setItem(`secure_${key}`, encrypted)
  }

  async getItem(key: string): Promise<string | null> {
    const encrypted = localStorage.getItem(`secure_${key}`)
    if (!encrypted) return null
    return await this.decrypt(encrypted)
  }

  removeItem(key: string): void {
    localStorage.removeItem(`secure_${key}`)
  }
}

export const secureStorage = new SecureStorage()

// Rate limiting utility
class RateLimiter {
  private requests: Map<string, number[]> = new Map()

  // Check if request is allowed
  isAllowed(key: string, maxRequests: number, timeWindowMs: number): boolean {
    const now = Date.now()
    const requests = this.requests.get(key) || []

    // Filter out old requests
    const validRequests = requests.filter((time) => now - time < timeWindowMs)

    if (validRequests.length >= maxRequests) {
      return false
    }

    validRequests.push(now)
    this.requests.set(key, validRequests)
    return true
  }

  // Clear rate limit for a key
  clear(key: string): void {
    this.requests.delete(key)
  }

  // Get remaining requests
  getRemaining(key: string, maxRequests: number, timeWindowMs: number): number {
    const now = Date.now()
    const requests = this.requests.get(key) || []
    const validRequests = requests.filter((time) => now - time < timeWindowMs)
    return Math.max(0, maxRequests - validRequests.length)
  }
}

export const rateLimiter = new RateLimiter()

// Token expiration checker
export function isTokenExpired(expiresAt: string | number | Date): boolean {
  try {
    const expirationTime = new Date(expiresAt).getTime()
    const currentTime = Date.now()
    // Add 5 minute buffer before actual expiration
    return currentTime >= expirationTime - 5 * 60 * 1000
  } catch {
    return true // If we can't parse the date, consider it expired
  }
}

// Safe JSON parse with fallback
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}

// Content Security Policy helper
export function getSecurityHeaders() {
  return {
    "Content-Security-Policy":
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.app https://v0.app; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data:; " +
      "connect-src 'self' https://api.vercel.app https://v0.app; " +
      "frame-ancestors 'none'; " +
      "base-uri 'self'; " +
      "form-action 'self'",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  }
}

// Sanitize filename to prevent path traversal
export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 255)
}

// Validate and sanitize user input for forms
export function sanitizeInput(input: string, maxLength = 1000): string {
  if (!input) return ""
  // Remove null bytes and control characters
  let sanitized = input.replace(/\x00/g, "").replace(/[\x00-\x1F\x7F]/g, "")
  // Trim and limit length
  sanitized = sanitized.trim().slice(0, maxLength)
  return sanitized
}
