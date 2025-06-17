ALTER TABLE "sessionHistories" DROP CONSTRAINT "sessionHistories_companionId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "sessionHistories" ADD CONSTRAINT "sessionHistories_companionId_companions_id_fk" FOREIGN KEY ("companionId") REFERENCES "public"."companions"("id") ON DELETE cascade ON UPDATE no action;