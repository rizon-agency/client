import { api } from "@/api";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/ui/item";
import {
  ActivityIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CirclePauseIcon,
  ClockIcon,
  TimerIcon,
  type LucideIcon,
} from "lucide-react";

type QueueOverview = Awaited<
  ReturnType<typeof api.queue.overview>
>["queues"][number];

type CountKey = keyof QueueOverview["counts"];

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface StateConfig {
  key: CountKey;
  label: string;
  icon: LucideIcon;
  activeVariant: BadgeVariant;
}

const states: StateConfig[] = [
  {
    key: "waiting",
    label: "Waiting",
    icon: ClockIcon,
    activeVariant: "secondary",
  },
  {
    key: "active",
    label: "Active",
    icon: ActivityIcon,
    activeVariant: "default",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CircleCheckIcon,
    activeVariant: "secondary",
  },
  {
    key: "failed",
    label: "Failed",
    icon: CircleAlertIcon,
    activeVariant: "destructive",
  },
  {
    key: "delayed",
    label: "Delayed",
    icon: TimerIcon,
    activeVariant: "secondary",
  },
  {
    key: "paused",
    label: "Paused",
    icon: CirclePauseIcon,
    activeVariant: "secondary",
  },
];

interface QueueCountsProps {
  queues: QueueOverview[];
}

export const QueueCounts = ({ queues }: QueueCountsProps) => {
  return (
    <div className="space-y-4">
      {queues.map((queue) => (
        <Card key={queue.name}>
          <CardHeader>
            <CardTitle>{queue.name} queue</CardTitle>
            <CardDescription>Job counts by state</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {states.map(({ key, label, icon: Icon, activeVariant }) => {
                const value = queue.counts[key];

                return (
                  <Item key={key} variant="muted">
                    <ItemMedia variant="icon">
                      <Icon />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{label}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <Badge variant={value === 0 ? "outline" : activeVariant}>
                        {value}
                      </Badge>
                    </ItemActions>
                  </Item>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
