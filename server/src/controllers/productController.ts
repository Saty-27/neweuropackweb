import { Request, Response } from 'express';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';
import NodeCache from 'node-cache';

const productCache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

export const getProducts = async (req: Request, res: Response) => {
  try {
    const cachedProducts = productCache.get('all_products');
    if (cachedProducts) {
      return res.status(200).json({ success: true, data: cachedProducts, cached: true });
    }

    const products = await Product.find().sort({ order: 1, createdAt: -1 }).lean();
    productCache.set('all_products', products);
    res.status(200).json({ success: true, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const cachedProduct = productCache.get(`product_${slug}`);
    if (cachedProduct) {
      return res.status(200).json({ success: true, data: cachedProduct, cached: true });
    }

    const product = await Product.findOne({ slug }).lean();
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    
    productCache.set(`product_${slug}`, product);
    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const productData = req.body;
    
    if (!productData.slug && productData.title) {
      productData.slug = productData.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    const product = await Product.create(productData);
    productCache.flushAll(); // Clear all cache on new product
    res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const productData = req.body;
    
    if (!productData.slug && productData.title) {
      productData.slug = productData.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

    productCache.flushAll(); // Clear cache on update
    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    
    productCache.flushAll(); // Clear cache on delete
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const uploadMultipleImages = async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ success: false, error: 'No files uploaded' });
    }

    const files = req.files as Express.Multer.File[];
    const uploadedPaths = files.map(file => {
      return file.path.replace(/\\/g, '/').replace(/^.*uploads\//, 'uploads/');
    });

    res.status(200).json({ success: true, data: uploadedPaths });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const generateAIImage = async (req: Request, res: Response) => {
  try {
    const { prompt, productName } = req.body;
    if (!prompt) return res.status(400).json({ success: false, error: 'Prompt is required' });

    console.log(`[AI] Generating image for: ${productName}`);
    
    // Mock response for now
    res.status(200).json({
      success: true,
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', // Stock pallet image
      message: 'AI image generated (Demo Mode)'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
