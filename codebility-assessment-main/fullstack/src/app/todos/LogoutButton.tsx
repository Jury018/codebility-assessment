'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Logout error:', error)
        alert('Failed to sign out: ' + error.message)
        setLoading(false)
        return
      }
      
      // Replace current history entry and go to dashboard
      // This prevents back button from returning to todos page
      router.replace('/')
      router.refresh()
    } catch (error) {
      console.error('Logout exception:', error)
      alert('Failed to sign out. Please try again.')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-primary-red text-white rounded-lg font-medium hover:bg-primary-red/90 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
          <span className="hidden sm:inline">Signing out...</span>
        </span>
      ) : (
        'Sign Out'
      )}
    </button>
  )
}
