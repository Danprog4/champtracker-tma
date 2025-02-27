ALTER TABLE "users" ADD COLUMN "tokens" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_active_date" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "completed_challenges_count" integer DEFAULT 0 NOT NULL;