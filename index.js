require('dotenv').config();
//Package Imports
const express = require('express');

//Constants
const app = express();
const PORT = process.env.PORT || 5000;

//Imported Routes
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
//Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  next();
});

//Routes
app.get('/api/v1/test', (req, res) => {
  res.json({ status: 200, err: null, data: null })
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => console.log(`PORT: ${PORT}`))
