import { NextResponse } from 'next/server';

const waitlist: Array<{ email: string; createdAt: string }> = [];

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };

  if (!body.email) {
    return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
  }

  waitlist.push({
    email: body.email,
    createdAt: new Date().toISOString()
  });

  return NextResponse.json({ success: true, count: waitlist.length }, { status: 201 });
}
