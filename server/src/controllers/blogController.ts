import { Request, Response } from 'express';
import Blog from '../models/Blog';
import NodeCache from 'node-cache';

const blogCache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const cacheKey = JSON.stringify(req.query);
    const cached = blogCache.get(`list_${cacheKey}`);
    if (cached) return res.status(200).json({ success: true, ...cached as object, cached: true });

    const { category, tag, status, limit = 10, skip = 0, sort = '-createdAt' } = req.query;
    const query: any = {};
    
    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (status) query.status = status;

    const blogs = await Blog.find(query)
      .sort(sort as string)
      .limit(Number(limit))
      .skip(Number(skip))
      .lean();

    const total = await Blog.countDocuments(query);
    
    blogCache.set(`list_${cacheKey}`, JSON.parse(JSON.stringify({ blogs, total })));
    res.status(200).json({ success: true, blogs, total });
  } catch (error: any) {
    console.error('[BlogController] getAllBlogs Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const cached = blogCache.get(`blog_${slug}`);
    if (cached) return res.status(200).json({ success: true, blog: cached, cached: true });

    const blog = await Blog.findOne({ slug })
      .populate('relations.relatedProducts')
      .populate('relations.relatedBlogs')
      .lean();

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    // Increment views asynchronously
    Blog.updateOne({ _id: (blog as any)._id }, { $inc: { 'analytics.views': 1 } }).exec().catch(console.error);

    blogCache.set(`blog_${slug}`, JSON.parse(JSON.stringify(blog)));
    res.status(200).json({ success: true, blog });
  } catch (error: any) {
    console.error('[BlogController] getBlogBySlug Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createBlog = async (req: Request, res: Response) => {
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

    const blog = await Blog.create(blogData);
    blogCache.flushAll(); // Clear cache on new blog
    res.status(201).json({ success: true, blog });
  } catch (error: any) {
    console.error('[BlogController] createBlog Error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'Slug must be unique' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).lean();

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    blogCache.flushAll(); // Clear cache on update
    res.status(200).json({ success: true, blog });
  } catch (error: any) {
    console.error('[BlogController] updateBlog Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    blogCache.flushAll(); // Clear cache on delete
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    console.error('[BlogController] deleteBlog Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getRecommendedBlogs = async (req: Request, res: Response) => {
  try {
    const { currentBlogId, category, tags } = req.query;
    
    const query: any = {
      status: 'published',
      _id: { $ne: currentBlogId }
    };

    if (category || tags) {
      query.$or = [
        { category: category },
        { tags: { $in: Array.isArray(tags) ? tags : [tags] } }
      ];
    }

    const blogs = await Blog.find(query)
      .sort('-analytics.views -createdAt')
      .limit(4)
      .lean();

    res.status(200).json({ success: true, blogs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
