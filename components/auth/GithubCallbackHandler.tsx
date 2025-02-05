'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGithubAuth } from '@/hooks/useGithubAuth';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { storage } from '@/utils/storage';

export function GitHubCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { authenticateWithCode, isLoading, error } = useGithubAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');
    const savedState = localStorage.getItem('github_oauth_state');

    if (error) {
      router.push('/login?error=' + error);
      return;
    }

    if (!state || state !== savedState) {
      router.push('/login?error=invalid_state');
      return;
    }

    if (!code) {
      router.push('/login?error=no_code');
      return;
    }

    if (storage.isAuthenticated()) {
      router.push('/dashboard');
      return;
    }

    if (!isLoading) {
      authenticateWithCode(code, {
        onSuccess: (user) => {
          console.log('Authenticated as:', user);
          router.push('/dashboard');
        },
        onError: (error) => {
          console.error('Authentication failed:', error);
          router.push('/login?error=authentication_failed');
        },
      });
    }
  }, [searchParams, authenticateWithCode, router, isLoading]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4 text-red-600">
            Authentication Failed
          </h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button 
            variant="outline" 
            onClick={() => router.push('/login')}
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold mb-4">
          {isLoading ? 'Authenticating...' : 'Preparing authentication...'}
        </h1>
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
      </div>
    </div>
  );
}