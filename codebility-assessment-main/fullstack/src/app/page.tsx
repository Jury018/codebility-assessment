export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Todo App
        </h1>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-lg mb-4">
            This is a todo application with Next.js and Supabase authentication.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get started by setting up your Supabase credentials in .env.local
          </p>
        </div>
      </div>
    </div>
  );
}
