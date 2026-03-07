import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
import { calculateLevel, calculateAccuracy, checkNewBadges } from '@/lib/game/engine';

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const { dilemmaId, predictedOption } = await req.json();
  if (!dilemmaId || !['a', 'b'].includes(predictedOption)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  // Get or create stats
  let stats = await prisma.dilemmaStats.findUnique({ where: { dilemmaId } });
  const addA = predictedOption === 'a' ? 1 : 0;
  const addB = predictedOption === 'b' ? 1 : 0;

  if (stats) {
    stats = await prisma.dilemmaStats.update({
      where: { dilemmaId },
      data: {
        votesA: { increment: addA },
        votesB: { increment: addB },
        totalVotes: { increment: 1 },
      },
    });
    // Recompute majority
    stats = await prisma.dilemmaStats.update({
      where: { dilemmaId },
      data: { majorityOption: stats.votesA >= stats.votesB ? 'a' : 'b' },
    });
  } else {
    stats = await prisma.dilemmaStats.create({
      data: {
        dilemmaId,
        votesA: addA,
        votesB: addB,
        totalVotes: 1,
        majorityOption: predictedOption,
      },
    });
  }

  const majorityOption = stats.majorityOption as 'a' | 'b';
  const isCorrect = predictedOption === majorityOption;

  // Save vote
  await prisma.vote.create({
    data: {
      userId: user.id,
      dilemmaId,
      predictedOption,
      actualMajority: majorityOption,
      isCorrect,
    },
  });

  // Update user stats
  const newStreak = isCorrect ? user.streak + 1 : 0;
  const streakBonus = isCorrect && newStreak > 0 && newStreak % 3 === 0;
  const pointsEarned = isCorrect ? 10 + (streakBonus ? 5 : 0) : 0;
  const newScore = user.score + pointsEarned;

  const totalVotes = await prisma.vote.count({ where: { userId: user.id } });
  const correctVotes = await prisma.vote.count({ where: { userId: user.id, isCorrect: true } });
  const newAccuracy = calculateAccuracy(correctVotes, totalVotes);
  const newLevel = calculateLevel(newScore);

  await prisma.user.update({
    where: { id: user.id },
    data: { score: newScore, streak: newStreak, accuracy: newAccuracy, level: newLevel },
  });

  // Check badges
  const existingBadges = await prisma.badge.findMany({ where: { userId: user.id } });
  const existingNames = existingBadges.map(b => b.badgeName);
  const newBadges = checkNewBadges(correctVotes, totalVotes, newStreak, newScore, existingNames);

  for (const badge of newBadges) {
    await prisma.badge.create({ data: { userId: user.id, badgeName: badge } });
  }

  const percentA = stats.totalVotes > 0 ? Math.round((stats.votesA / stats.totalVotes) * 100) : 50;
  const percentB = stats.totalVotes > 0 ? Math.round((stats.votesB / stats.totalVotes) * 100) : 50;

  return NextResponse.json({
    isCorrect,
    predictedOption,
    majorityOption,
    percentA,
    percentB,
    pointsEarned,
    newStreak,
    streakBonus: !!streakBonus,
    newBadges,
    user: { score: newScore, streak: newStreak, accuracy: newAccuracy, level: newLevel },
  });
}
