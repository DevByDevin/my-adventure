'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import LogoutButton from './LogoutButton';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user || !user.email) return null;

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-3 p-2 rounded-lg bg-card/50 hover:bg-card/80 border border-border/50 hover:border-primary/50 transition-all duration-200 hover:scale-105 group'
      >
        <div className='w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-background font-bold text-sm'>
          {user.email.charAt(0).toUpperCase()}
        </div>
        <span className='text-muted group-hover:text-primary transition-colors duration-200 font-medium hidden sm:block'>
          {user.email}
        </span>
        <svg
          className={`w-4 h-4 text-muted group-hover:text-primary transition-all duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-64 bg-card/95 backdrop-blur-md border border-border/50 rounded-lg shadow-2xl shadow-primary/20 z-50 overflow-hidden'>
          <div className='p-4 border-b border-border/30'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-background font-bold text-lg'>
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-semibold text-primary truncate'>
                  {user.email}
                </p>
                <p className='text-xs text-muted mt-1'>
                  Registered:{' '}
                  {new Date(user.created_at).toLocaleDateString('en-US')}
                </p>
              </div>
            </div>
          </div>

          <div className='p-2'>
            <div className='space-y-1'>
              <button className='w-full text-left px-3 py-2 text-sm text-muted hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-200 flex items-center space-x-2 group'>
                <div className='w-4 h-4 bg-primary/20 rounded group-hover:bg-primary/40 transition-colors duration-200'></div>
                <span>Profile</span>
              </button>

              <button className='w-full text-left px-3 py-2 text-sm text-muted hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-200 flex items-center space-x-2 group'>
                <div className='w-4 h-4 bg-secondary/20 rounded group-hover:bg-secondary/40 transition-colors duration-200'></div>
                <span>Settings</span>
              </button>

              <button className='w-full text-left px-3 py-2 text-sm text-muted hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-200 flex items-center space-x-2 group'>
                <div className='w-4 h-4 bg-accent/20 rounded group-hover:bg-accent/40 transition-colors duration-200'></div>
                <span>Help</span>
              </button>
            </div>

            <div className='border-t border-border/30 mt-2 pt-2'>
              <LogoutButton
                variant='button'
                className='w-full text-left px-3 py-2 text-sm text-danger hover:text-danger/80 hover:bg-danger/10 rounded-md transition-all duration-200 flex items-center space-x-2 group'
                redirectTo='/login'
                showConfirmation={true}
              >
                <div className='w-4 h-4 bg-danger/20 rounded group-hover:bg-danger/40 transition-colors duration-200'></div>
                <span>Logout</span>
              </LogoutButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
