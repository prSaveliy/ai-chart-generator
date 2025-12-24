import { Router } from "express";
import { generateChartFromPrompt } from "../services/googleAI.js";
import { validateChart } from "../validators/validateChart.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt);
    const geminiResponse = await generateChartFromPrompt(prompt)
    const cleanJson = geminiResponse.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    console.log("Gemini response:", geminiResponse);

    const { valid, errors } = validateChart(parsed);
    if (!valid) {
    return res.status(400).json({
      error: "Invalid chart data",
      details: errors  
    })
    }

    return res.status(200).json(parsed);

  } catch (err) {
    res.status(500).json({
      error: "Failed to generate chart"
    })
  }
});

export default router;