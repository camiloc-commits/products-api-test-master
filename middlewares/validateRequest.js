const { z } = require('zod');

const productSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number({ required_error: 'Price is required', invalid_type_error: 'Price must be a number' }).min(0, 'Price must be positive'),
  stock: z.number().min(0, 'Stock must be positive').optional(),
  category: z.enum(['electronics', 'clothing', 'food', 'books', 'other'], { required_error: 'Category is required', invalid_type_error: 'Invalid category' })
});

const registerSchema = z.object({
  username: z.string({ required_error: 'Username is required' }).min(1, 'Username is required'),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
  password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
  role: z.enum(['user', 'admin']).optional()
});

const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required')
});

const validateProduct = (req, res, next) => {
  const result = productSchema.safeParse(req.body);
  
  if (!result.success) {
    const errors = result.error.errors.map(e => e.message);
    return res.status(400).json({ success: false, errors });
  }
  
  req.body = result.data;
  next();
};

const validateRegister = (req, res, next) => {
  const result = registerSchema.safeParse(req.body);
  
  if (!result.success) {
    const errors = result.error.errors.map(e => e.message);
    return res.status(400).json({ success: false, errors });
  }
  
  req.body = result.data;
  next();
};

const validateLogin = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);
  
  if (!result.success) {
    const errors = result.error.errors.map(e => e.message);
    return res.status(400).json({ success: false, errors });
  }
  
  req.body = result.data;
  next();
};

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, message: 'Invalid ID' });
  }

  next();
};

module.exports = { validateProduct, validateRegister, validateLogin, validateObjectId };
