'use client';

import { useInitAuth } from '@/hooks/auth/useAuth';

export default function AuthInitializer() {
  useInitAuth();

  return null;
}
