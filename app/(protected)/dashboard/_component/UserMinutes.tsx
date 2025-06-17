import { Card, CardContent } from "@/components/ui/card";
import { formatSecondsToMinutes } from "@/lib/utils";
import { User2 } from "lucide-react";
import React from "react";

const UserMinutes = ({ userMinutes }: { userMinutes: number }) => {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="text-muted-foreground text-sm flex gap-2 items-center">
          <User2 size={15} />
          Your Minutes
        </div>
        <div className="flex gap-4 items-center">
          <div className="font-bold text-2xl">
            {formatSecondsToMinutes(userMinutes)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserMinutes;
