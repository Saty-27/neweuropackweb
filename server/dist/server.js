"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const quoteRoutes_1 = __importDefault(require("./routes/quoteRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const seeder_1 = require("./utils/seeder");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const cmsRoutes_1 = __importDefault(require("./routes/cmsRoutes"));
const homepageRoutes_1 = __importDefault(require("./routes/homepageRoutes"));
const faqRoutes_1 = __importDefault(require("./routes/faqRoutes"));
const footerRoutes_1 = __importDefault(require("./routes/footerRoutes"));
const pageRoutes_1 = __importDefault(require("./routes/pageRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const feedbackRoutes_1 = __importDefault(require("./routes/feedbackRoutes"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
const caseStudyRoutes_1 = __importDefault(require("./routes/caseStudyRoutes"));
const enquiryRoutes_1 = __importDefault(require("./routes/enquiryRoutes"));
const industryRoutes_1 = __importDefault(require("./routes/industryRoutes"));
const galleryRoutes_1 = __importDefault(require("./routes/galleryRoutes"));
const mediaRoutes_1 = __importDefault(require("./routes/mediaRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
// Connect to MongoDB
(0, db_1.default)().then(() => {
    (0, seeder_1.seedSuperAdmin)();
});
const upload_1 = require("./middleware/upload");
// Generic File Upload Route
app.post('/api/upload', (req, res) => {
    // Initialize req.body if it doesn't exist (important for multipart)
    if (!req.body)
        req.body = {};
    req.body.folder = req.query.folder || '';
    upload_1.upload.single('file')(req, res, (err) => {
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
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/blogs', blogRoutes_1.default);
app.use('/api/quotes', quoteRoutes_1.default);
app.use('/api/dashboard', dashboardRoutes_1.default);
app.use('/api/tasks', taskRoutes_1.default);
app.use('/api/cms', cmsRoutes_1.default);
app.use('/api/homepage', homepageRoutes_1.default);
app.use('/api/faqs', faqRoutes_1.default);
app.use('/api/footer', footerRoutes_1.default);
app.use('/api/pages', pageRoutes_1.default);
app.use('/api/contact', contactRoutes_1.default);
app.use('/api/feedback', feedbackRoutes_1.default);
app.use('/api/team', teamRoutes_1.default);
app.use('/api/case-studies', caseStudyRoutes_1.default);
app.use('/api/enquiry', enquiryRoutes_1.default);
app.use('/api/industries', industryRoutes_1.default);
app.use('/api/gallery', galleryRoutes_1.default);
app.use('/api/media', mediaRoutes_1.default);
app.use('/api/services', serviceRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/monitoring', activityRoutes_1.default);
app.use('/api/jobs', jobRoutes_1.default);
// Static Images
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Basic Route
app.get('/', (req, res) => {
    res.send('Europack API is running...');
});
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Nodemon restart triggered: 2026-04-02T18:10:00 (Restoring connectivity)
});
