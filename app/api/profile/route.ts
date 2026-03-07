import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const playerId = req.headers.get('x-player-id');
  if (!playerId) return NextResponse.json({ error: 'Missing player ID' }, { status: 400 });

  let user = await prisma.user.findUnique({
    where: { id: playerId },
    include: { badges: { orderBy: { earnedAt: 'desc' } } },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { id: playerId, username: `Player_${playerId.slice(0, 6)}` },
      include: { badges: { orderBy: { earnedAt: 'desc' } } },
    });
  }

  return NextResponse.json(user);
}
