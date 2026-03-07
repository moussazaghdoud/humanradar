import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { excludeIds = [] } = await req.json().catch(() => ({ excludeIds: [] }));

    const where: Record<string, unknown> = { status: 'active' };
    if (excludeIds.length > 0) {
      where.id = { notIn: excludeIds };
    }

    const count = await prisma.dilemma.count({ where });
    if (count === 0) {
      delete where.id;
      const total = await prisma.dilemma.count({ where });
      if (total === 0) return NextResponse.json(null);
      const skip = Math.floor(Math.random() * total);
      const dilemma = await prisma.dilemma.findFirst({ where, skip });
      return NextResponse.json(dilemma);
    }

    const skip = Math.floor(Math.random() * count);
    const dilemma = await prisma.dilemma.findFirst({ where, skip });
    return NextResponse.json(dilemma);
  } catch (e) {
    console.error('Dilemma fetch error:', e);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
