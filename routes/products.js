const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET - Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Crear nuevo producto
router.post('/', async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      stock,
      category
    });
    
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT - Actualizar producto
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, category },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    // Error intencional: intentar acceder a propiedades del producto eliminado
    const totalValue = product.price * product.stock;
    
    res.json({ 
      message: 'Producto eliminado correctamente',
      deletedProduct: product,
      totalValue: totalValue
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Buscar productos por categoría
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
