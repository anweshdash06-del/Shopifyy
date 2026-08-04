const express = require('express');
const router = express.Router();
const HelpMessage = require('../models/HelpMessage');

// POST /api/help-messages — storefront's Help Center message form saves here
router.post('/', async (req, res) => {
  try {
    const helpMessage = new HelpMessage(req.body);
    await helpMessage.save();
    res.status(201).json(helpMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/help-messages — Admin Panel's "Help Center" tab reads from here
router.get('/', async (req, res) => {
  try {
    const messages = await HelpMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
