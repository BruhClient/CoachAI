"use client";
import ConfigureCompanionForm from "@/components/forms/ConfigureCompanion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { companions } from "@/db/schema";
import { format } from "date-fns";
import { InferModel } from "drizzle-orm";
import { Edit2 } from "lucide-react";
import React from "react";

const ConfigureCompanionButton = ({
  companion,
}: {
  companion: InferModel<typeof companions>;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Edit2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure Companion</DialogTitle>
          <DialogDescription>
            {format(companion.createdAt, "dd MMM yyyy")}
          </DialogDescription>
        </DialogHeader>

        <ConfigureCompanionForm
          name={companion.name}
          topic={companion.topic}
          subject={companion.subject}
          style={companion.style}
          voice={companion.voice}
          duration={companion.duration}
          id={companion.id}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ConfigureCompanionButton;
