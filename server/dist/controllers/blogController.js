"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendedBlogs = exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogBySlug = exports.getAllBlogs = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const getAllBlogs = async (req, res) => {
    try {
        const { category, tag, status, limit = 10, skip = 0, sort = '-createdAt' } = req.query;
        const query = {};
        if (category)
            query.category = category;
        if (tag)
            query.tags = tag;
        if (status)
            query.status = status;
        const blogs = await Blog_1.default.find(query)
            .sort(sort)
            .limit(Number(limit))
            .skip(Number(skip));
        const total = await Blog_1.default.countDocuments(query);
        res.status(200).json({ success: true, blogs, total });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllBlogs = getAllBlogs;
const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog_1.default.findOne({ slug: req.params.slug })
            .populate('relations.relatedProducts')
            .populate('relations.relatedBlogs');
        if (!blog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }
        // Increment views
        blog.analytics.views += 1;
        await blog.save();
        res.status(200).json({ success: true, blog });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getBlogBySlug = getBlogBySlug;
const createBlog = async (req, res) => {
    try {
        const blogData = req.body;
        // Automatic slug from title if not provided
        if (!blogData.slug && blogData.title) {
            blogData.slug = blogData.title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
        }
        const blog = await Blog_1.default.create(blogData);
        res.status(201).json({ success: true, blog });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, error: 'Slug must be unique' });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createBlog = createBlog;
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!blog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }
        res.status(200).json({ success: true, blog });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog_1.default.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }
        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteBlog = deleteBlog;
const getRecommendedBlogs = async (req, res) => {
    try {
        const { currentBlogId, category, tags } = req.query;
        const query = {
            status: 'published',
            _id: { $ne: currentBlogId }
        };
        if (category || tags) {
            query.$or = [
                { category: category },
                { tags: { $in: Array.isArray(tags) ? tags : [tags] } }
            ];
        }
        const blogs = await Blog_1.default.find(query)
            .sort('-analytics.views -createdAt')
            .limit(4);
        res.status(200).json({ success: true, blogs });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getRecommendedBlogs = getRecommendedBlogs;
