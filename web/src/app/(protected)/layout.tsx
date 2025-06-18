'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3006/login', {
          credentials: 'include',
        });
        if (!response.ok) {
          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3006/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/vehicles', label: 'Active Vehicles' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 ${
          isDrawerOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className={`font-bold text-xl ${!isDrawerOpen && 'hidden'}`}>
            Valet App
          </h1>
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isDrawerOpen ? '←' : '→'}
          </button>
        </div>
        <nav className="mt-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-3 ${
                pathname === item.path
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className={!isDrawerOpen ? 'hidden' : ''}>
                {item.label}
              </span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50"
          >
            <span className={!isDrawerOpen ? 'hidden' : ''}>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
} 