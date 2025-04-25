const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const responses = JSON.parse(fs.readFileSync('./responses.json', 'utf-8'));

app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;
  const reply = responses[userMessage] || "Sorry, I don't understand that. Try asking something else!";
  res.json({ reply });
});

app.get('/api/questions', (req, res) => {
    const questions = Object.keys(responses);
    console.log(questions)
    res.json({ questions });
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
