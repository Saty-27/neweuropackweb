import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let connectedUsersCount = 0;

io.on('connection', (socket) => {
  console.log(`User connected via socket: ${socket.id}`);
  connectedUsersCount++;
  
  // Broadcast updated count to all connected clients
  io.emit('statsUpdate', { visitors: { daily: connectedUsersCount, monthly: 560, lifetime: 5420 } });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    connectedUsersCount = Math.max(0, connectedUsersCount - 1);
    io.emit('statsUpdate', { visitors: { daily: connectedUsersCount, monthly: 560, lifetime: 5420 } });
  });
});

app.use(compression());
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import blogRoutes from './routes/blogRoutes';
import quoteRoutes from './routes/quoteRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import { seedSuperAdmin } from './utils/seeder';

import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import cmsRoutes from './routes/cmsRoutes';
import homepageRoutes from './routes/homepageRoutes';
import faqRoutes from './routes/faqRoutes';
import footerRoutes from './routes/footerRoutes';
import pageRoutes from './routes/pageRoutes';
import contactRoutes from './routes/contactRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import teamRoutes from './routes/teamRoutes';
import caseStudyRoutes from './routes/caseStudyRoutes';
import enquiryRoutes from './routes/enquiryRoutes';
import industryRoutes from './routes/industryRoutes';
import galleryRoutes from './routes/galleryRoutes';
import mediaRoutes from './routes/mediaRoutes';
import serviceRoutes from './routes/serviceRoutes';
import activityRoutes from './routes/activityRoutes';
import jobRoutes from './routes/jobRoutes';
import analyticsRoutes from './routes/analyticsRoutes';


// Connect to MongoDB
connectDB().then(() => {
  seedSuperAdmin();
});

import { upload } from './middleware/upload';

// Generic File Upload Route
app.post('/api/upload', (req, res) => {
  // Initialize req.body if it doesn't exist (important for multipart)
  if (!req.body) req.body = {};
  req.body.folder = req.query.folder || '';
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    res.status(200).json({ success: true, url: req.file.path.replace(/\\/g, '/') });
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/footer', footerRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/monitoring', activityRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/analytics', analyticsRoutes);


// Static Images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Basic Route
app.get('/', (req, res) => {
  res.send('Europack API is running...');
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Nodemon restart triggered: 2026-04-02T18:10:00 (Restoring connectivity)
});
