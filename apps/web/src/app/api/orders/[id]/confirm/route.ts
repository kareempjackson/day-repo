import { NextRequest, NextResponse } from 'next/server';

// Mock implementation - replace with actual backend integration
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // In production, this would mark the order as confirmed
  return NextResponse.json({
    success: true,
    orderId: id,
    confirmedAt: new Date().toISOString(),
  });
}
