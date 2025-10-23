import Submission from "../models/Submission.js";
import User from "../models/User.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Analyze a user-submitted code snippet using Gemini and save the results.
 */
export const analyzeCode = async (req, res, next) => {
  try {
    const { questionTitle, code, language } = req.body;
    const userId = req.user;

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not set in environment variables.");
      return res.status(500).json({ message: "Server error: Missing Gemini API key." });
    }

    if (!questionTitle || !code || !language) {
      return res.status(400).json({ message: "Question title, code, and language are required." });
    }

    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Build prompt for structured JSON analysis
    const prompt = `
You are an expert in Data Structures and Algorithms.
Analyze the following ${language} code for the given problem.

### Problem
${questionTitle}

### Code
\`\`\`${language}
${code}
\`\`\`

### Requirements
Respond **only** in strict JSON format exactly like this:
{
  "overallScore": number,
  "timeComplexity": { "score": number, "explanation": string },
  "spaceComplexity": { "score": number, "explanation": string },
  "edgeCases": { "score": number, "explanation": string },
  "codeStructure": { "score": number, "explanation": string },
  "variableNaming": { "score": number, "explanation": string },
  "readability": { "score": number, "explanation": string },
  "algorithmChoice": { "score": number, "explanation": string },
  "problemUnderstanding": { "score": number, "explanation": string },
  "suggestedImprovements": {
    "improvedCode": string,
    "explanation": string
  }
}
`;

    // Call Gemini
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Safely parse JSON
    let analysis;
    try {
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}");
      const jsonString = responseText.substring(jsonStart, jsonEnd + 1);
      analysis = JSON.parse(jsonString);
    } catch (err) {
      console.error("Failed to parse Gemini response:", err);
      return res.status(500).json({
        message: "AI response could not be parsed. Try again."
      });
    }

    // Save submission
    const submission = await Submission.create({
      user: userId,
      questionTitle,
      language,
      code,
      analysis
    });

    // Link submission to user
    await User.findByIdAndUpdate(userId, { $push: { submissions: submission._id } });

    res.status(201).json({
      message: "Code analyzed successfully",
      submission
    });
  } catch (err) {
    console.error("Analyze code error:", err);
    next(err);
  }
};
