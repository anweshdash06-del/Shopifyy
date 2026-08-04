const express = require('express');
const router = express.Router();
const SellRequest = require('../models/SellRequest');

// POST /api/sell-requests — storefront's "Sell on Shopiffy" form saves here
router.post('/', async (req, res) => {
  try {
    const sellRequest = new SellRequest(req.body);
    await sellRequest.save();
    res.status(201).json(sellRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/sell-requests — Admin Panel's "Sell Requests" tab reads from here
router.get('/', async (req, res) => {
  try {
    const requests = await SellRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
