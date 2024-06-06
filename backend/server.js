const express = require('express');
const app = express();
const cors = require('cors');
const productRoutes = require('./routes/api/products');

app.use(express.json());
app.use(cors());

// API routes
app.use('/api/collections', productRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});