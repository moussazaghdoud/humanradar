import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dilemmas = [
  // Morality
  { question: 'You receive 1 million dollars but a random stranger somewhere in the world dies.', optionA: 'Accept', optionB: 'Refuse', category: 'morality', difficulty: 1 },
  { question: 'You can save 5 strangers or 1 person you love. Who do you save?', optionA: '5 strangers', optionB: 'The person I love', category: 'morality', difficulty: 2 },
  { question: 'You can eliminate all lies from the world forever.', optionA: 'Do it', optionB: 'Keep things as they are', category: 'morality', difficulty: 2 },
  { question: 'You discover your best friend committed a serious crime years ago.', optionA: 'Turn them in', optionB: 'Keep the secret', category: 'morality', difficulty: 2 },
  { question: 'You can read everyone\'s true thoughts about you for one day.', optionA: 'Yes, I want to know', optionB: 'No, ignorance is better', category: 'morality', difficulty: 1 },
  { question: 'A self-driving car must choose: save the passenger or save 3 pedestrians.', optionA: 'Save the passenger', optionB: 'Save the pedestrians', category: 'morality', difficulty: 3 },
  { question: 'You can go back in time and prevent one tragedy, but it changes your current life entirely.', optionA: 'Go back', optionB: 'Stay in the present', category: 'morality', difficulty: 2 },
  { question: 'Would you sacrifice your own happiness to guarantee happiness for your children?', optionA: 'Yes', optionB: 'No', category: 'morality', difficulty: 1 },
  { question: 'Is it acceptable to steal food to feed a starving family?', optionA: 'Yes, always', optionB: 'No, never', category: 'morality', difficulty: 1 },
  { question: 'You can make everyone on Earth feel empathy for 24 hours. Some systems may collapse.', optionA: 'Activate empathy', optionB: 'Too risky', category: 'morality', difficulty: 3 },

  // Money
  { question: '1 million dollars today or 5,000 dollars per month forever?', optionA: '1 million now', optionB: '5,000/month forever', category: 'money', difficulty: 1 },
  { question: 'Double your current salary but never get a raise again, or keep your career trajectory?', optionA: 'Double now, no raises', optionB: 'Keep trajectory', category: 'money', difficulty: 2 },
  { question: 'Win 10 million but you can never work again, or keep working?', optionA: 'Take the 10 million', optionB: 'Keep working', category: 'money', difficulty: 1 },
  { question: 'Free housing for life or 500,000 dollars cash?', optionA: 'Free housing', optionB: '500K cash', category: 'money', difficulty: 1 },
  { question: 'You find a wallet with 10,000 dollars. No cameras. No ID inside.', optionA: 'Keep it', optionB: 'Turn it in', category: 'money', difficulty: 1 },
  { question: 'Guaranteed 100K/year forever or a 10% chance at 50 million?', optionA: '100K guaranteed', optionB: 'Gamble for 50M', category: 'money', difficulty: 2 },
  { question: 'Would you give up all social media for 1 million dollars?', optionA: 'Yes, take the money', optionB: 'No, keep social media', category: 'money', difficulty: 1 },
  { question: 'Become the richest person alive but everyone knows all your secrets.', optionA: 'Accept', optionB: 'Decline', category: 'money', difficulty: 2 },
  { question: 'Never pay taxes again or never pay rent/mortgage again?', optionA: 'No taxes', optionB: 'No rent', category: 'money', difficulty: 1 },
  { question: 'You can pick: never worry about money, or never worry about health?', optionA: 'Money worries gone', optionB: 'Health worries gone', category: 'money', difficulty: 2 },

  // Relationships
  { question: 'Would you rather know every truth about your partner or remain blissfully unaware?', optionA: 'Know everything', optionB: 'Stay unaware', category: 'relationships', difficulty: 1 },
  { question: 'Be loved by everyone superficially, or be deeply loved by just one person?', optionA: 'Loved by everyone', optionB: 'Deeply by one', category: 'relationships', difficulty: 1 },
  { question: 'Your partner\'s phone is unlocked in front of you. Do you look?', optionA: 'Yes', optionB: 'No', category: 'relationships', difficulty: 1 },
  { question: 'Would you forgive a partner who cheated once?', optionA: 'Yes, I\'d try', optionB: 'No, it\'s over', category: 'relationships', difficulty: 1 },
  { question: 'Live with your soulmate in poverty or live alone in luxury?', optionA: 'Soulmate in poverty', optionB: 'Alone in luxury', category: 'relationships', difficulty: 2 },
  { question: 'You can only keep one: your closest friendship or your romantic relationship?', optionA: 'Friendship', optionB: 'Romance', category: 'relationships', difficulty: 2 },
  { question: 'Would you want to know if your friends talk about you behind your back?', optionA: 'Yes', optionB: 'No', category: 'relationships', difficulty: 1 },
  { question: 'Your ex wants to be best friends. Your new partner is uncomfortable.', optionA: 'Stay friends with ex', optionB: 'Cut ties with ex', category: 'relationships', difficulty: 2 },
  { question: 'Would you rather have a huge wedding or elope and spend the money on travel?', optionA: 'Big wedding', optionB: 'Elope and travel', category: 'relationships', difficulty: 1 },
  { question: 'You can guarantee your child will be happy but average, or brilliant but often unhappy.', optionA: 'Happy and average', optionB: 'Brilliant but unhappy', category: 'relationships', difficulty: 3 },

  // Philosophy
  { question: 'Would you want to know the exact date of your death?', optionA: 'Yes', optionB: 'No', category: 'philosophy', difficulty: 1 },
  { question: 'If you could live forever, would you?', optionA: 'Yes', optionB: 'No', category: 'philosophy', difficulty: 1 },
  { question: 'Lose all your memories or lose the ability to make new ones?', optionA: 'Lose past memories', optionB: 'Lose new memories', category: 'philosophy', difficulty: 3 },
  { question: 'Is it better to have loved and lost, or never to have loved at all?', optionA: 'Loved and lost', optionB: 'Never loved', category: 'philosophy', difficulty: 1 },
  { question: 'Would you choose to know the meaning of life if it might disappoint you?', optionA: 'Yes, tell me', optionB: 'No, let me wonder', category: 'philosophy', difficulty: 2 },
  { question: 'Free will is an illusion. Does that change how you live?', optionA: 'Yes, it changes everything', optionB: 'No, I live the same', category: 'philosophy', difficulty: 3 },
  { question: 'Would you press a button that makes everyone equal but removes all ambition?', optionA: 'Press it', optionB: 'Don\'t press it', category: 'philosophy', difficulty: 3 },
  { question: 'Is a comfortable lie better than a painful truth?', optionA: 'Comfortable lie', optionB: 'Painful truth', category: 'philosophy', difficulty: 1 },
  { question: 'If you could restart your life from age 10 with your current knowledge, would you?', optionA: 'Yes, restart', optionB: 'No, keep going', category: 'philosophy', difficulty: 1 },
  { question: 'Is it more important to be respected or to be liked?', optionA: 'Respected', optionB: 'Liked', category: 'philosophy', difficulty: 1 },

  // Psychology
  { question: 'Do you think most people are fundamentally good?', optionA: 'Yes', optionB: 'No', category: 'psychology', difficulty: 1 },
  { question: 'You can erase one painful memory permanently.', optionA: 'Erase it', optionB: 'Keep it', category: 'psychology', difficulty: 1 },
  { question: 'Would you take a pill that removes all anxiety but also all excitement?', optionA: 'Take the pill', optionB: 'No thanks', category: 'psychology', difficulty: 2 },
  { question: 'Are you more afraid of failure or of never trying?', optionA: 'Failure', optionB: 'Never trying', category: 'psychology', difficulty: 1 },
  { question: 'Would you choose to always be confident, even if sometimes you\'re wrong?', optionA: 'Always confident', optionB: 'Prefer accurate self-doubt', category: 'psychology', difficulty: 2 },
  { question: 'Is loneliness worse than being in a bad relationship?', optionA: 'Loneliness is worse', optionB: 'Bad relationship is worse', category: 'psychology', difficulty: 2 },
  { question: 'If everyone anonymously rated your personality, would you want to see the results?', optionA: 'Yes', optionB: 'No', category: 'psychology', difficulty: 1 },
  { question: 'You can become emotionally invulnerable but lose the ability to cry.', optionA: 'Become invulnerable', optionB: 'Keep my emotions', category: 'psychology', difficulty: 2 },
  { question: 'Would you rather be extraordinarily talented at one thing or good at everything?', optionA: 'Extraordinary at one', optionB: 'Good at everything', category: 'psychology', difficulty: 1 },
  { question: 'Do you think people can truly change, or do they just learn to hide who they are?', optionA: 'People can change', optionB: 'They just hide it', category: 'psychology', difficulty: 2 },
];

async function main() {
  console.log('Seeding dilemmas...');

  for (const d of dilemmas) {
    const dilemma = await prisma.dilemma.create({ data: d });

    // Pre-seed synthetic vote distributions so the game is immediately playable
    const votesA = Math.floor(Math.random() * 40) + 20;
    const votesB = Math.floor(Math.random() * 40) + 20;
    await prisma.dilemmaStats.create({
      data: {
        dilemmaId: dilemma.id,
        votesA,
        votesB,
        totalVotes: votesA + votesB,
        majorityOption: votesA >= votesB ? 'a' : 'b',
      },
    });
  }

  console.log(`Seeded ${dilemmas.length} dilemmas with synthetic vote distributions.`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
