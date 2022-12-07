const express = require('express');
const userRouter = express.Router();

const userCtrl = require('../controllers/user');


userRouter.post('/signup', userCtrl.signup);
userRouter.post('/login', userCtrl.login);

module.exports = userRouter;