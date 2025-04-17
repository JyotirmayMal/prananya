import express from 'express';
import { Application } from '../models/JobApplication.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, jobId } = req.body;
    const newApp = new Application({ name, email, jobId });
    await newApp.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;