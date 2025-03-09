# Champtracker

@Champtracker in Telgram is a modern habit-tracking and challenge management application that helps users build discipline and track their progress through customizable challenges.

## 🚀 Features

- **Challenge Creation**: Create personalized challenges with custom titles, durations, and colors
- **Flexible Scheduling**: Set challenges to occur daily or on specific days of the week
- **Progress Tracking**: Track your daily progress and visualize your achievements
- **Premium Features**: Unlock unlimited challenges, earn tokens, and access detailed statistics
- **Telegram Integration**: Seamless integration with Telegram for authentication and payments

## 🛠️ Tech Stack

- **Frontend**: Next.js, React 19, TanStack Router, TailwindCSS
- **Backend**: Hono API server with REST endpoints
- **State Management**: Zustand, TanStack Query (React Query)
- **UI Components**: Radix UI, Lucide React icons, Embla Carousel
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Telegram Auth via @telegram-apps/sdk
- **Payments**: Telegram Payments API
- **Bot Framework**: Grammy (Telegram Bot SDK)
- **Date Handling**: date-fns, dayjs
- **Deployment**: Vercel
- **Development**: TypeScript, ESLint, Vite

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL
- Telegram Bot Token (for bot functionality)
- Bun runtime (recommended)

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/champtracker.git
   cd champtracker
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/champtracker
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   ```

4. Set up the database:

   ```bash
   npm run db:push
   # or
   bun run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

## 📊 Database Management

- **Push Schema Changes**: `npm run db:push`
- **Generate Migrations**: `npm run db:generate`
- **Apply Migrations**: `npm run db:migrate`
- **Open Drizzle Studio**: `npm run db:studio`
- **Recreate Database**: `npm run db:recreate`

## 🤖 Bot Development

To run the Telegram bot in development mode:

```bash
npm run bot
# or
bun run bot
```

## 🏗️ Project Structure

```
champtracker/
├── src/                    # Source code
│   ├── api/                # API endpoints
│   │   └── schema/         # Database schema definitions
│   ├── components/         # React components
│   │   └── ui/             # Reusable UI components
│   ├── server.ts           # Hono server implementation
│   ├── bot.ts              # Telegram bot implementation
│   ├── db/                 # Database models and repositories
│   │   ├── repo/           # Database operations
│   ├── hooks/              # Custom React hooks
│   ├── stores/             # Zustand stores
│   └── lib/                # Utility functions and shared libraries
├── public/                 # Static assets
├── drizzle/                # Drizzle migrations
└── supabase/               # Supabase configuration
```

## 💎 Premium Features

- **Unlimited Challenges**: Create and track as many challenges as you want
- **Token System**: Earn tokens for completed challenges to extend your premium subscription
- **Detailed Statistics**: Get insights into your progress and achievements (coming soon)

## 🔄 Deployment

The application is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and deploy.

## 📱 Mobile Support

ChampTracker is designed to be fully responsive and works well on mobile devices, with special optimization for the Telegram Mini App environment.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For any questions or support, please contact me in Telegram: @danikpavlovski or in Gmail: champtracker3@gmail.com.

---

Happy tracking! 🏆
