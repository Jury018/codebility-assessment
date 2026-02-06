const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
}

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"'/]/g, (char) => HTML_ENTITIES[char] || char)
}

export function sanitizeTodoTitle(title: string): string {
  if (typeof title !== 'string') {
    throw new Error('Title must be a string')
  }

  let sanitized = title.trim()
  sanitized = sanitized.replace(/[\x00-\x1F\x7F-\x9F]/g, '')
  sanitized = sanitized.replace(/\s+/g, ' ')

  if (sanitized.length > 500) {
    sanitized = sanitized.substring(0, 500)
  }

  sanitized = escapeHtml(sanitized)

  if (sanitized.length === 0) {
    throw new Error('Title cannot be empty')
  }

  return sanitized
}

export function sanitizeBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value
  }
  if (value === 'true' || value === 1) {
    return true
  }
  if (value === 'false' || value === 0) {
    return false
  }
  throw new Error('Invalid boolean value')
}

export function isValidUuid(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

export function sanitizeUuid(uuid: string): string {
  if (typeof uuid !== 'string') {
    throw new Error('UUID must be a string')
  }

  const sanitized = uuid.trim().toLowerCase()

  if (!isValidUuid(sanitized)) {
    throw new Error('Invalid UUID format')
  }

  return sanitized
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000
): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

export function cleanupRateLimits() {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}

if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimits, 5 * 60 * 1000)
}
