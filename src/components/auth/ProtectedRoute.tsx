'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { useCheckAuth } from '@/hooks/auth/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { checkAuth } = useCheckAuth();
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      if (!isLoading) {
        try {
          if (isAuthenticated) {
            const isValid = await checkAuth();
            if (!isValid) {
              router.push('/login');
              return;
            }
          } else {
            // 未认证，直接重定向
            router.push('/login');
            return;
          }
        } catch (error) {
          console.error('Auth validation error:', error);
          router.push('/login');
          return;
        } finally {
          setIsValidating(false);
        }
      }
    };

    validateAuth();
  }, [isAuthenticated, isLoading, checkAuth, router]);

  if (isLoading || isValidating) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Validating authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
