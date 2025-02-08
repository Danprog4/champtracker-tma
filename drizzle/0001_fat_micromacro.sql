ALTER TABLE "challenges" ADD COLUMN "created_at" date NOT NULL;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "challenge_start_at" date NOT NULL;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "task_dates" date[] NOT NULL;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "user_checked_dates" date[];--> statement-breakpoint
ALTER TABLE "challenges" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "challenges" DROP COLUMN "challengeStartAt";--> statement-breakpoint
ALTER TABLE "challenges" DROP COLUMN "taskDates";--> statement-breakpoint
ALTER TABLE "challenges" DROP COLUMN "userCheckedDates";