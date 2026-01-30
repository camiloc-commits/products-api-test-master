const Product = require('../models/Product');

const getAll = async (req, res, next) => {
  try {
    const query = {};
    
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const product = await Product.create({ name, description, price, stock, category });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    await product.deleteOne();

    res.json({ success: true, message: 'Producto eliminado' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
