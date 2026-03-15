'use client';

import { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDisplayDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });
  };

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    const today = new Date();
    if (newDate <= today) {
      onDateChange(newDate);
    }
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value + 'T12:00:00');
    if (!isNaN(date.getTime())) {
      onDateChange(date);
      setIsOpen(false);
    }
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div ref={containerRef} className="relative flex items-center gap-1">
      <button
        onClick={handlePrevDay}
        className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
        aria-label="Previous day"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors min-w-[140px] justify-center"
      >
        <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-sm font-medium text-zinc-100">
          {formatDisplayDate(selectedDate)}
        </span>
      </button>

      <button
        onClick={handleNextDay}
        disabled={isToday}
        className={`p-2 rounded-lg transition-colors ${
          isToday
            ? 'text-zinc-600 cursor-not-allowed'
            : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
        }`}
        aria-label="Next day"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 p-4 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl z-20">
          <label className="block text-sm text-zinc-400 mb-2">Select date</label>
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            max={new Date().toISOString().split('T')[0]}
            onChange={handleDateInput}
            className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
          />
          <div className="mt-3 pt-3 border-t border-zinc-700">
            <button
              onClick={() => {
                onDateChange(new Date());
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-sm text-amber-400 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              Go to Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
