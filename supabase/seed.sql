-- Human Radar — Seed Data (50 dilemmas)
-- Bootstrap strategy: each dilemma is pre-seeded with synthetic vote distributions
-- to make the game immediately playable and interesting. As real votes come in,
-- the synthetic data gets diluted naturally.

insert into public.dilemmas (question, option_a, option_b, category, difficulty) values
-- Morality (10)
('You receive 1 million dollars but a random stranger somewhere in the world dies.', 'Accept', 'Refuse', 'morality', 1),
('You can save 5 strangers or 1 person you love. Who do you save?', '5 strangers', 'The person I love', 'morality', 2),
('You can eliminate all lies from the world forever.', 'Do it', 'Keep things as they are', 'morality', 2),
('You discover your best friend committed a serious crime years ago.', 'Turn them in', 'Keep the secret', 'morality', 2),
('You can read everyone''s true thoughts about you for one day.', 'Yes, I want to know', 'No, ignorance is better', 'morality', 1),
('A self-driving car must choose: save the passenger or save 3 pedestrians.', 'Save the passenger', 'Save the pedestrians', 'morality', 3),
('You can go back in time and prevent one tragedy, but it changes your current life entirely.', 'Go back', 'Stay in the present', 'morality', 2),
('Would you sacrifice your own happiness to guarantee happiness for your children?', 'Yes', 'No', 'morality', 1),
('Is it acceptable to steal food to feed a starving family?', 'Yes, always', 'No, never', 'morality', 1),
('You can make everyone on Earth feel empathy for 24 hours. Some systems may collapse.', 'Activate empathy', 'Too risky', 'morality', 3),

-- Money (10)
('1 million dollars today or 5,000 dollars per month forever?', '1 million now', '5,000/month forever', 'money', 1),
('Double your current salary but never get a raise again, or keep your career trajectory?', 'Double now, no raises', 'Keep trajectory', 'money', 2),
('Win 10 million but you can never work again, or keep working?', 'Take the 10 million', 'Keep working', 'money', 1),
('Free housing for life or 500,000 dollars cash?', 'Free housing', '500K cash', 'money', 1),
('You find a wallet with 10,000 dollars. No cameras. No ID inside.', 'Keep it', 'Turn it in', 'money', 1),
('Guaranteed 100K/year forever or a 10% chance at 50 million?', '100K guaranteed', 'Gamble for 50M', 'money', 2),
('Would you give up all social media for 1 million dollars?', 'Yes, take the money', 'No, keep social media', 'money', 1),
('Become the richest person alive but everyone knows all your secrets.', 'Accept', 'Decline', 'money', 2),
('Never pay taxes again or never pay rent/mortgage again?', 'No taxes', 'No rent', 'money', 1),
('You can pick: never worry about money, or never worry about health?', 'Money worries gone', 'Health worries gone', 'money', 2),

-- Relationships (10)
('Would you rather know every truth about your partner or remain blissfully unaware?', 'Know everything', 'Stay unaware', 'relationships', 1),
('Be loved by everyone superficially, or be deeply loved by just one person?', 'Loved by everyone', 'Deeply by one', 'relationships', 1),
('Your partner''s phone is unlocked in front of you. Do you look?', 'Yes', 'No', 'relationships', 1),
('Would you forgive a partner who cheated once?', 'Yes, I''d try', 'No, it''s over', 'relationships', 1),
('Live with your soulmate in poverty or live alone in luxury?', 'Soulmate in poverty', 'Alone in luxury', 'relationships', 2),
('You can only keep one: your closest friendship or your romantic relationship?', 'Friendship', 'Romance', 'relationships', 2),
('Would you want to know if your friends talk about you behind your back?', 'Yes', 'No', 'relationships', 1),
('Your ex wants to be best friends. Your new partner is uncomfortable.', 'Stay friends with ex', 'Cut ties with ex', 'relationships', 2),
('Would you rather have a huge wedding or elope and spend the money on travel?', 'Big wedding', 'Elope and travel', 'relationships', 1),
('You can guarantee your child will be happy but average, or brilliant but often unhappy.', 'Happy and average', 'Brilliant but unhappy', 'relationships', 3),

-- Philosophy (10)
('Would you want to know the exact date of your death?', 'Yes', 'No', 'philosophy', 1),
('If you could live forever, would you?', 'Yes', 'No', 'philosophy', 1),
('Lose all your memories or lose the ability to make new ones?', 'Lose past memories', 'Lose new memories', 'philosophy', 3),
('Is it better to have loved and lost, or never to have loved at all?', 'Loved and lost', 'Never loved', 'philosophy', 1),
('Would you choose to know the meaning of life if it might disappoint you?', 'Yes, tell me', 'No, let me wonder', 'philosophy', 2),
('Free will is an illusion. Does that change how you live?', 'Yes, it changes everything', 'No, I live the same', 'philosophy', 3),
('Would you press a button that makes everyone equal but removes all ambition?', 'Press it', 'Don''t press it', 'philosophy', 3),
('Is a comfortable lie better than a painful truth?', 'Comfortable lie', 'Painful truth', 'philosophy', 1),
('If you could restart your life from age 10 with your current knowledge, would you?', 'Yes, restart', 'No, keep going', 'philosophy', 1),
('Is it more important to be respected or to be liked?', 'Respected', 'Liked', 'philosophy', 1),

-- Psychology (10)
('Do you think most people are fundamentally good?', 'Yes', 'No', 'psychology', 1),
('You can erase one painful memory permanently.', 'Erase it', 'Keep it', 'psychology', 1),
('Would you take a pill that removes all anxiety but also all excitement?', 'Take the pill', 'No thanks', 'psychology', 2),
('Are you more afraid of failure or of never trying?', 'Failure', 'Never trying', 'psychology', 1),
('Would you choose to always be confident, even if sometimes you''re wrong?', 'Always confident', 'Prefer accurate self-doubt', 'psychology', 2),
('Is loneliness worse than being in a bad relationship?', 'Loneliness is worse', 'Bad relationship is worse', 'psychology', 2),
('If everyone anonymously rated your personality, would you want to see the results?', 'Yes', 'No', 'psychology', 1),
('You can become emotionally invulnerable but lose the ability to cry.', 'Become invulnerable', 'Keep my emotions', 'psychology', 2),
('Would you rather be extraordinarily talented at one thing or good at everything?', 'Extraordinary at one', 'Good at everything', 'psychology', 1),
('Do you think people can truly change, or do they just learn to hide who they are?', 'People can change', 'They just hide it', 'psychology', 2);

-- Pre-seed synthetic vote distributions for all dilemmas
-- This makes the game immediately playable with realistic-looking results
insert into public.dilemma_stats (dilemma_id, votes_a, votes_b, total_votes, majority_option)
select
  id,
  -- Generate plausible asymmetric distributions
  case
    when random() < 0.5 then floor(random() * 40 + 30)::int  -- 30-70 for option A
    else floor(random() * 30 + 10)::int                       -- 10-40 for option A
  end as votes_a,
  0 as votes_b,  -- placeholder, will be computed below
  0 as total_votes,
  'a' as majority_option
from public.dilemmas;

-- Now update with proper values
update public.dilemma_stats
set
  votes_b = floor(random() * 40 + 20)::int,
  total_votes = votes_a + floor(random() * 40 + 20)::int;

update public.dilemma_stats
set
  total_votes = votes_a + votes_b,
  majority_option = case when votes_a >= votes_b then 'a' else 'b' end;
