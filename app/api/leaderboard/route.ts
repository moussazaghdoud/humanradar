import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const players = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      score: true,
      accuracy: true,
      streak: true,
      level: true,
    },
    orderBy: { score: 'desc' },
    take: 50,
  });

  return NextResponse.json(players);
}
