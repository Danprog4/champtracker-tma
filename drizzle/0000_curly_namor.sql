CREATE TYPE "public"."regularity_enum" AS ENUM('everyday', 'fewTimesAWeek');--> statement-breakpoint
CREATE TABLE "users" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"username" varchar(255),
	"isPremium" boolean NOT NULL,
	"language" varchar(255) NOT NULL,
	"photoUrl" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "challenges" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" bigint NOT NULL,
	"title" varchar(255) NOT NULL,
	"duration" integer NOT NULL,
	"color" varchar(255) NOT NULL,
	"createdAt" varchar(255) NOT NULL,
	"challengeStartAt" varchar(255) NOT NULL,
	"regularity" "regularity_enum" NOT NULL,
	"days_of_week" integer[],
	"taskDates" varchar(255)[] NOT NULL,
	"userCheckedDates" varchar(255)[]
);
--> statement-breakpoint
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;