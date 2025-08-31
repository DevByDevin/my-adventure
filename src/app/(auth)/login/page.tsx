import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(0,255,136,0.1),transparent_50%)]'></div>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,0,128,0.1),transparent_50%)]'></div>

      <div className='relative z-10 max-w-md w-full space-y-8 px-4'>
        <div className='text-center'>
          <h2 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent neon-glow mb-4'>
            Access Portal
          </h2>
          <p className='text-muted'>
            Or{' '}
            <a
              href='/register'
              className='text-primary hover:text-accent transition-colors duration-200 hover:underline font-medium'
            >
              create a new account
            </a>
          </p>
        </div>
        <div className='game-card p-8'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
