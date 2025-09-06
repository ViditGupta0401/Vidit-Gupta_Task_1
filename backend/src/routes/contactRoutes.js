import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Handle contact form submissions
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({
      name,
      email,
      message,
      date: new Date()
    });
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving contact form' });
  }
});

export default router;
