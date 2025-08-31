'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { LogoutOptions } from './types';
import { AuthApiResponse } from '@/types/response';

const makeApiCall = async (endpoint: string, options: RequestInit = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(endpoint, {
    headers,
    credentials: 'include',
    ...options,
  });

  const result = await response.json();
  return { response, result };
};

const updateAuthState = (data: any, setUser: any, setSession: any) => {
  if (data?.user && data?.session) {
    setUser(data.user);
    setSession(data.session);
    return true;
  }
  return false;
};

const checkAuthStatus = async () => {
  try {
    const { response, result } = await makeApiCall('/api/auth/me');

    if (response.ok && result.success && result.data) {
      return { success: true, data: result.data };
    }
    return { success: false, data: null };
  } catch (error) {
    return { success: false, data: null };
  }
};

export function useLogin() {
  const { setUser, setSession } = useAuthStore();

  const login = async (
    email: string,
    password: string
  ): Promise<AuthApiResponse<any>> => {
    try {
      const { response, result } = await makeApiCall('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return result;
      }

      if (result.success && result.data) {
        updateAuthState(result.data, setUser, setSession);
      }
      return result;
    } catch (error: any) {
      return {
        success: false,
        message: 'Login failed, please retry',
        code: 500,
      };
    }
  };

  return { login, isLoading: useAuthStore((state) => state.isLoading) };
}

export function useRegister() {
  const { setUser, setSession } = useAuthStore();

  const register = async (
    email: string,
    password: string
  ): Promise<AuthApiResponse<any>> => {
    try {
      const { response, result } = await makeApiCall('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return result;
      }

      if (result.success && result.data) {
        updateAuthState(result.data, setUser, setSession);
      }
      return result;
    } catch (error: any) {
      return {
        success: false,
        message: 'Registration failed, please retry',
        code: 500,
      };
    }
  };

  return { register, isLoading: useAuthStore((state) => state.isLoading) };
}

export function useLogout() {
  const { clearAuth } = useAuthStore();

  const logout = async (
    options: LogoutOptions
  ): Promise<AuthApiResponse<{ redirectTo: string }>> => {
    try {
      const { response, result } = await makeApiCall('/api/auth/logout', {
        method: 'POST',
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        return result;
      }

      if (options.clearLocalData) {
        clearAuth();
      }

      return {
        success: true,
        message: result.message || 'Successfully logged out',
        data: { redirectTo: options.redirectTo },
        code: 200,
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Logout failed, please retry',
        code: 500,
      };
    }
  };

  return { logout, isLoading: useAuthStore((state) => state.isLoading) };
}

export function useAuth() {
  const { user, session, isAuthenticated, isLoading } = useAuthStore();

  return {
    user,
    session,
    isAuthenticated,
    isLoading,
  };
}

export function useInitAuth() {
  const { setUser, setSession, setLoading, clearAuth } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      try {
        const { success, data } = await checkAuthStatus();
        if (success && data) {
          updateAuthState(data, setUser, setSession);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const authCheckInterval = setInterval(async () => {
      const { success, data } = await checkAuthStatus();

      if (success && data) {
        updateAuthState(data, setUser, setSession);
      } else {
        clearAuth();
      }
    }, 30000);

    return () => clearInterval(authCheckInterval);
  }, [setUser, setSession, setLoading, clearAuth]);
}

export function useCheckAuth() {
  const { user, isAuthenticated } = useAuthStore();

  const checkAuth = async () => {
    const { success } = await checkAuthStatus();
    return success;
  };

  return {
    isAuthenticated,
    user,
    checkAuth,
  };
}
