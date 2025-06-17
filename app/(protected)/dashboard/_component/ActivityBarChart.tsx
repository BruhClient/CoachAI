"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ActivityBarGraphProps {
  data: {
    day: string; // "YYYY-MM-DD"
    total_duration: number; // in seconds
  }[];
}

export const ActivityBarGraph = ({ data }: ActivityBarGraphProps) => {
  // Format labels to MM/DD
  const chartData = data.map((entry) => ({
    name: new Date(entry.day).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    duration: entry.total_duration, // convert to minutes
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Last 5 days</CardDescription>
      </CardHeader>
      <CardContent className="h-full flex items-center">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="duration" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
