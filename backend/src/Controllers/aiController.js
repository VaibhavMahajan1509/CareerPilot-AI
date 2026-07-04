import { GoogleGenAI } from "@google/genai";
import Resume from "../models/Resume.js";

const getAI = () => {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
};

const cleanAIResponse = (text) => {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
};

export const reviewResume = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is missing",
      });
    }

    const resume = await Resume.findOne({ user: req.user._id });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found. Please save your resume first.",
      });
    }

    const ai = getAI();

    const prompt = `
You are an expert resume reviewer for MERN stack fresher/internship roles.

Review this resume:

Title: ${resume.title}
Summary: ${resume.summary}
Skills: ${resume.skills.join(", ")}
Experience: ${resume.experience}
Education: ${resume.education}
Projects: ${resume.projects}

Return ONLY valid JSON.
Do not use markdown.
Do not add explanation outside JSON.

JSON format:
{
  "score": 0,
  "strongPoints": ["point 1", "point 2"],
  "weakPoints": ["point 1", "point 2"],
  "missingKeywords": ["keyword 1", "keyword 2"],
  "projectSuggestions": ["suggestion 1", "suggestion 2"],
  "improvedSummary": "improved professional summary"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const review = JSON.parse(cleanAIResponse(response.text));

    return res.status(200).json({
      success: true,
      message: "Resume reviewed successfully",
      data: { review },
    });
  } catch (error) {
    console.log("GEMINI ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to review resume",
      error: error.message,
    });
  }
};

export const generateCoverLetter = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is missing",
      });
    }

    const { company, role, jobDescription } = req.body;

    if (!company || !role || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Company, role, and job description are required",
      });
    }

    const resume = await Resume.findOne({ user: req.user._id });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found. Please save your resume first.",
      });
    }

    const ai = getAI();

    const prompt = `
You are an expert career assistant.

Write a professional cover letter for a fresher MERN stack developer.

Candidate Resume:
Title: ${resume.title}
Summary: ${resume.summary}
Skills: ${resume.skills.join(", ")}
Experience: ${resume.experience}
Education: ${resume.education}
Projects: ${resume.projects}

Job Details:
Company: ${company}
Role: ${role}
Job Description: ${jobDescription}

Return ONLY valid JSON.
Do not use markdown.
Do not add explanation outside JSON.

JSON format:
{
  "coverLetter": "full cover letter text",
  "keyHighlights": ["highlight 1", "highlight 2", "highlight 3"]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const result = JSON.parse(cleanAIResponse(response.text));

    return res.status(200).json({
      success: true,
      message: "Cover letter generated successfully",
      data: result,
    });
  } catch (error) {
    console.log("COVER LETTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate cover letter",
      error: error.message,
    });
  }
};

export const generateInterviewQuestions = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is missing",
      });
    }

    const { role, difficulty, questionType } = req.body;

    if (!role || !difficulty || !questionType) {
      return res.status(400).json({
        success: false,
        message: "Role, difficulty, and question type are required",
      });
    }

    const resume = await Resume.findOne({ user: req.user._id });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found. Please save your resume first.",
      });
    }

    const ai = getAI();

    const prompt = `
You are an expert MERN stack interview coach.

Generate interview questions for this candidate.

Candidate Resume:
Title: ${resume.title}
Summary: ${resume.summary}
Skills: ${resume.skills.join(", ")}
Experience: ${resume.experience}
Education: ${resume.education}
Projects: ${resume.projects}

Interview Details:
Role: ${role}
Difficulty: ${difficulty}
Question Type: ${questionType}

Rules:
- If questionType is "Technical", generate only technical questions.
- If questionType is "HR", generate only HR questions.
- If questionType is "Both", generate both technical and HR questions.
- Keep answers beginner-friendly and interview-ready.
- Questions should be practical for fresher/internship roles.
- Include questions related to the candidate's saved resume and projects.

Return ONLY valid JSON.
Do not use markdown.
Do not add explanation outside JSON.

JSON format:
{
  "questions": [
    {
      "type": "Technical",
      "question": "question text",
      "answer": "suggested answer"
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const result = JSON.parse(cleanAIResponse(response.text));

    return res.status(200).json({
      success: true,
      message: "Interview questions generated successfully",
      data: result,
    });
  } catch (error) {
    console.log("INTERVIEW QUESTIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};

export const generateProjectExplanation = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is missing",
      });
    }

    const { projectName, projectDescription, techStack } = req.body;

    if (!projectName || !projectDescription || !techStack) {
      return res.status(400).json({
        success: false,
        message: "Project name, project description, and tech stack are required",
      });
    }

    const ai = getAI();

    const prompt = `
You are an expert MERN stack interview coach.

Create an interview-ready explanation for this project.

Project Name: ${projectName}
Project Description: ${projectDescription}
Tech Stack: ${techStack}

Rules:
- Explain like a fresher MERN developer can confidently speak in an interview.
- Keep language simple, professional, and practical.
- Focus on real-world use case, features, frontend, backend, database, authentication, and AI integration if mentioned.
- Include possible interviewer questions and strong beginner-friendly answers.

Return ONLY valid JSON.
Do not use markdown.
Do not add explanation outside JSON.

JSON format:
{
  "projectOverview": "short overview",
  "problemSolved": "what problem this project solves",
  "keyFeatures": ["feature 1", "feature 2", "feature 3"],
  "techStack": ["React", "Node.js"],
  "frontendExplanation": "frontend explanation",
  "backendExplanation": "backend explanation",
  "databaseExplanation": "database explanation",
  "interviewPitch": "1-2 minute interview explanation",
  "possibleQuestions": [
    {
      "question": "question text",
      "answer": "answer text"
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const result = JSON.parse(cleanAIResponse(response.text));

    return res.status(200).json({
      success: true,
      message: "Project explanation generated successfully",
      data: result,
    });
  } catch (error) {
    console.log("PROJECT EXPLANATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate project explanation",
      error: error.message,
    });
  }
};

export const generateQuickPrompt = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is missing",
      });
    }

    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const resume = await Resume.findOne({ user: req.user._id });

    const ai = getAI();

    const aiPrompt = `
You are an AI career assistant for MERN stack fresher/internship preparation.

User Prompt:
${prompt}

Candidate Resume Context:
${
  resume
    ? `
Title: ${resume.title}
Summary: ${resume.summary}
Skills: ${resume.skills.join(", ")}
Experience: ${resume.experience}
Education: ${resume.education}
Projects: ${resume.projects}
`
    : "No saved resume found."
}

Rules:
- Give a helpful, practical answer.
- Keep it beginner-friendly.
- If the question is related to interviews, give interview-ready wording.
- If the question is related to MERN stack, explain clearly with examples.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: aiPrompt,
    });

    return res.status(200).json({
      success: true,
      message: "Quick prompt generated successfully",
      data: {
        response: response.text,
      },
    });
  } catch (error) {
    console.log("QUICK PROMPT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate quick prompt response",
      error: error.message,
    });
  }
};