'use client';
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Light/Dark mode persistence
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", localStorage.theme === "dark");
    }
  }, []);

  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-white min-h-screen">
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="flex items-center px-6 h-16 shadow bg-white dark:bg-gray-950">
            <img src="/logo.svg" alt="Logo" className="w-9 h-9 mr-4" />
            <span className="font-bold text-xl tracking-wide">The Brick Escapes</span>
            <div className="flex-1" />
            <ThemeToggle />
          </header>
          {/* Main content */}
          <main className="flex-1 flex flex-col md:flex-row">
            {/* Sidebar (expansion-ready) */}
            <aside className="bg-white dark:bg-gray-900 shadow md:w-52 px-4 py-6 hidden md:block">
              <nav>
                <ul className="space-y-3">
                  <li className="font-medium text-lg">Dashboard</li>
                  {/* Future nav here */}
                </ul>
              </nav>
            </aside>
            <section className="flex-1 px-2 md:px-8 py-6">{children}</section>
          </main>
        </div>
      </body>
    </html>
  );
}

// Theme switch toggle
function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(typeof window !== "undefined" && localStorage.theme === "dark");
  }, []);
  return (
    <button
      className="ml-4 rounded p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      onClick={() => {
        const isDark = !dark;
        setDark(isDark);
        if (isDark) {
          document.documentElement.classList.add("dark");
          localStorage.theme = "dark";
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.theme = "light";
        }
      }}
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M3.23 7.09a9 9 0 1 0 13.68 10.95c.27-.37-.13-.86-.57-.74A7 7 0 0 1 4.01 7.67c-.12-.44-.61-.64-.78-.24z"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="currentColor"/><path stroke="currentColor" strokeWidth="2" d="M12 2v2m0 16v2m10-10h-2M4 12H2m16.95-6.95-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0-1.414-1.414M6.05 6.05 4.636 4.636"/></svg>
      )}
    </button>
  );
}
