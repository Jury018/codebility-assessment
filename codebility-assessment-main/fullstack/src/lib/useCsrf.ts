'use client'

import { useEffect, useState } from 'react'

const CSRF_HEADER = 'x-csrf-token'

function getCsrfTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null
  
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrf-token='))
  
  return cookie ? cookie.split('=')[1] : null
}

export function useCsrfToken() {
  const [token, setToken] = useState<string | null>(null)
  
  useEffect(() => {
    setToken(getCsrfTokenFromCookie())
  }, [])
  
  return token
}

export async function fetchWithCsrf(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getCsrfTokenFromCookie()
  
  const headers = new Headers(options.headers)
  
  if (token && options.method && options.method !== 'GET' && options.method !== 'HEAD') {
    headers.set(CSRF_HEADER, token)
  }
  
  return fetch(url, {
    ...options,
    headers,
  })
}
