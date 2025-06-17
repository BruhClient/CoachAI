"use client";

import { cn, getSubjectColor, getSubjectIcon } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

interface Item {
  name: string;
  description: string;
  subject: string;
  time: string;
}

let notifications = [
  {
    name: "Bill Nye , The Science Guy",
    description: "General Science",
    time: "15m ago",

    subject: "science",
  },
  {
    name: "David McCullough	",
    description: "U.S. history",
    time: "10m ago",

    subject: "history",
  },
  {
    name: "Neil deGrasse Tyson",
    description: "String Theory and the matters of the universe",
    time: "5m ago",

    subject: "maths",
  },
  {
    name: "Andrew Ng",
    description: "Neural Networks and AI",
    time: "2m ago",

    subject: "coding",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, subject, time }: Item) => {
  const Icon = getSubjectIcon(subject);
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[300px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          style={{ background: getSubjectColor(subject) }}
          className="p-2 rounded-lg"
        >
          <Icon size={18} />
        </div>

        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="font-semibold">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedSessionHistories({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[300px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
