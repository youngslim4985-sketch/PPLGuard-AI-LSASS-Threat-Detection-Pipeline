import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeSecurityEvent(event: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a Senior Cybersecurity Analyst. Analyze the following security event and determine if it represents a threat to LSASS (Local Security Authority Subsystem Service). 
      
      Event Details:
      - Process: ${event.process}
      - Target: ${event.target}
      - Action: ${event.action}
      - Privilege: ${event.privilege}
      - Risk Score (Heuristic): ${event.riskScore}
      
      Provide a concise analysis including:
      1. Threat Level (Low, Medium, High, Critical)
      2. Reasoning
      3. Recommended Action
      
      Format the response as JSON with keys: "threatLevel", "reasoning", "recommendation".`,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      threatLevel: "Unknown",
      reasoning: "Failed to perform AI analysis.",
      recommendation: "Manual review required."
    };
  }
}
