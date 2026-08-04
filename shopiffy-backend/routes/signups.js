const express = require('express');
const router = express.Router();
const SignUp = require('../models/SignUp');

// POST /api/signups — storefront Sign Up form saves here
router.post('/', async (req, res) => {
  try {
    const signUp = new SignUp(req.body);
    await signUp.save();
    res.status(201).json(signUp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/signups — Admin Panel's Customers tab reads from here
router.get('/', async (req, res) => {
  try {
    const signUps = await SignUp.find().sort({ createdAt: -1 });
    res.json(signUps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
