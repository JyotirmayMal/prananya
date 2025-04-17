import express from "express";
import { PORT, mongoDBURL, GEMINI_API_KEY } from "./config.js";
import cors from "cors";
import path from 'path';
import mongoose from 'mongoose';
import jobRoute from "./routes/jobRoute.js";
import application from "./routes/application.js";
import { GoogleGenerativeAI } from "@google/generative-ai";


const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS setup for frontend
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// Default route
app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send("Made with ❤ by Ananya");
});


// Routes for jobs and applications
app.use('/jobs', jobRoute);
app.use('/applications', application);


const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

app.post('/generate-email', async (req, res) => {
    try {
      const model = genAI.getGenerativeModel({model : "gemini-2.0-flash"})
      const { jobDesc, recruiterName, expertise, yourName } = req.body;
  
      const prompt = `
        Write a cold email within 100 words based on the following details:
        Job Description: ${jobDesc}
        Recruiter Name: ${recruiterName}
        Expertise: ${expertise}
        Your Name: ${yourName}
        Make the email polite, clear, and professional.
      `;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      res.json({ emailContent: text });
      
    } catch (error) {
      console.error('Error generating email:', error);
      res.status(500).send('Internal Server Error');
    }
  });


  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, '../ui/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../ui/dist/index.html'));
  });


// MongoDB connection and app start
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

