//MongoDB pw:K4j365J7im8mUB.
//MongoDB connection: mongodb+srv://vszabolcs88:<password>@cluster0.eor0yls.mongodb.net/?retryWrites=true&w=majority
const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/sauces');
const userRouter = require('./routes/user');
const cors = require("cors")

const app = express();


mongoose.connect('mongodb+srv://vszabolcs88:K4j365J7im8mUB.@cluster0.eor0yls.mongodb.net/test')
.then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(cors());
app.use(express.json());
app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRouter);

module.exports = app;