import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { challengesTable } from './src/db/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function seedChallenges() {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const dayAfterTomorrow = new Date(now.getTime() + 24 * 2 * 60 * 60 * 1000);

  await db.insert(challengesTable).values([
    {
      // using the Telegram test user's id from getValidatedUser in auth.ts
      userId: 1129346198,
      title: 'Daily Coding Challenge',
      duration: 2, // days
      color: 'blue',
      regularity: 'everyday',
      daysOfWeek: null, // null because it's an everyday challenge
      taskDates: [tomorrow, dayAfterTomorrow],
      userCheckedDates: [],
    },
  ]);

  console.log('Seeded challenges successfully.');
}

seedChallenges()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error seeding challenges:', err);
    process.exit(1);
  });
