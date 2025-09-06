import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find admin
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValid = await admin.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get admin profile (protected route example)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
