const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Database connection
const { testConnection } = require('./server/config/db');

// Import routes
const authRoutes = require('./server/routes/auth.routes');
const userRoutes = require('./server/routes/user.routes');
const productRoutes = require('./server/routes/product.routes');
const categoryRoutes = require('./server/routes/category.routes');
const cartRoutes = require('./server/routes/cart.routes');
const wishlistRoutes = require('./server/routes/wishlist.routes');
const uploadRoutes = require('./server/routes/upload.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware to prevent exposing sensitive files from the root directory
app.use((req, res, next) => {
  try {
    const decodedPath = decodeURIComponent(req.path);
    const normalizedPath = path.normalize(decodedPath).replace(/\\/g, '/');

    // Block sensitive files and directories
    const isSensitive = normalizedPath.includes('/.') ||
      /^\/(server\.js|package\.json|package-lock\.json|pnpm-lock\.yaml|server(\/.*)?|database(\/.*)?|node_modules(\/.*)?)$/i.test(normalizedPath);

    if (isSensitive) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/upload', uploadRoutes);

// Serve the main HTML file for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Test database connection
  await testConnection();
});