import { NextRequest, NextResponse } from 'next/server';

// Mock implementation - replace with actual backend integration
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { type } = body;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In production, this would:
  // 1. For cash: Mark order as paid with cash type
  // 2. For card: Create a Stripe PaymentIntent and return the client secret

  if (type === 'card') {
    // Mock client secret - in production, create a real PaymentIntent
    return NextResponse.json({
      success: true,
      transactionId: `pi_mock_${id}_${Date.now()}`,
    });
  }

  return NextResponse.json({
    success: true,
    transactionId: `cash_${id}_${Date.now()}`,
  });
}
