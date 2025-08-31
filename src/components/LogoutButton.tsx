'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/hooks/auth/useAuth';

interface LogoutButtonProps {
  variant?: 'button' | 'link' | 'icon';
  className?: string;
  children?: React.ReactNode;
  redirectTo?: string;
  showConfirmation?: boolean;
}

export default function LogoutButton({
  variant = 'button',
  className = '',
  children,
  redirectTo = '/login',
  showConfirmation = true,
}: LogoutButtonProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { logout, isLoading } = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    if (showConfirmation) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirm = async () => {
    const result = await logout({
      redirectTo,
      clearLocalData: true,
    });

    if (result.success) {
      setSuccessMessage(result.message || 'Successfully logged out');
      setErrorMessage('');

      setTimeout(() => {
        if (result.data?.redirectTo) {
          router.push(result.data.redirectTo);
        } else {
          router.push(redirectTo);
        }
      }, 1000);
    } else {
      setErrorMessage(result.message || 'Logout failed');
      setSuccessMessage('');
    }

    setShowConfirmDialog(false);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    setErrorMessage('');
  };

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const renderButton = () => {
    const baseClasses =
      'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-danger/50 focus:ring-offset-2 focus:ring-offset-background';

    switch (variant) {
      case 'link':
        return (
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className={`text-danger hover:text-danger/80 underline ${baseClasses} ${className}`}
          >
            {children || 'Logout'}
          </button>
        );

      case 'icon':
        return (
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className={`p-2 text-muted hover:text-danger hover:bg-danger/10 rounded-full ${baseClasses} ${className}`}
            title='Logout'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
          </button>
        );

      default:
        return (
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className={`game-button bg-gradient-to-r from-danger to-danger/80 border-danger text-background px-4 py-2 rounded-lg font-medium hover:from-danger/90 hover:to-danger/70 ${baseClasses} ${className}`}
          >
            {children || 'Logout'}
          </button>
        );
    }
  };

  return (
    <>
      {renderButton()}

      {showConfirmDialog && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='game-card p-6 max-w-sm w-full mx-4 border-danger/30'>
            <h3 className='text-lg font-medium text-danger mb-4 neon-glow'>
              Confirm Logout
            </h3>
            <p className='text-muted mb-6'>
              Are you sure you want to logout? You will need to log in again.
            </p>
            <div className='flex space-x-3'>
              <button
                onClick={handleCancel}
                className='flex-1 px-4 py-2 text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 border border-border/50 hover:border-primary/50'
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className='flex-1 game-button bg-gradient-to-r from-danger to-danger/80 border-danger text-background px-4 py-2 rounded-lg font-medium hover:from-danger/90 hover:to-danger/70 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? (
                  <span className='flex items-center justify-center'>
                    <svg
                      className='animate-spin -ml-1 mr-2 h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Logging out...
                  </span>
                ) : (
                  'Logout'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className='game-card p-4 border-danger/50 mt-4'>
          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 bg-danger rounded-full pulse-glow'></div>
            <span className='text-danger font-medium'>{errorMessage}</span>
          </div>
        </div>
      )}

      {successMessage && (
        <div className='game-card p-4 border-success/50 mt-4'>
          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 bg-success rounded-full pulse-glow'></div>
            <span className='text-success font-medium'>{successMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}
