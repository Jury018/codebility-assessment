'use client'

import { useState } from 'react'
import type { Todo } from './TodoList'
import { fetchWithCsrf } from '@/lib/useCsrf'


const MAX_TITLE_LENGTH = 500
const FORBIDDEN_PATTERNS = /<script|javascript:|onerror=|onclick=/i

export default function NewTodoForm({ onTodoAdded }: { onTodoAdded: (todo: Todo) => void }) {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateTitle = (value: string): string | null => {
    if (!value.trim()) {
      return 'Title cannot be empty'
    }
    if (value.length > MAX_TITLE_LENGTH) {
      return `Title cannot exceed ${MAX_TITLE_LENGTH} characters`
    }
    if (FORBIDDEN_PATTERNS.test(value)) {
      return 'Title contains forbidden characters'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateTitle(title)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetchWithCsrf('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create todo')
      }

      onTodoAdded(data.todo)
      setTitle('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="space-y-1">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setError(null)
            }}
            placeholder="What needs to be done?"
            disabled={loading}
            maxLength={MAX_TITLE_LENGTH}
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary-red to-primary-orange text-white rounded-lg font-medium text-sm sm:text-base hover:from-primary-red/90 hover:to-primary-orange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-orange disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 shadow-md hover:shadow-lg whitespace-nowrap"
          >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
              <span className="hidden sm:inline">Adding...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Add</span>
            </div>
          )}
        </button>
      </div>
      </div>
      
      {title.length > 0 && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
          {title.length} / {MAX_TITLE_LENGTH}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 animate-fade-in">
          {error}
        </p>
      )}
    </form>
  )
}
