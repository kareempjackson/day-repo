'use client';

import { PaymentType } from '@/types/order';

interface ProcessingModalProps {
  isOpen: boolean;
  paymentType: PaymentType;
  error?: string;
  onRetry: () => void;
  onCancel: () => void;
}

export function ProcessingModal({ isOpen, paymentType, error, onRetry, onCancel }: ProcessingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div 
        className="relative z-10 w-full max-w-md mx-4 bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800"
        role="dialog"
        aria-modal="true"
        aria-live="polite"
      >
        {error ? (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Payment Failed</h2>
            <p className="text-zinc-400 mb-6">{error}</p>
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onRetry}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-zinc-700"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {paymentType === 'card' ? 'Waiting for Card' : 'Processing Payment'}
            </h2>
            <p className="text-zinc-400">
              {paymentType === 'card' 
                ? 'Please tap, insert, or swipe card on the reader' 
                : 'Please wait...'}
            </p>
            {paymentType === 'card' && (
              <button
                onClick={onCancel}
                className="mt-6 px-6 py-2 text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
