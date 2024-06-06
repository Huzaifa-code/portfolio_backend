// Custom middleware
// Authentication middleware
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Make sure the token is set in cookies
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
