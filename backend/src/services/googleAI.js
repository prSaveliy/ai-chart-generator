import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import chartPrompt from "../prompts/chartPrompt.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateChartFromPrompt(userPrompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
  });
  const prompt = `
    ${chartPrompt};

    User request:
    ${userPrompt}
  `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
