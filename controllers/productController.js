const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  const product = new Product({
    name,
    description,
    price,
    quantity,
    category
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, description, price, quantity, category } = req.body;
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;
    if (category) product.category = category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/products/:id - Remove Product by id
exports.deleteProductById = (req, res) => {
    const productId = req.params.id;
  
    Product.findByIdAndDelete(productId)
      .then(deletedProduct => {
        if (!deletedProduct) {
          return res.status(404).send('Product not found');
        }
        res.json({ message: `Deleted product: ${deletedProduct.name}` });
      })
      .catch(error => {
        res.status(500).send('Error deleting product');
      });
  };
  
  // DELETE /api/products - Remove all Products
  exports.deleteAllProducts = (req, res) => {
    Product.deleteMany({})
      .then(() => {
        res.json({ message: 'All products deleted' });
      })
      .catch(error => {
        res.status(500).send('Error deleting products');
      });
  };
  
  // GET /api/products?name=[kw] - Find all Products which name contains 'ae'
  exports.getProductsByName = (req, res) => {
    const { name } = req.query;
    if (name) {
      Product.find({ name: { $regex: name, $options: 'i' } }) // Case-insensitive search
        .then(products => {
          res.json(products);
        })
        .catch(error => {
          res.status(500).send('Error fetching products');
        });
    } else {
      Product.find({})
        .then(products => {
          res.json(products);
        })
        .catch(error => {
          res.status(500).send('Error fetching products');
        });
    }
  };
  




// const Product = require('../models/Product');

// // DELETE /api/products/:id - Remove Product by id
// exports.deleteProductById = (req, res) => {
//   const productId = req.params.id;

//   Product.findByIdAndDelete(productId)
//     .then(deletedProduct => {
//       if (!deletedProduct) {
//         return res.status(404).send('Product not found');
//       }
//       res.json({ message: `Deleted product: ${deletedProduct.name}` });
//     })
//     .catch(error => {
//       res.status(500).send('Error deleting product');
//     });
// };

// // DELETE /api/products - Remove all Products
// exports.deleteAllProducts = (req, res) => {
//   Product.deleteMany({})
//     .then(() => {
//       res.json({ message: 'All products deleted' });
//     })
//     .catch(error => {
//       res.status(500).send('Error deleting products');
//     });
// };

// // GET /api/products?name=[kw] - Find all Products which name contains 'ae'
// exports.getProductsByName = (req, res) => {
//   const { name } = req.query;
//   if (name) {
//     Product.find({ name: { $regex: name, $options: 'i' } }) // Case-insensitive search
//       .then(products => {
//         res.json(products);
//       })
//       .catch(error => {
//         res.status(500).send('Error fetching products');
//       });
//   } else {
//     Product.find({})
//       .then(products => {
//         res.json(products);
//       })
//       .catch(error => {
//         res.status(500).send('Error fetching products');
//       });
//   }
// };
