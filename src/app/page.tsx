'use client';

import { useAuth } from '@/hooks/auth/useAuth';
import Link from 'next/link';
import UserMenu from '@/components/UserMenu';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <div className='text-2xl font-bold text-primary neon-glow'>
            Loading...
          </div>
          <div className='text-muted mt-2'>Preparing your adventure...</div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.1),transparent_50%)]'></div>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,0,128,0.1),transparent_50%)]'></div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center'>
          <h1 className='text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary neon-glow mb-8'>
            My Adventure
          </h1>
          <p className='text-xl text-muted mb-12 max-w-2xl mx-auto'>
            Embark on an epic journey through mysterious worlds and
            unforgettable stories
          </p>

          {user ? (
            <div className='space-y-8'>
              <div className='game-card p-8 max-w-md mx-auto transform hover:scale-105 transition-transform duration-300'>
                <h2 className='text-3xl font-bold text-primary mb-6 neon-glow'>
                  Welcome back, Explorer!
                </h2>
                <p className='text-muted mb-6'>
                  Ready to continue your journey?
                </p>
                <p className='text-sm text-accent mb-6'>Email: {user.email}</p>
                <div className='space-y-4'>
                  <Link
                    href='/dashboard'
                    className='game-button block w-full px-6 py-3 rounded-lg text-center font-bold'
                  >
                    Continue Adventure
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className='space-y-8'>
              <div className='game-card p-8 max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300'>
                <h2 className='text-2xl font-bold text-primary mb-6 neon-glow'>
                  Begin Your Quest
                </h2>
                <p className='text-muted mb-8'>
                  Choose your path and start your legendary adventure
                </p>
                <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
                  <Link
                    href='/login'
                    className='game-button px-8 py-4 rounded-lg text-center font-bold'
                  >
                    Sign In
                  </Link>
                  <Link
                    href='/register'
                    className='game-button px-8 py-4 rounded-lg text-center font-bold'
                    style={{
                      background:
                        'linear-gradient(45deg, var(--secondary), var(--accent))',
                      borderColor: 'var(--secondary)',
                    }}
                  >
                    Create Account
                  </Link>
                </div>
              </div>

              {/* Feature highlights */}
              <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12'>
                <div className='game-card p-6 text-center'>
                  <div className='w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl'>🎮</span>
                  </div>
                  <h3 className='text-lg font-bold text-primary mb-2'>
                    Immersive Stories
                  </h3>
                  <p className='text-muted text-sm'>
                    Experience rich narratives that adapt to your choices
                  </p>
                </div>

                <div className='game-card p-6 text-center'>
                  <div className='w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl'>🌍</span>
                  </div>
                  <h3 className='text-lg font-bold text-secondary mb-2'>
                    Dynamic Worlds
                  </h3>
                  <p className='text-muted text-sm'>
                    Explore ever-changing environments and discover secrets
                  </p>
                </div>

                <div className='game-card p-6 text-center'>
                  <div className='w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl'>⚡</span>
                  </div>
                  <h3 className='text-lg font-bold text-accent mb-2'>
                    Real-time AI
                  </h3>
                  <p className='text-muted text-sm'>
                    Powered by advanced AI for endless possibilities
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
