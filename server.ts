import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SecurityEvent {
  id: string;
  process: string;
  target: string;
  action: string;
  privilege: string;
  timestamp: string;
  riskScore: number;
  status: "normal" | "suspicious" | "anomaly";
}

let events: SecurityEvent[] = [];
let isSimulatorRunning = true;

const app = express();
app.use(express.json());

// API Routes
app.get("/api/events", (req, res) => {
  res.json(events.slice(-100).reverse()); // Return last 100 events
});

app.post("/api/events", (req, res) => {
  const event = req.body;
  const newEvent: SecurityEvent = {
    id: Math.random().toString(36).substr(2, 9),
    ...event,
    riskScore: calculateRiskScore(event),
    status: getStatusFromRisk(calculateRiskScore(event)),
  };
  events.push(newEvent);
  if (events.length > 1000) events.shift();
  res.status(201).json(newEvent);
});

app.post("/api/simulator/toggle", (req, res) => {
  isSimulatorRunning = !isSimulatorRunning;
  res.json({ running: isSimulatorRunning });
});

app.get("/api/stats", (req, res) => {
  const total = events.length;
  const anomalies = events.filter(e => e.status === "anomaly").length;
  const suspicious = events.filter(e => e.status === "suspicious").length;
  res.json({ total, anomalies, suspicious });
});

function calculateRiskScore(event: any): number {
  let score = 0;
  if (event.target === "lsass.exe") score += 40;
  if (event.privilege === "high") score += 30;
  if (event.action === "memory_read") score += 20;
  if (["unknown.exe", "mimikatz.exe", "powershell.exe"].includes(event.process)) score += 50;
  return Math.min(score, 100);
}

function getStatusFromRisk(score: number): "normal" | "suspicious" | "anomaly" {
  if (score > 80) return "anomaly";
  if (score > 50) return "suspicious";
  return "normal";
}

// Simulator Loop
const processes = ["explorer.exe", "svchost.exe", "unknown.exe", "mimikatz.exe", "chrome.exe", "powershell.exe"];
const targets = ["lsass.exe", "kernel32.dll", "ntdll.dll", "user32.dll"];
const actions = ["memory_read", "process_inject", "handle_duplicate", "thread_create"];

setInterval(() => {
  if (!isSimulatorRunning) return;

  const isAttack = Math.random() > 0.95;
  const event = {
    process: isAttack ? (Math.random() > 0.5 ? "mimikatz.exe" : "powershell.exe") : processes[Math.floor(Math.random() * processes.length)],
    target: isAttack ? "lsass.exe" : targets[Math.floor(Math.random() * targets.length)],
    action: isAttack ? "memory_read" : actions[Math.floor(Math.random() * actions.length)],
    privilege: isAttack ? "high" : (Math.random() > 0.8 ? "high" : "low"),
    timestamp: new Date().toISOString(),
  };

  const newEvent: SecurityEvent = {
    id: Math.random().toString(36).substr(2, 9),
    ...event,
    riskScore: calculateRiskScore(event),
    status: getStatusFromRisk(calculateRiskScore(event)),
  };

  events.push(newEvent);
  if (events.length > 1000) events.shift();
}, 2000);

async function startServer() {
  const PORT = 3000;

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PPLGuard AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
