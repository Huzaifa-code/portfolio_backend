const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // portfolio is database name
        const mongoURI = process.env.MONGO_URI;
        // const mongoURI = 'mongodb://localhost:27017/portfolio';

        // Connect to mongoDB
        await mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to MongoDB 🚀 ")
 
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
} 

module.exports = connectDB; 