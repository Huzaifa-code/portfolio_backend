const { body, validationResult } = require('express-validator');


const validateEmail = [
    body('email').isEmail().withMessage('Invalid email format'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
  
  module.exports = validateEmail;