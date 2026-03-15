'use client';

import { useEffect, useCallback } from 'react';
import { PaymentType } from '@/types/order';

interface PaymentModalProps {
  isOpen: boolean;
  amount: number;
  onSelectPaymentType: (type: PaymentType) => void;
  onClose: () => void;
}

export function PaymentModal({ isOpen, amount, onSelectPaymentType, onClose }: PaymentModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className="relative z-10 w-full max-w-lg mx-4 bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label="Close payment modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="payment-modal-title" className="text-2xl font-bold text-white text-center mb-2">
          Select Payment Method
        </h2>
        <p className="text-zinc-400 text-center mb-8">
          Total: <span className="text-white font-semibold text-xl">{formattedAmount}</span>
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onSelectPaymentType('card')}
            className="flex flex-col items-center justify-center p-8 bg-zinc-800 hover:bg-zinc-700 rounded-xl border-2 border-transparent hover:border-blue-500 transition-all duration-200 group"
          >
            <svg 
              className="w-16 h-16 text-blue-400 group-hover:text-blue-300 mb-4 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
              />
            </svg>
            <span className="text-xl font-semibold text-white">Card</span>
          </button>

          <button
            onClick={() => onSelectPaymentType('cash')}
            className="flex flex-col items-center justify-center p-8 bg-zinc-800 hover:bg-zinc-700 rounded-xl border-2 border-transparent hover:border-green-500 transition-all duration-200 group"
          >
            <svg 
              className="w-16 h-16 text-green-400 group-hover:text-green-300 mb-4 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span className="text-xl font-semibold text-white">Cash</span>
          </button>
        </div>
      </div>
    </div>
  );
}
