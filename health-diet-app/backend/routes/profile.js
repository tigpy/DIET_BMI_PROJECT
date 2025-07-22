
import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get profile

// All routes below use the new auth middleware, which attaches the user object to req.user
router.get('/', auth, async (req, res) => {
  try {
    res.json(req.user);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update profile (name, age, gender)
router.put('/', auth, async (req, res) => {
  const { name, age, gender } = req.body;
  try {
    req.user.name = name;
    req.user.age = age;
    req.user.gender = gender;
    await req.user.save();
    res.json(req.user);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add BMI
router.post('/bmi', auth, async (req, res) => {
  const { bmi } = req.body;
  try {
    req.user.bmi = bmi;
    await req.user.save();
    res.json(req.user);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add meal log
router.post('/meal', auth, async (req, res) => {
  const { date, meal, calories } = req.body;
  try {
    req.user.mealLogs.push({ date, meal, calories });
    await req.user.save();
    res.json(req.user);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add weight log
router.post('/weight', auth, async (req, res) => {
  const { date, weight } = req.body;
  try {
    req.user.weightLogs.push({ date, weight });
    await req.user.save();
    res.json(req.user);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
