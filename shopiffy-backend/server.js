require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const signupRoutes = require('./routes/signups');
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');
const sellRequestRoutes = require('./routes/sellRequests');
const helpMessageRoutes = require('./routes/helpMessages');

const app = express();

app.use(cors()); // allows your GitHub Pages site to call this API from a different domain
app.use(express.json({ limit: '10mb' })); // higher limit since product/seller photos are base64 strings

// Connect to MongoDB Atlas using the connection string from your .env file
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes — these paths match what the storefront and admin panel will call
app.use('/api/signups', signupRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sell-requests', sellRequestRoutes);
app.use('/api/help-messages', helpMessageRoutes);

app.get('/', (req, res) => res.send('Shopiffy API is running.'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Shopiffy API listening on port ${PORT}`));
