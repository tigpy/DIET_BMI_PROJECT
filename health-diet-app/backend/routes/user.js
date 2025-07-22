import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

// Protected POST /api/user/weights - Add a weight log
router.post('/weights', auth, async (req, res) => {
  const { date, weight } = req.body;
  if (!date || !weight) {
    return res.status(400).json({ msg: 'Date and weight are required.' });
  }
  try {
    req.user.weightLogs.push({ date, weight });
    await req.user.save();
    res.json({ weightLogs: req.user.weightLogs });
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Protected GET /api/user/weights - Get all weight logs
router.get('/weights', auth, async (req, res) => {
  try {
    res.json({ weightLogs: req.user.weightLogs });
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});
// Protected POST /api/user/meals - Add a meal log
router.post('/meals', auth, async (req, res) => {
  const { date, meal, calories } = req.body;
  if (!date || !meal) {
    return res.status(400).json({ msg: 'Date and meal name are required.' });
  }
  try {
    req.user.mealLogs.push({ date, meal, calories });
    await req.user.save();
    res.json({ mealLogs: req.user.mealLogs });
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Protected GET /api/user/meals - Get all meal logs
router.get('/meals', auth, async (req, res) => {
  try {
    res.json({ mealLogs: req.user.mealLogs });
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});
// Protected POST /api/user/bmi
router.post('/bmi', auth, async (req, res) => {
  const { height, weight } = req.body;
  if (!height || !weight) {
    return res.status(400).json({ msg: 'Height and weight are required.' });
  }
  const bmi = Number(weight) / ((Number(height) / 100) ** 2);
  try {
    req.user.height = height;
    req.user.weight = weight;
    req.user.bmi = bmi;
    await req.user.save();
    res.json({ bmi: bmi.toFixed(2) });
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Protected GET /api/user/profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json(req.user);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
