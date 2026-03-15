interface StickyHeaderProps {
  shopName: string;
  baristaName: string;
}

export function StickyHeader({ shopName, baristaName }: StickyHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-amber-500">{shopName}</h1>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-sm font-semibold">
          {baristaName.charAt(0)}
        </div>
        <span className="text-zinc-300">{baristaName}</span>
      </div>
    </header>
  );
}
