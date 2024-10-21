const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
// MongoDB Connection
mongoose.connect('mongodb+srv://sujal:gBG5fXmkDUFjjhd6@contactcluster.fr1cc.mongodb.net/?retryWrites=true&w=majority&appName=ContactCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
