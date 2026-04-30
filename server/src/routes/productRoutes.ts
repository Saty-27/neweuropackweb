import { Router } from 'express';
import { 
  getProducts, 
  getProductBySlug, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  uploadMultipleImages,
  generateAIImage
} from '../controllers/productController';
import { protect, authorizePermission } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.route('/')
  .get(getProducts)
  .post(protect, authorizePermission('products', 'create'), upload.array('images', 5), createProduct as any);

// NEW: Standalone multi-upload route for Gallery Manager
router.post('/upload-multiple', protect, authorizePermission('products', 'edit'), upload.array('images', 10), uploadMultipleImages as any);

// NEW: AI Image Generation
router.post('/generate-ai-image', protect, authorizePermission('products', 'edit'), generateAIImage);

// Public: get single product by slug or ID
router.get('/slug/:slug', getProductBySlug as any);

router.route('/:id')
  .put(protect, authorizePermission('products', 'edit'), upload.array('images', 5), updateProduct as any)
  .delete(protect, authorizePermission('products', 'delete'), deleteProduct as any);

export default router;
