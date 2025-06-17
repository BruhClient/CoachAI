ALTER TABLE "companions" ALTER COLUMN "style" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "companions" ADD COLUMN "voice" text NOT NULL;