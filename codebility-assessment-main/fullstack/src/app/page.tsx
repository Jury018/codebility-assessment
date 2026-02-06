import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-gold/20 to-primary-orange/20 dark:from-gray-900 dark:to-gray-800 p-4 pb-16">
      <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-8 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary-red to-primary-orange mb-2 sm:mb-4">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Welcome to Todo App
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 px-4">
            A beautiful, simple way to manage your tasks
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-red/10 dark:bg-primary-red/20 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-red dark:text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">Secure</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                OAuth authentication powered by Supabase
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-orange/10 dark:bg-primary-orange/20 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-orange dark:text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">Fast</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Built with Next.js for optimal performance
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-gold/30 dark:bg-primary-gold/20 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-brown dark:text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">Beautiful</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Polished UI with smooth animations
              </p>
            </div>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-primary-red to-primary-orange text-white rounded-lg font-medium hover:from-primary-red/90 hover:to-primary-orange/90 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Get Started
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
