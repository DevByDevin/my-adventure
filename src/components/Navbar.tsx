'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/auth/useAuth';
import UserMenu from './UserMenu';

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className='bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-6'>
            <Link
              href='/'
              className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent neon-glow hover:scale-105 transition-transform duration-200'
            >
              My Adventure
            </Link>
            {isAuthenticated && (
              <Link
                href='/dashboard'
                className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className='flex items-center space-x-4'>
            {isAuthenticated && <UserMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
}
