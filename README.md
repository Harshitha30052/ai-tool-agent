# 🤖 AI Tool Agent

An AI-powered intelligent assistant built using **Node.js, Express, MongoDB, and Gemini API** that supports **authentication, persistent chat history, and function/tool calling capabilities**.

This project allows users to interact with an AI assistant, perform calculations, fetch crypto prices, maintain chat conversations, and securely access their personalized history through login/signup.

---

# 🚀 Project Overview

AI Tool Agent is designed to simulate a modern conversational AI platform.

Unlike a basic chatbot, this system can:

✔ Answer general questions  
✔ Execute tools/functions dynamically  
✔ Maintain user chat history  
✔ Authenticate users securely  
✔ Store conversations in MongoDB  
✔ Provide personalized sessions

---

# ✨ Features

## 🧠 AI Conversation
- Real-time AI responses
- Natural language interaction
- Context-aware conversations

---

## ⚡ Function Calling System
The AI can invoke backend tools automatically.

Supported tools:

### ➜ Sum Calculator
Example:

```
sum of 10 and 20
```

Output:

```
30
```

---

### ➜ Prime Number Checker

Example:

```
is 17 prime?
```

Output:

```
true
```

---

### ➜ Cryptocurrency Price Fetching

Example:

```
get bitcoin price
```

Output:

```
Bitcoin Price:
$xxxxx USD
```

---

## 🔐 Authentication System

Users can:

- Sign Up
- Login
- Secure Session Handling
- JWT Authentication

---

## 💬 Persistent Chat History

Chat history is:

- Stored in MongoDB
- Retrieved after login
- User-specific

---

## 🎨 Modern User Interface

Includes:

- Responsive Layout
- Sidebar Navigation
- Profile Section
- Chat Experience

---

# 🏗️ System Architecture

```
Frontend
│
├── HTML
├── CSS
└── JavaScript

↓

Backend

Node.js
Express.js

↓

Authentication

JWT

↓

Database

MongoDB

↓

AI Layer

Gemini API
```

---

# 🛠️ Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT

## AI Integration

- Gemini API

---

# 📂 Project Structure

```plaintext
GenAI/
│
├── frontend/
│
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── style.css
│   ├── auth.css
│   ├── script.js
│   ├── login.js
│   └── signup.js
│
├── backend/
│
│   ├── server.js
│   ├── db.js
│
│   ├── models/
│   │
│   ├── User.js
│   └── Chat.js
│
│   ├── routes/
│   │
│   ├── auth.js
│   └── chat.js
│
│   └── middleware/
│
│       └── auth.js
│
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Installation Guide

## 1 Clone Repository

```bash
git clone https://github.com/your-username/ai-tool-agent.git
```

---

## 2 Move Into Project

```bash
cd ai-tool-agent
```

---

## 3 Install Dependencies

```bash
npm install
```

---

## 4 Configure Environment Variables

Create:

```plaintext
.env
```

Add:

```env
GOOGLE_API_KEY=YOUR_GEMINI_API_KEY

MONGO_URI=mongodb://127.0.0.1:27017/genai

JWT_SECRET=your_secret_key

PORT=3000
```

---

## 5 Start MongoDB

```bash
mongod
```

---

## 6 Start Backend

```bash
npm start
```

Server:

```plaintext
http://localhost:3000
```

---

## 7 Run Frontend

Open:

```plaintext
frontend/index.html
```

---

# 🧪 Example Prompts

Ask:

```plaintext
What is array?
```

```plaintext
Get bitcoin price
```

```plaintext
Check if 97 is prime
```

```plaintext
Generate Java code for addition
```

---

# 🔒 Authentication Flow

```plaintext
Signup

↓

Login

↓

JWT Token

↓

Access Chat

↓

Store Conversation

↓

Retrieve History
```

---

# 📈 Future Enhancements

- Voice Assistant
- Multi-chat Sessions
- File Upload Support
- Dark Mode
- Image Generation
- AI Memory
- Deployment

---

# 📜 License

This project is developed for learning and portfolio purposes.

---

# 👩‍💻 Author

Harshitha Reddy

Built with AI + Full Stack Development