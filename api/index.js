const express = require('express');
const connectDB = require('../src/config/db')
const authRoutes = require('../src/routes/authRoutes');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true // Allow cookies with credentials
}));

app.use(cookieParser());


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000; // Or any port of your choice
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Call connectDB to establish the database connection
connectDB();
