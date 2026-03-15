'use client';

interface ChargeButtonProps {
  amount: number;
  onCharge: () => void;
  disabled?: boolean;
}

export function ChargeButton({ amount, onCharge, disabled = false }: ChargeButtonProps) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);

  const isDisabled = disabled || amount <= 0;

  return (
    <button
      onClick={onCharge}
      disabled={isDisabled}
      className={`
        w-full py-4 px-6 rounded-xl font-bold text-xl transition-all duration-200
        ${isDisabled 
          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
          : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/25 active:scale-[0.98]'
        }
      `}
    >
      {amount > 0 ? `Charge ${formattedAmount}` : 'Add items to charge'}
    </button>
  );
}
