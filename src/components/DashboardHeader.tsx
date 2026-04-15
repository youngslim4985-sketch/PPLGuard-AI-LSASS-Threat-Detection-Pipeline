import { Shield, Activity, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            <Shield className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-100">PPLGuard AI</h1>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">LSASS Protection Pipeline</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-zinc-400">SYSTEM ACTIVE</span>
          </div>
          <Badge variant="outline" className="font-mono border-zinc-700 text-zinc-400">
            v1.0.4-PROD
          </Badge>
        </div>
      </div>
    </header>
  );
}
