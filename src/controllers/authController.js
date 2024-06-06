//?  Controllers for handling business logic
//? Controller for authentication
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create Account
exports.signup = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          if (existingUser.username === username) {
              return res.status(400).json({ message: 'Username already taken. Enter a unique username.' });
          } else if (existingUser.email === email) {
              return res.status(400).json({ message: 'User already exists.' });
          } 
        } 

        // Generate a salt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Fetch additional user data from MongoDB
      const userData = {
        userId: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture   // Assuming you have profile picture field in your schema
      };
  
      // Generate JWT token
      const token = jwt.sign(
          { userId: user._id, email }, 
          process.env.SECRET_KEY, 
          { expiresIn: '2h' }
      );
  
      // res.status(200).json({ token });

      console.log("logged in!")


      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'None',
      });
      
      res.status(200).json({ token: token, user: userData  });

    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


// Logout
exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
