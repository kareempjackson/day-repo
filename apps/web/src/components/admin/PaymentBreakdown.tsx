import { DailyStats } from '@/types/admin';

interface PaymentBreakdownProps {
  stats: DailyStats;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function PaymentBreakdown({ stats }: PaymentBreakdownProps) {
  const total = stats.cardPayments + stats.cashPayments;
  const cardPercentage = total > 0 ? (stats.cardPayments / total) * 100 : 0;
  const cashPercentage = total > 0 ? (stats.cashPayments / total) * 100 : 0;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-zinc-100 mb-6">Payment Breakdown</h2>
      
      <div className="space-y-6">
        {/* Visual Bar Chart */}
        <div className="space-y-4">
          {/* Card payments bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                <span className="text-zinc-300">Card</span>
              </div>
              <span className="text-zinc-400">{cardPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-8 bg-zinc-800 rounded-lg overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${Math.max(cardPercentage, 5)}%` }}
              >
                {cardPercentage > 20 && (
                  <span className="text-xs font-medium text-white">
                    {formatCurrency(stats.cardPayments)}
                  </span>
                )}
              </div>
            </div>
            {cardPercentage <= 20 && (
              <p className="text-sm text-zinc-400">{formatCurrency(stats.cardPayments)}</p>
            )}
          </div>

          {/* Cash payments bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
                <span className="text-zinc-300">Cash</span>
              </div>
              <span className="text-zinc-400">{cashPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-8 bg-zinc-800 rounded-lg overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${Math.max(cashPercentage, 5)}%` }}
              >
                {cashPercentage > 20 && (
                  <span className="text-xs font-medium text-white">
                    {formatCurrency(stats.cashPayments)}
                  </span>
                )}
              </div>
            </div>
            {cashPercentage <= 20 && (
              <p className="text-sm text-zinc-400">{formatCurrency(stats.cashPayments)}</p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="pt-4 border-t border-zinc-800">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-400">{stats.cardOrderCount}</p>
              <p className="text-xs text-zinc-500 mt-1">Card Orders</p>
            </div>
            <div className="text-center p-4 bg-zinc-800/50 rounded-lg">
              <p className="text-2xl font-bold text-emerald-400">{stats.cashOrderCount}</p>
              <p className="text-xs text-zinc-500 mt-1">Cash Orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
