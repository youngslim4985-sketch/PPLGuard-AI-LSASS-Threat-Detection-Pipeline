import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ShieldAlert, Activity, Database } from "lucide-react";

interface StatsProps {
  stats: {
    total: number;
    anomalies: number;
    suspicious: number;
  };
}

export function StatsGrid({ stats }: StatsProps) {
  const items = [
    {
      label: "Total Events",
      value: stats.total,
      icon: Activity,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Anomalies Detected",
      value: stats.anomalies,
      icon: ShieldAlert,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      label: "Suspicious Activity",
      value: stats.suspicious,
      icon: AlertTriangle,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Data Throughput",
      value: "1.2 GB/s",
      icon: Database,
      color: "text-zinc-400",
      bg: "bg-zinc-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {items.map((item, i) => (
        <Card key={i} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${item.bg}`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{item.label}</p>
              <p className="text-2xl font-bold text-zinc-100">{item.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
