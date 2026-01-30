const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Token invalido' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token requerido' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Requiere rol admin' });
  }
};

module.exports = { protect, admin };
