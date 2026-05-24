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

// Security middleware to block access to backend files and directories
app.use((req, res, next) => {
  let reqPath;
  try {
    // 1. Fully URL-decode the path to prevent encoding bypasses (e.g. %2e%2e)
    const decodedPath = decodeURIComponent(req.path);
    // 2. Normalize path to resolve any directory traversal tricks (e.g. /api/../server.js)
    reqPath = path.normalize(decodedPath).replace(/\\/g, '/');
  } catch (err) {
    // If decoding fails (malformed URI), block the request
    return res.status(400).send('Bad Request: Malformed URI.');
  }

  // Bypass filter for actual API routes and specific asset folders *after* normalization
  if (reqPath.startsWith('/api/') || reqPath.startsWith('/uploads/')) {
    return next();
  }

  // Array of patterns to strictly block
  const blockedPatterns = [
    /^\/\..*/,                // Hidden files/folders (.env, .git, etc.)
    /\.json$/i,               // JSON files (package.json, etc.)
    /\.md$/i,                 // Markdown files (README.md, etc.)
    /^\/server\.js$/i,        // Main entry point
    /^\/setup\.js$/i,         // Setup script
    /^\/server\/.*/i,         // Backend source code directory
    /^\/database\/.*/i,       // Database scripts/schemas directory
    /^\/node_modules\/.*/i,   // Dependencies directory
    /^\/admin\/.*/i,          // Admin interface directory (assuming it requires auth/not fully public)
    /^\/tests?\/.*/i          // Test directories
  ];

  if (blockedPatterns.some(pattern => pattern.test(reqPath))) {
    return res.status(403).send('Forbidden: Access to this resource is denied.');
  }

  next();
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