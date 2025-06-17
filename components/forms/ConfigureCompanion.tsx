"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
import { MotionDiv } from "@/components/Motion";
import { containerVariants } from "@/lib/variants";
import {
  CreateCompanionPayload,
  CreateCompanionSchema,
} from "@/schemas/create-companion";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/lib/constants";
import { deleteCompanion, updateCompanion } from "@/server/db/companions";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useQueryClient } from "@tanstack/react-query";
import { AlertButton } from "../AlertButton";
import { useRouter } from "next/navigation";
const ConfigureCompanionForm = ({
  id,
  name,
  topic,
  subject,
  duration,
  style,
  voice,
}: {
  name: string;
  topic: string;
  subject: string;
  duration: number;
  style: string;
  voice: string;
  id: string;
}) => {
  const form = useForm<CreateCompanionPayload>({
    resolver: zodResolver(CreateCompanionSchema),
    defaultValues: {
      name,
      topic,
      subject,
      duration,
      style,
      voice,
    },
  });

  const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();
  const router = useRouter();
  const onSubmit = (values: CreateCompanionPayload) => {
    startTransition(() => {
      updateCompanion(id, values).then((data) => {
        if (data.error) {
          showErrorToast(data.error);
        } else {
          showSuccessToast(data.success);
          queryClient.setQueryData(
            ["companions", data.userId],
            (oldData: any) => {
              if (!oldData) {
                return oldData;
              }
              return {
                ...oldData,
                pages: oldData.pages.map((page: any) => {
                  return page.map((companion: any) => {
                    if (companion.id === id) {
                      return data.data;
                    }
                    return companion;
                  });
                }),
              };
            }
          );
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-w-[600px] w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-muted-foreground">
                Companion Name
              </FormLabel>

              <div className="relative flex items-center">
                <FormControl>
                  <Input
                    {...field}
                    className="py-5 placeholder:font-semibold px-4"
                    placeholder="John Doe"
                  />
                </FormControl>

                {form.formState.errors.topic && (
                  <CircleAlert
                    className="absolute right-3 stroke-destructive"
                    size={20}
                  />
                )}
              </div>
              {form.formState.errors.topic && (
                <MotionDiv
                  className="text-sm text-destructive font-serif"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {form.formState.errors.name?.message}
                </MotionDiv>
              )}
            </FormItem>
          )}
        />
        <div className="flex gap-2 flex-wrap">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-muted-foreground">Subject</FormLabel>
                <div className="relative flex items-center">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select the subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {subjects.map((subject) => (
                            <SelectItem value={subject} key={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-muted-foreground">Style</FormLabel>
                <div className="relative flex items-center">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={"formal"}>Formal</SelectItem>
                          <SelectItem value={"casual"}>Casual</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-muted-foreground">Voice</FormLabel>
                <div className="relative flex items-center">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select the subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={"female"}>Female</SelectItem>
                          <SelectItem value={"male"}>Male</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-muted-foreground">Topic</FormLabel>

              <div className="relative flex items-center">
                <FormControl>
                  <Textarea
                    {...field}
                    className="placeholder:font-semibold max-h-[200px]"
                    placeholder="E.g : Neural Networks and Artificial Intelligence "
                  />
                </FormControl>

                {form.formState.errors.topic && (
                  <CircleAlert
                    className="absolute right-3 stroke-destructive"
                    size={20}
                  />
                )}
              </div>
              {form.formState.errors.topic && (
                <MotionDiv
                  className="text-sm text-destructive font-serif"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {form.formState.errors.topic.message}
                </MotionDiv>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-muted-foreground">Duration</FormLabel>

              <div className="relative flex items-center">
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="15"
                    {...field}
                    className="input"
                  />
                </FormControl>

                {form.formState.errors.duration && (
                  <CircleAlert
                    className="absolute right-3 stroke-destructive"
                    size={20}
                  />
                )}
              </div>
              {form.formState.errors.duration && (
                <MotionDiv
                  className="text-sm text-destructive font-serif"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {form.formState.errors.duration.message}
                </MotionDiv>
              )}
            </FormItem>
          )}
        />
        <div className="w-full flex flex-col gap-2">
          <Button className="w-full" size={"lg"} disabled={isPending}>
            Update
          </Button>
          <AlertButton
            title="Are you sure?"
            description="This action cannot be undone."
            onConfirm={() => {
              startTransition(() => {
                deleteCompanion(id).then((data) => {
                  if (data.error) {
                    showErrorToast(data.error);
                  } else {
                    queryClient.setQueryData(
                      ["companions", data.userId],
                      (oldData: any) => {
                        if (!oldData) {
                          return oldData;
                        }
                        return {
                          ...oldData,
                          pages: oldData.pages.map((page: any) =>
                            page.filter((item: any) => item.id !== id)
                          ),
                        };
                      }
                    );
                    router.push("/companions");
                    showSuccessToast(data.success);
                  }
                });
              });
            }}
          >
            <Button disabled={isPending} variant="destructive">
              Delete Companion
            </Button>
          </AlertButton>
        </div>
      </form>
    </Form>
  );
};

export default ConfigureCompanionForm;
