'use client';

interface PinDotsProps {
  length: number;
  filled: number;
  shake?: boolean;
}

export function PinDots({ length, filled, shake = false }: PinDotsProps) {
  return (
    <div
      className={`flex items-center gap-4 ${
        shake ? 'animate-shake' : ''
      }`}
    >
      {Array.from({ length }, (_, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full transition-all duration-200 ${
            index < filled
              ? 'bg-amber-500 scale-110 shadow-lg shadow-amber-500/30'
              : 'bg-zinc-700 border-2 border-zinc-600'
          }`}
        />
      ))}
      
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
