import { NextRequest, NextResponse } from 'next/server';

// Mock PIN validation - In production, this would call the actual backend API
const VALID_PINS: Record<string, { id: string; name: string; role: string }> = {
  '1234': { id: '1', name: 'John Barista', role: 'barista' },
  '5678': { id: '2', name: 'Jane Barista', role: 'barista' },
  '0000': { id: '3', name: 'Test User', role: 'barista' },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin } = body;

    if (!pin || typeof pin !== 'string' || pin.length !== 4) {
      return NextResponse.json(
        { error: 'Invalid PIN format' },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = VALID_PINS[pin];

    if (user) {
      // In production, this would be a proper JWT from the backend
      const mockToken = Buffer.from(
        JSON.stringify({ userId: user.id, exp: Date.now() + 8 * 60 * 60 * 1000 })
      ).toString('base64');

      return NextResponse.json({
        token: mockToken,
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid PIN. Please try again.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
