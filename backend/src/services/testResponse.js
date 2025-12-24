import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function geminiAPI() {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
  });
  const prompt = 'Say hello';
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

geminiAPI().then(text => {
  if (text) {
    console.log("RESULT:\n", text);
  } else {
    console.log("Failed to retrieve chords. Check console for error details.");
  }
});