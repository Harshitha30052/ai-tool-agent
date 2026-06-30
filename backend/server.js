
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";

//dotenv.config({ path: "../.env" });


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

console.log("Loaded API Key:", process.env.GOOGLE_API_KEY);

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "running",
    database: "connected"
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { GoogleGenAI } from "@google/genai";
// dotenv.config({ path: "../.env"});
// const app = express();
// app.use(cors());
// app.use(express.json());

// console.log("Loaded API Key:", process.env.GOOGLE_API_KEY);

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_API_KEY
// });

// const history = [];

// async function sum({ a, b }) {
//     return Number(a) + Number(b);
// }

// async function isPrime({ num }) {
//     num = Number(num);
//     if (num < 2) return false;
//     for (let i = 2; i <= Math.sqrt(num); i++) {
//         if (num % i === 0) return false;
//     }
//     return true;
// }

// async function getCrypto({ para }) {
//     try {
//         const response = await fetch(
//             `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${para}`
//         );
//         const data = await response.json();
//         if (!data.length) {
//             return "Coin not found";
//         }
//         return {
//             coin: data[0].name,
//             price: data[0].current_price,
//             currency: "USD"
//         };
//     } catch {
//         return "Unable to fetch crypto";
//     }
// }

// const availableTools = {
//     sum,
//     isPrime,
//     getCrypto
// };

// const toolDeclarations = [
//     {
//         name: "sum",
//         description: "Calculate the sum of two numbers a and b and return the result. Example:sum({a:5,b:10}) returns 15",
//         parameters: {
//             type: "OBJECT",
//             properties: {
//                 a: { type: "NUMBER" },
//                 b: { type: "NUMBER" }
//             },
//             required: ["a", "b"]
//         }
//     },
//     {
//         name: "isPrime",
//         description: "Check if a number is prime. Example:isPrime({num:7}) returns true",
//         parameters: {
//             type: "OBJECT",
//             properties: {
//                 num: { type: "NUMBER" }
//             },
//             required: ["num"]
//         }
//     },
//     {
//         name: "getCrypto",
//         description: "Get crypto price for a given coin. Example:getCrypto({para:'bitcoin'}) return {coin:'Bitcoin',price:30000,currency:'USD'}",
//         parameters: {
//             type: "OBJECT",
//             properties: {
//                 para: { type: "STRING" }
//             },
//             required: ["para"]
//         }
//     }
// ];

// async function runAgent(message) {
//     history.push({
//         role: "user",
//         parts: [{ text: message }]
//     });

//     while (true) {
//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents: history,
//             config: {
//                 systemInstruction: `
//                     You are an AI Tool Agent.
//                     Capabilities:
//                     - Answer questions
//                     - Calculate sums
//                     - Check prime numbers
//                     - Fetch crypto prices
//                     Use tools automatically.You have capability to answers any other questions without using tools. If you use a tool,you must return the result of the tool in your next response.If you use a tool,you must not return any other text in your next response. If you don't use a tool,you must return the answer in your next response.
//                 `,
//                 tools: [{ functionDeclarations: toolDeclarations }]
//             }
//         });

//         console.log("Gemini Response:", response);
//         const calls = response.functionCalls;

//         if (calls && calls.length > 0) {
//             const { name, args } = calls[0];
//             const result = await availableTools[name](args);

//             history.push({
//                 role: "model",
//                 parts: [{ functionCall: calls[0] }]
//             });

//             history.push({
//                 role: "user",
//                 parts: [{
//                     functionResponse: {
//                         name,
//                         response: { result }
//                     }
//                 }]
//             });
//             continue;
//         }

//         const textOutput = response.text || "No response";
        
//         history.push({
//             role: "model",
//             parts: [{ text: textOutput }]
//         });

//         return textOutput;
//     }
// }

// app.post("/chat", async (req, res) => {
//     try {
//         console.log(req.body);
//         const { message } = req.body;

//         if (!message) {
//             return res.status(400).json({ response: "Message required" });
//         }

//         const result = await runAgent(message);
//         res.json({ response: result });
//     } catch (err) {
//         console.log("ERROR:", err);
//         res.status(500).json({ response: err.message });
//     }
// });

// app.get("/", (req, res) => {
//     res.send("Backend Running");
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
