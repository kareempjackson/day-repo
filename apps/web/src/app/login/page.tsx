'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NumPad } from '@/components/login/NumPad';
import { PinDots } from '@/components/login/PinDots';
import { Toast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const handlePinChange = useCallback(async (newPin: string) => {
    if (newPin.length <= 4) {
      setPin(newPin);
      setError(null);

      if (newPin.length === 4) {
        setIsLoading(true);
        try {
          const response = await fetch('/api/auth/pin-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pin: newPin }),
          });

          const data = await response.json();

          if (response.ok && data.token) {
            localStorage.setItem('auth_token', data.token);
            if (data.user) {
              localStorage.setItem('user', JSON.stringify(data.user));
            }
            router.push('/register');
          } else {
            setShake(true);
            setError(data.error || 'Invalid PIN. Please try again.');
            setTimeout(() => {
              setPin('');
              setShake(false);
            }, 500);
          }
        } catch (err) {
          setShake(true);
          setError('Connection error. Please try again.');
          setTimeout(() => {
            setPin('');
            setShake(false);
          }, 500);
        } finally {
          setIsLoading(false);
        }
      }
    }
  }, [router]);

  const handleDigitPress = useCallback((digit: string) => {
    if (!isLoading && pin.length < 4) {
      handlePinChange(pin + digit);
    }
  }, [pin, isLoading, handlePinChange]);

  const handleBackspace = useCallback(() => {
    if (!isLoading && pin.length > 0) {
      setPin(pin.slice(0, -1));
      setError(null);
    }
  }, [pin, isLoading]);

  const handleClear = useCallback(() => {
    if (!isLoading) {
      setPin('');
      setError(null);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-between py-12 px-4">
      {/* Logo Section */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 bg-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-600/20">
          <svg
            className="w-14 h-14 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M2 21V19H20V21H2ZM20 8V5H18V8H20ZM20 3C20.5523 3 21 3.44772 21 4V9C21 9.55228 20.5523 10 20 10H18V13C18 15.2091 16.2091 17 14 17H6C3.79086 17 2 15.2091 2 13V4C2 3.44772 2.44772 3 3 3H20ZM16 5H4V13C4 14.1046 4.89543 15 6 15H14C15.1046 15 16 14.1046 16 13V5Z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">Coffee Shop</h1>
        <p className="text-zinc-400 text-sm">Enter your PIN to clock in</p>
      </div>

      {/* PIN Entry Section */}
      <div className="flex flex-col items-center gap-8 w-full max-w-xs">
        <PinDots length={4} filled={pin.length} shake={shake} />
        
        <NumPad
          onDigitPress={handleDigitPress}
          onBackspace={handleBackspace}
          onClear={handleClear}
          disabled={isLoading}
        />

        {isLoading && (
          <div className="flex items-center gap-2 text-zinc-400">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Verifying...</span>
          </div>
        )}
      </div>

      {/* Admin Login Link */}
      <Link
        href="/admin/login"
        className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
      >
        Admin Login
      </Link>

      {/* Error Toast */}
      {error && (
        <Toast
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
}
