'use client'

import { useState } from 'react'
import type { Todo } from './TodoList'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(todo.id)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMins = Math.floor(diffInMs / 60000)
    const diffInHours = Math.floor(diffInMs / 3600000)
    const diffInDays = Math.floor(diffInMs / 86400000)

    if (diffInMins < 1) return 'just now'
    if (diffInMins < 60) return `${diffInMins}m ago`
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div
      id={`todo-${todo.id}`}
      className={`group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-all duration-200 ${
        isDeleting ? 'opacity-50' : ''
      }`}
    >
      <button
        onClick={() => onToggle(todo.id, !todo.completed)}
        disabled={isDeleting}
        className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300 dark:border-gray-500 hover:border-primary-orange dark:hover:border-primary-orange transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-orange disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {todo.completed && (
          <svg
            className="w-full h-full text-primary-orange dark:text-primary-gold animate-fade-in"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm sm:text-base font-medium transition-all duration-200 break-words ${
            todo.completed
              ? 'text-gray-400 dark:text-gray-500 line-through'
              : 'text-gray-900 dark:text-white'
          }`}
        >
          {todo.title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
          {formatDate(todo.created_at)}
        </p>
      </div>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="flex-shrink-0 p-1.5 sm:p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete todo"
        aria-label="Delete todo"
      >
        {isDeleting ? (
          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-red-600"></div>
        ) : (
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
