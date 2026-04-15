import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { BrainCircuit, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  process: string;
  target: string;
  action: string;
  privilege: string;
  timestamp: string;
  riskScore: number;
  status: "normal" | "suspicious" | "anomaly";
}

interface EventFeedProps {
  events: Event[];
  onAnalyze: (event: Event) => void;
}

export function EventFeed({ events, onAnalyze }: EventFeedProps) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
        <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-zinc-400" />
          REAL-TIME EVENT STREAM
        </h2>
        <Badge variant="outline" className="font-mono text-[10px] border-zinc-700">
          POLLING ACTIVE
        </Badge>
      </div>
      
      <ScrollArea className="h-[500px]">
        <Table>
          <TableHeader className="bg-zinc-950/50 sticky top-0 z-10">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Timestamp</TableHead>
              <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Process</TableHead>
              <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Target</TableHead>
              <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Action</TableHead>
              <TableHead className="text-zinc-500 font-mono text-[10px] uppercase">Risk</TableHead>
              <TableHead className="text-zinc-500 font-mono text-[10px] uppercase text-right">Analysis</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                <TableCell className="font-mono text-xs text-zinc-400">
                  {format(new Date(event.timestamp), "HH:mm:ss.SSS")}
                </TableCell>
                <TableCell className="font-medium text-zinc-200">{event.process}</TableCell>
                <TableCell className="text-zinc-400">{event.target}</TableCell>
                <TableCell>
                  <code className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">
                    {event.action}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          event.riskScore > 80 ? "bg-red-500" : 
                          event.riskScore > 50 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${event.riskScore}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-bold ${
                      event.riskScore > 80 ? "text-red-400" : 
                      event.riskScore > 50 ? "text-amber-400" : "text-emerald-400"
                    }`}>
                      {event.riskScore}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 gap-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                    onClick={() => onAnalyze(event)}
                  >
                    <BrainCircuit className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold">AI Analyze</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
