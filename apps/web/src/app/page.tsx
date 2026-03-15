import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Coffee Shop POS</h1>
        <p className="text-zinc-400 mb-8">Point of Sale System</p>
        <Link 
          href="/order"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-colors"
        >
          Start New Order
        </Link>
      </div>
    </main>
  );
}
