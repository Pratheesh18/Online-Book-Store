const express = require('express');
const cors = require('cors');
const connectDatabase = require('./database/dbConnection');
const authRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const dotenv = require('dotenv')
dotenv.config();

connectDatabase();

const app = express();
app.use(
    cors({
      origin: "http://localhost:5173", // Your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static('uploads'));
app.use('/api/auth',authRoutes);
app.use('/api/books',bookRoutes);


const PORT = 5000;
app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
});

