import { NextResponse } from 'next/server';

// Mock implementation - replace with actual Stripe Terminal connection token generation
export async function POST() {
  // In production, use Stripe SDK to create a connection token:
  // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  // const connectionToken = await stripe.terminal.connectionTokens.create();
  // return NextResponse.json({ secret: connectionToken.secret });

  // Mock token for development
  return NextResponse.json({
    secret: `pst_test_mock_${Date.now()}`,
  });
}
