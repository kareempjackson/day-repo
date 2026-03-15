'use client';

import { useCallback } from 'react';

interface NumPadProps {
  onDigitPress: (digit: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  disabled?: boolean;
}

export function NumPad({ onDigitPress, onBackspace, onClear, disabled = false }: NumPadProps) {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const handlePress = useCallback((digit: string) => {
    if (!disabled) {
      onDigitPress(digit);
    }
  }, [disabled, onDigitPress]);

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {digits.map((digit) => (
        <button
          key={digit}
          onClick={() => handlePress(digit)}
          disabled={disabled}
          className="h-16 text-2xl font-semibold text-white bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-black/20"
        >
          {digit}
        </button>
      ))}
      
      {/* Clear button */}
      <button
        onClick={onClear}
        disabled={disabled}
        className="h-16 text-sm font-medium text-zinc-400 bg-zinc-800/50 hover:bg-zinc-700/50 active:bg-zinc-600/50 rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
      >
        Clear
      </button>
      
      {/* 0 button */}
      <button
        onClick={() => handlePress('0')}
        disabled={disabled}
        className="h-16 text-2xl font-semibold text-white bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-black/20"
      >
        0
      </button>
      
      {/* Backspace button */}
      <button
        onClick={onBackspace}
        disabled={disabled}
        className="h-16 flex items-center justify-center text-zinc-400 bg-zinc-800/50 hover:bg-zinc-700/50 active:bg-zinc-600/50 rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414-6.414a2 2 0 011.414-.586H19a2 2 0 012 2v10a2 2 0 01-2 2h-8.172a2 2 0 01-1.414-.586L3 12z"
          />
        </svg>
      </button>
    </div>
  );
}
