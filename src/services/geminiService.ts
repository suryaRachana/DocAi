import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Scheme } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function findSchemes(profile: UserProfile): Promise<Scheme[]> {
  const prompt = `
    Find relevant government schemes (national or state-level in India) for the following user profile:
    - Age: ${profile.age}
    - Annual Income: ₹${profile.income}
    - Occupation: ${profile.occupation}
    - Location: ${profile.location}

    Provide a list of at least 3-5 eligible schemes. For each scheme, include:
    - Name of the scheme
    - Category (e.g., Education, Health, Agriculture, Social Security)
    - A brief description
    - Why the user is eligible
    - Step-by-step application process
    - Key benefits
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert in Indian government schemes. Provide accurate, helpful information in JSON format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              category: { type: Type.STRING },
              description: { type: Type.STRING },
              eligibilityExplanation: { type: Type.STRING },
              applicationSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
              benefits: { type: Type.STRING },
            },
            required: ["id", "name", "category", "description", "eligibilityExplanation", "applicationSteps", "benefits"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching schemes:", error);
    return [];
  }
}
