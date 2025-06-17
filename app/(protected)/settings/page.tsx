import UpdateUsernameButton from "@/components/forms/auth/EditUsername";
import PurchaseForm from "@/components/forms/PurchaseForm";
import { ModeToggle } from "@/components/ModeToggle";

import ProfilePicUploader from "@/components/ProfilePicUploader";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const SettingsPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <section className="w-full flex-wrap flex justify-between px-4 py-4 gap-4">
        <div>
          <div className="font-bold text-lg">Profile</div>
          <div className="font-serif text-sm text-muted-foreground">
            Set your account details
          </div>
        </div>

        <div className="flex gap-5 items-center w-full max-w-[600px]">
          <div className="space-y-2 w-full ">
            <UpdateUsernameButton
              initialUsername={session.user.name}
              userId={session.user.id}
            />
            <Input
              value={session.user.email!}
              disabled={true}
              className="w-full"
            />
          </div>

          <ProfilePicUploader
            initialImage={session.user.image}
            id={session.user.id}
          />
        </div>
      </section>

      <Separator />
      <section className="w-full px-4 py-4 space-y-3">
        <div>
          <div className="font-bold text-lg">Billing</div>
          <div className="font-serif text-muted-foreground text-sm">
            Pay for what you use
          </div>
        </div>

        <PurchaseForm initialSeconds={session.user.seconds} />
      </section>
      <Separator />
      <section className="w-full px-4 py-4 space-y-3 flex justify-between">
        <div>
          <div className="font-bold text-lg">Appearance</div>
          <div className="font-serif text-muted-foreground text-sm">
            Dark / Light Mode
          </div>
        </div>
        <ModeToggle />
      </section>
      <Separator />
    </div>
  );
};

export default SettingsPage;
