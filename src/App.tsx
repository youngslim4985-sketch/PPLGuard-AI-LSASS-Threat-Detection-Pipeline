import { useState, useEffect } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatsGrid } from "./components/StatsGrid";
import { EventFeed } from "./components/EventFeed";
import { AnomalyChart } from "./components/AnomalyChart";
import { AIAnalysisDialog } from "./components/AIAnalysisDialog";
import { analyzeSecurityEvent } from "./lib/gemini";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RefreshCw } from "lucide-react";

export default function App() {
  const [events, setEvents] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, anomalies: 0, suspicious: 0 });
  const [isSimulatorRunning, setIsSimulatorRunning] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const fetchData = async () => {
    try {
      const [eventsRes, statsRes] = await Promise.all([
        fetch("/api/events"),
        fetch("/api/stats")
      ]);
      const eventsData = await eventsRes.json();
      const statsData = await statsRes.json();
      setEvents(eventsData);
      setStats(statsData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleSimulator = async () => {
    try {
      const res = await fetch("/api/simulator/toggle", { method: "POST" });
      const data = await res.json();
      setIsSimulatorRunning(data.running);
    } catch (error) {
      console.error("Toggle error:", error);
    }
  };

  const handleAnalyze = async (event: any) => {
    setSelectedEvent(event);
    setIsAnalysisOpen(true);
    setIsAnalyzing(true);
    setAnalysis(null);
    
    const result = await analyzeSecurityEvent(event);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const chartData = events.slice(0, 20).reverse().map((e, i) => ({
    time: i,
    risk: e.riskScore
  }));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500/30">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">SOC Dashboard</h2>
            <p className="text-zinc-500 text-sm">Monitoring LSASS protection and process integrity.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchData}
              className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant={isSimulatorRunning ? "destructive" : "default"}
              size="sm" 
              onClick={toggleSimulator}
              className={!isSimulatorRunning ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              {isSimulatorRunning ? (
                <><Pause className="w-4 h-4 mr-2" /> Stop Simulator</>
              ) : (
                <><Play className="w-4 h-4 mr-2" /> Start Simulator</>
              )}
            </Button>
          </div>
        </div>

        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <EventFeed events={events} onAnalyze={handleAnalyze} />
          </div>
          
          <div className="space-y-8">
            <AnomalyChart data={chartData} />
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Security Posture</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">PPL Protection</span>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">ENABLED</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Credential Guard</span>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">ACTIVE</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">AI Analysis Engine</span>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">ONLINE</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AIAnalysisDialog 
        isOpen={isAnalysisOpen}
        onClose={() => setIsAnalysisOpen(false)}
        event={selectedEvent}
        analysis={analysis}
        loading={isAnalyzing}
      />
    </div>
  );
}
