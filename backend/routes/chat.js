import express from "express";
import Chat from "../models/Chat.js";
import auth from "../middleware/auth.js";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

function getAI() {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY missing");
  }

  return new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
  });
}

async function sum({ a, b }) {
  return Number(a) + Number(b);
}

async function isPrime({ num }) {
  const n = Number(num);
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

async function getCrypto({ para }) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${para}`
    );
    const data = await response.json();
    if (!data.length) return "Coin not found";
    return {
      coin: data[0].name,
      price: data[0].current_price,
      currency: "USD"
    };
  } catch {
    return "Unable to fetch crypto";
  }
}

const availableTools = { sum, isPrime, getCrypto };

const toolDeclarations = [
  {
    name: "sum",
    description: "Calculate sum",
    parameters: {
      type: "OBJECT",
      properties: {
        a: { type: "NUMBER" },
        b: { type: "NUMBER" }
      },
      required: ["a", "b"]
    }
  },
  {
    name: "isPrime",
    description: "Check Prime",
    parameters: {
      type: "OBJECT",
      properties: {
        num: { type: "NUMBER" }
      },
      required: ["num"]
    }
  },
  {
    name: "getCrypto",
    description: "Fetch Crypto",
    parameters: {
      type: "OBJECT",
      properties: {
        para: { type: "STRING" }
      },
      required: ["para"]
    }
  }
];

async function runAgent(message, history) {
  history.push({
    role: "user",
    parts: [{ text: message }]
  });

  while (true) {
    const ai=getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: history,
      config: {
        systemInstruction: "You are an AI Tool Agent. Capabilities: Answer questions, calculate sums, check prime numbers, fetch crypto prices. Use tools automatically. You have capability to answers any other questions without using tools. If you use a tool, you must return the result. If not, respond normally.",
        tools: [{ functionDeclarations: toolDeclarations }]
      }
    });

    const calls = response.functionCalls;

    if (calls && calls.length > 0) {
      const { name, args } = calls[0];
      if (!availableTools[name]) return "Tool not available";

      const result = await availableTools[name](args);

      history.push({
        role: "model",
        parts: [{ functionCall: calls[0] }]
      });

      history.push({
        role: "user",
        parts: [{ functionResponse: { name, response: { result } } }]
      });

      continue;
    }

    const textOutput = response.text || "No response";
    history.push({
      role: "model",
      parts: [{ text: textOutput }]
    });

    return textOutput;
  }
}

router.post("/chat", auth, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ response: "Message required" });
    }

    let chat = await Chat.findOne({ userId: req.user.id });
    if (!chat) {
      chat = await Chat.create({ userId: req.user.id, messages: [] });
    }

    const history = chat.messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const result = await runAgent(message, history);

    chat.messages.push({ role: "user", text: message });
    chat.messages.push({ role: "model", text: result });
    await chat.save();

    return res.json({ response: result });
  } catch (err) {
    return res.status(500).json({ response: err.message });
  }
});

router.get("/history", auth, async (req, res) => {
  try {
    const chat = await Chat.findOne({ userId: req.user.id });
    return res.json(chat?.messages || []);
  } catch (err) {
    return res.status(500).json({ response: err.message });
  }
});

export default router;
