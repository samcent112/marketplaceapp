const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.updateProduct);
// DELETE /api/products/:id - Remove Product by id
// router.delete('/:id', productController.deleteProductById);
// DELETE a product by ID
router.delete('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
  
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

// DELETE /api/products - Remove all Products
router.delete('/', productController.deleteAllProducts);


// GET /api/products?name=[kw] - Find all Products which name contains 'ae'
router.get('/', productController.getProductsByName);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');

// // DELETE /api/products/:id - Remove Product by id
// router.delete('/:id', productController.deleteProductById);

// // DELETE /api/products - Remove all Products
// router.delete('/', productController.deleteAllProducts);

// // GET /api/products?name=[kw] - Find all Products which name contains 'ae'
// router.get('/', productController.getProductsByName);

// module.exports = router;
