import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});

export const metadata = {
  title: "Welth",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#3b82f6",
        },
      }}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en" className="dark">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <style dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for LCP optimization */
              .hero-text {
                font-display: swap;
                contain: layout style paint;
              }
              .animate-fade-in {
                animation: fadeIn 0.6s ease-out;
                will-change: opacity, transform;
              }
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `
          }} />
        </head>
        <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster
            richColors
            theme="system"
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(229, 231, 235, 0.5)',
              },
              className: 'animate-slide-down',
            }}
          />

          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12 mt-20">
            <div className="container mx-auto px-4">
              <div className="text-center animate-fade-in">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-2xl">💰</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Welth</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Smart Financial Management Made Simple
                </p>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <span>Made with</span>
                  <span className="text-red-500 animate-bounce-gentle">💗</span>
                  <span>by Pratham Periwal</span>
                </div>
                <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                  © 2025 Welth. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
