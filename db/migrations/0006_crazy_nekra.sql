CREATE TYPE "public"."companion_style" AS ENUM('formal', 'casual');--> statement-breakpoint
CREATE TABLE "companions" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"subject" text NOT NULL,
	"topic" text NOT NULL,
	"style" "companion_style" NOT NULL,
	"duration" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "companions" ADD CONSTRAINT "companions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;