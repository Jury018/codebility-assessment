'use client'

import { useState, useEffect } from 'react'
import NewTodoForm from './NewTodoForm'
import TodoItem from './TodoItem'
import { fetchWithCsrf } from '@/lib/useCsrf'

export interface Todo {
  id: string
  title: string
  completed: boolean
  created_at: string
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/todos')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch todos')
      }
      
      setTodos(data.todos || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load todos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleTodoAdded = (newTodo: Todo) => {
    setTodos([newTodo, ...todos])
  }

  const handleTodoToggle = async (id: string, completed: boolean) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed } : todo
    ))

    try {
      const response = await fetchWithCsrf(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      })

      if (!response.ok) {
        setTodos(todos.map(todo => 
          todo.id === id ? { ...todo, completed: !completed } : todo
        ))
        throw new Error('Failed to update todo')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleTodoDelete = async (id: string) => {
    const todoElement = document.getElementById(`todo-${id}`)
    if (todoElement) {
      todoElement.classList.add('animate-slide-out')
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    setTodos(todos.filter(todo => todo.id !== id))

    try {
      const response = await fetchWithCsrf(`/api/todos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        fetchTodos()
        throw new Error('Failed to delete todo')
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4">
        <NewTodoForm onTodoAdded={handleTodoAdded} />
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary-orange"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-3 sm:space-y-4">
        <NewTodoForm onTodoAdded={handleTodoAdded} />
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4 text-center">
          <p className="text-sm sm:text-base text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchTodos}
            className="mt-2 text-sm text-red-700 dark:text-red-300 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <NewTodoForm onTodoAdded={handleTodoAdded} />

      {todos.length === 0 ? (
        <div className="text-center py-8 sm:py-12 space-y-2 sm:space-y-3 animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-2">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 font-medium">
            No todos yet
          </p>
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            Create your first todo to get started
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {todos.filter(t => !t.completed).length} remaining · {todos.filter(t => t.completed).length} completed
          </p>
          <div className="space-y-2">
            {todos.map((todo, index) => (
              <div
                key={todo.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-slide-in"
              >
                <TodoItem
                  todo={todo}
                  onToggle={handleTodoToggle}
                  onDelete={handleTodoDelete}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
