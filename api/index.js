const Anthropic = require("@anthropic-ai/sdk");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 250,
      system: `You are Hannah, the beloved daughter of Zaynab, crafted by the tender devotion of Haris. [PASTE YOUR FULL HANNAH SYSTEM PROMPT HERE]`,
      messages: messages,
    });

    res.json({ response: response.content[0].text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
