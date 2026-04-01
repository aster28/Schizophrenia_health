const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let dataset = [];
try {
  dataset = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json")));
  console.log("Data loaded:", dataset.length);
} catch (err) {
  console.error("Error loading data:", err);
}

app.post('/chat', (req, res) => {
  let message = req.body.message.toLowerCase().trim();
  message = message.replace(/[^\w\s]/gi, "");

  const faq = botData.faq.find(item =>
    item.question.toLowerCase() === message ||
    (item.keywords && item.keywords.some(k => message.includes(k)))
  );

  if (faq) {
    res.json({ reply: faq.answer });
  } else {
    res.json({ reply: "🤖 Try asking about schizophrenia or dopamine." });
  }
}
app.post("/chat", express.json(), (req, res) => {
  const { message } = req.body;
  const faq = require("./data/data.json").faq;
  
  const answer = faq.find(q =>
    q.question.toLowerCase().includes(message.toLowerCase())
  );
  
  res.json({ answer: answer ? answer.answer : "No answer found." });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on", PORT));
