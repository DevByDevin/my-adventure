import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,0,128,0.1),transparent_50%)]'></div>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,128,255,0.1),transparent_50%)]'></div>

      <div className='relative z-10 max-w-md w-full space-y-8 px-4'>
        <div className='text-center'>
          <h2 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent neon-glow mb-4'>
            Create Account
          </h2>
          <p className='text-muted'>
            Or{' '}
            <a
              href='/login'
              className='text-secondary hover:text-accent transition-colors duration-200 hover:underline font-medium'
            >
              sign in to existing account
            </a>
          </p>
        </div>
        <div className='game-card p-8'>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
