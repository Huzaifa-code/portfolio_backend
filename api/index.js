const express = require('express');
const connectDB = require('../src/config/db')
const authRoutes = require('../src/routes/authRoutes');
const commentRoutes = require('../src/routes/commentRoutes');
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


app.get('/', (req, res) => {
  res.send("<h1>Backend of Huzaifa's Portfolio</h1>")
})

app.use('/api/auth', authRoutes);
app.use('/api', commentRoutes);


const PORT = process.env.PORT || 5000; // Or any port of your choice
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Call connectDB to establish the database connection
connectDB();
