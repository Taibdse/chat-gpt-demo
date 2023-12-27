import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";
import { config } from "dotenv";

config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

const getOpenAIAnswers = async (questions) => {
  if (!questions?.length) return [];

  const completion = await openai.chat.completions.create({
    messages: questions.map((q) => ({ role: "user", content: q })),
    model: "gpt-3.5-turbo",
  });
  return completion.choices;
};

app.post("/api/openai/answer", async function (req, res) {
  const questions = req.body;
  const choices = await getOpenAIAnswers(questions);
  return res.json({ answers: choices.map((c) => c.message.content) });
});

app.listen(3001, function () {
  console.log("Server is listenning on port 3001");
});
