'use client';
import { useMutation } from '@tanstack/react-query';
import { GITHUB_CLIENT_ID, GITHUB_REDIRECT_URI } from '@/config/github';
import { storage, type GitHubUser } from '@/utils/storage';
import { useState, useEffect } from 'react';

interface AuthenticateParams {
  onSuccess?: (user: GitHubUser) => void;
  onError?: (error: Error) => void;
}

export function useGithubAuth() {
  const [user, setUser] = useState<GitHubUser | null>(null);

  useEffect(() => {
    const authState = storage.getAuthState();
    if (storage.isAuthenticated()) {
      setUser(authState.user);
    }
  }, []);

  const handleGithubAuth = async (code: string) => {
    try {
      if (storage.isAuthenticated()) {
        const authState = storage.getAuthState();
        return authState.user as GitHubUser;
      }

      const tokenResponse = await fetch('/api/auth/github/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code,
          state: localStorage.getItem('github_oauth_state')
        }),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok || tokenData.error) {
        throw new Error(tokenData.error || 'Failed to exchange code for token');
      }

      const { access_token } = tokenData;

      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Accept': 'application/json',
        },
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await userResponse.json() as GitHubUser;

      storage.setAuthState({
        user: userData,
        accessToken: access_token,
      });

      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Authentication error:', error);
      storage.clearAuthState();
      throw error;
    }
  };

  const authMutation = useMutation({
    mutationFn: handleGithubAuth,
    retry: false,
  });

  const login = () => {
    storage.clearAuthState();
    
    const state = crypto.randomUUID();
    localStorage.setItem('github_oauth_state', state);

    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: GITHUB_REDIRECT_URI,
      scope: 'read:user user:email',
      state,
    });

    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
  };

  const logout = () => {
    storage.clearAuthState();
    setUser(null);
  };

  const authenticateWithCode = async (
    code: string,
    { onSuccess, onError }: AuthenticateParams = {}
  ) => {
    try {
      const result = await authMutation.mutateAsync(code);
      onSuccess?.(result);
      return result;
    } catch (error) {
      onError?.(error as Error);
      throw error;
    }
  };

  return {
    login,
    logout,
    authenticateWithCode,
    isLoading: authMutation.isPending,
    user,
    error: authMutation.error,
    isAuthenticated: storage.isAuthenticated(),
  };
}