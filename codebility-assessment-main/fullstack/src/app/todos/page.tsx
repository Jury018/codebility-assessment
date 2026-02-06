import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import TodoList from './TodoList'
import LogoutButton from './LogoutButton'

export default async function TodosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-gold/20 to-primary-orange/20 dark:from-gray-900 dark:to-gray-800 pb-16">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                My Todos
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 truncate">
                {user.email}
              </p>
            </div>
            <LogoutButton />
          </div>

          <TodoList />
        </div>
      </div>
    </div>
  )
}
