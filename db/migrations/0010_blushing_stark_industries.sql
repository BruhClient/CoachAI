CREATE TABLE "sessionHistories" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"messages" jsonb NOT NULL,
	"companionId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessionHistories" ADD CONSTRAINT "sessionHistories_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessionHistories" ADD CONSTRAINT "sessionHistories_companionId_user_id_fk" FOREIGN KEY ("companionId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;