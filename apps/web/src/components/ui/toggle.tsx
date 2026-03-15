'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className = '', label, id, checked, onChange, ...props }, ref) => {
    const toggleId = id || label?.toLowerCase().replace(/\s/g, '-');
    
    return (
      <label htmlFor={toggleId} className={`inline-flex items-center cursor-pointer ${className}`}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={toggleId}
            className="sr-only peer"
            checked={checked}
            onChange={onChange}
            {...props}
          />
          <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-amber-600 transition-colors" />
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
        </div>
        {label && (
          <span className="ml-3 text-sm font-medium text-zinc-300">{label}</span>
        )}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';

export { Toggle };