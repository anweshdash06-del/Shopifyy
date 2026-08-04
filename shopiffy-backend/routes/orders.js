const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders — storefront checkout creates a real order here
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/orders — Admin Panel's Orders tab and Dashboard stats read from here
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/lookup?query=SHP-12345678 (or an email) — storefront's Track Order uses this
router.get('/lookup', async (req, res) => {
  try {
    const q = (req.query.query || '').trim();
    const order = await Order.findOne({
      $or: [{ id: q }, { email: q.toLowerCase() }]
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/orders/:orderId — admin updates status (Pending / Shipped / Delivered / Cancelled)
router.patch('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { id: req.params.orderId },
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
