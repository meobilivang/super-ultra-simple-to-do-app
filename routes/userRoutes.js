const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');

userRouter.get('/:id', userController.getUser);
userRouter.patch('/update', userController.updateUser);
userRouter.delete('/delete', userController.deleteUser);

module.exports = userRouter;