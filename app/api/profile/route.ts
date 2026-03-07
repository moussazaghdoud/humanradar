import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { badges: { orderBy: { earnedAt: 'desc' } } },
  });

  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { password: _, ...profile } = user;
  return NextResponse.json(profile);
}
