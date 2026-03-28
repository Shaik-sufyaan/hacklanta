import { NextResponse } from 'next/server';

const bookings: Array<{ name: string; email: string; createdAt: string }> = [];

export async function POST(request: Request) {
  const body = (await request.json()) as { name?: string; email?: string };

  if (!body.name || !body.email) {
    return NextResponse.json({ message: 'Name and email are required.' }, { status: 400 });
  }

  bookings.push({
    name: body.name,
    email: body.email,
    createdAt: new Date().toISOString()
  });

  return NextResponse.json({ success: true, count: bookings.length }, { status: 201 });
}
