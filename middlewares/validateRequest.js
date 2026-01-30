const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 1) {
    errors.push('Nombre requerido');
  }

  if (price === undefined || typeof price !== 'number' || price < 0) {
    errors.push('Precio invalido');
  }

  const validCategories = ['electronics', 'clothing', 'food', 'books', 'other'];
  if (!category || !validCategories.includes(category)) {
    errors.push('Categoria invalida');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = [];

  if (!username || username.trim().length < 1) {
    errors.push('Username requerido');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Email invalido');
  }

  if (!password || password.length < 6) {
    errors.push('Password minimo 6 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) errors.push('Email requerido');
  if (!password) errors.push('Password requerido');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, message: 'ID invalido' });
  }

  next();
};

module.exports = { validateProduct, validateRegister, validateLogin, validateObjectId };
