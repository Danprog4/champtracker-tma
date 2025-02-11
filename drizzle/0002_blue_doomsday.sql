ALTER TABLE "challenges" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "challenges" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "challenges" ALTER COLUMN "challenge_start_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "premium_until" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "onBoarding" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "taskDates" varchar(255)[] NOT NULL;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "userCheckedDates" varchar(255)[];--> statement-breakpoint
ALTER TABLE "challenges" DROP COLUMN "task_dates";--> statement-breakpoint
ALTER TABLE "challenges" DROP COLUMN "user_checked_dates";