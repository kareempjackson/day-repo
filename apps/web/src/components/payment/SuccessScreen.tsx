'use client';

import { useEffect, useState } from 'react';

interface SuccessScreenProps {
  isOpen: boolean;
  onNewOrder: () => void;
  autoDismissSeconds?: number;
}

export function SuccessScreen({ isOpen, onNewOrder, autoDismissSeconds = 3 }: SuccessScreenProps) {
  const [countdown, setCountdown] = useState(autoDismissSeconds);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(autoDismissSeconds);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onNewOrder();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, autoDismissSeconds, onNewOrder]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950">
      <div className="text-center px-8">
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center animate-scale-in">
          <svg 
            className="w-16 h-16 text-green-400 animate-draw-check" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-zinc-400 text-lg mb-8">Thank you for your order</p>
        
        <button
          onClick={onNewOrder}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-xl font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/25"
        >
          New Order
        </button>
        
        <p className="mt-6 text-zinc-500 text-sm">
          Starting new order in {countdown} second{countdown !== 1 ? 's' : ''}...
        </p>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes draw-check {
          0% {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }
        
        .animate-draw-check {
          animation: draw-check 0.5s ease-out 0.2s forwards;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
      `}</style>
    </div>
  );
}
