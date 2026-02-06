import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo application with authentication",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 text-center">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Developed by{' '}
              <a
                href="https://bonfire.base69.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold animate-gradient-text hover:scale-105 inline-block transition-transform duration-200"
              >
                BONFIRE BASE
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
