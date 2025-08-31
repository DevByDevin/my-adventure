'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/auth/useAuth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login, isLoading } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    const result = await login(email, password);

    if (result.success) {
      setSuccessMessage(result.message || 'Login successful!');

      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      setErrorMessage(result.message || 'Login failed');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {successMessage && (
        <div className='game-card p-4 border-success/50'>
          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 bg-success rounded-full pulse-glow'></div>
            <span className='text-success font-medium'>{successMessage}</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className='game-card p-4 border-danger/50'>
          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 bg-danger rounded-full pulse-glow'></div>
            <span className='text-danger font-medium'>{errorMessage}</span>
          </div>
        </div>
      )}

      <div className='space-y-2'>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-primary'
        >
          Email
        </label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={handleEmailChange}
          required
          className='game-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50'
          disabled={isLoading}
          placeholder='Enter your email address'
          autoComplete='email'
        />
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-primary'
        >
          Password
        </label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={handlePasswordChange}
          required
          className='game-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50'
          disabled={isLoading}
          placeholder='Enter password'
          autoComplete='current-password'
        />
      </div>

      <button
        type='submit'
        disabled={isLoading}
        className='game-button w-full py-3 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isLoading ? (
          <span className='flex items-center justify-center'>
            <svg
              className='animate-spin -ml-1 mr-3 h-5 w-5'
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
            Authenticating...
          </span>
        ) : (
          'Access Portal'
        )}
      </button>

      <div className='text-center space-y-4'>
        <div className='text-sm text-muted'>
          <a
            href='/forgot-password'
            className='text-primary hover:text-accent transition-colors duration-200 hover:underline'
          >
            Forgot password?
          </a>
        </div>
        <div className='text-sm text-muted'>
          Don't have an account?{' '}
          <a
            href='/register'
            className='text-primary hover:text-accent transition-colors duration-200 hover:underline'
          >
            Create one now
          </a>
        </div>
      </div>
    </form>
  );
}
