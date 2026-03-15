import { DailyStats } from '@/types/admin';

interface StatsOverviewProps {
  stats: DailyStats;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      label: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      highlight: true,
    },
    {
      label: 'Total Orders',
      value: stats.orderCount.toString(),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      label: 'Card Payments',
      value: formatCurrency(stats.cardPayments),
      subtext: `${stats.cardOrderCount} orders`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      label: 'Cash Payments',
      value: formatCurrency(stats.cashPayments),
      subtext: `${stats.cashOrderCount} orders`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl p-6 transition-all ${
            card.highlight
              ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
              : 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`${
              card.highlight
                ? 'text-amber-100'
                : 'text-zinc-400'
            }`}>
              {card.icon}
            </div>
            <span className={`text-sm font-medium ${
              card.highlight ? 'text-amber-100' : 'text-zinc-400'
            }`}>
              {card.label}
            </span>
          </div>
          <p className={`text-3xl font-bold ${
            card.highlight ? 'text-white' : 'text-zinc-100'
          }`}>
            {card.value}
          </p>
          {card.subtext && (
            <p className="text-sm text-zinc-500 mt-1">{card.subtext}</p>
          )}
        </div>
      ))}
    </div>
  );
}
