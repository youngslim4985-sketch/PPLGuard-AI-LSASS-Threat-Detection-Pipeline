import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, ShieldCheck, ShieldX, Info } from "lucide-react";

interface AnalysisResult {
  threatLevel: string;
  reasoning: string;
  recommendation: string;
}

interface AIAnalysisDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  analysis: AnalysisResult | null;
  loading: boolean;
}

export function AIAnalysisDialog({ isOpen, onClose, event, analysis, loading }: AIAnalysisDialogProps) {
  if (!event) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100 max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-purple-400" />
            </div>
            Gemini AI Threat Analysis
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Deep inspection of process behavior and LSASS access patterns.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6 my-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <div>
              <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1">Process</p>
              <p className="font-mono text-sm">{event.process}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1">Target</p>
              <p className="font-mono text-sm">{event.target}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1">Action</p>
              <p className="font-mono text-sm">{event.action}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1">Privilege</p>
              <Badge variant="outline" className="font-mono uppercase text-[10px]">
                {event.privilege}
              </Badge>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
              <p className="text-sm font-mono text-zinc-500 animate-pulse">CONSULTING NEURAL ENGINE...</p>
            </div>
          ) : analysis ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                {analysis.threatLevel.toLowerCase().includes("high") || analysis.threatLevel.toLowerCase().includes("critical") ? (
                  <ShieldX className="w-8 h-8 text-red-500" />
                ) : (
                  <ShieldCheck className="w-8 h-8 text-emerald-500" />
                )}
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 font-bold">Threat Level</p>
                  <p className={`text-lg font-bold ${
                    analysis.threatLevel.toLowerCase().includes("high") ? "text-red-500" : "text-emerald-500"
                  }`}>
                    {analysis.threatLevel}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm">
                  <Info className="w-4 h-4" />
                  Reasoning
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50">
                  {analysis.reasoning}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Recommendation
                </div>
                <p className="text-sm text-emerald-400/80 leading-relaxed bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/20">
                  {analysis.recommendation}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose} className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200">
            Acknowledge & Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
