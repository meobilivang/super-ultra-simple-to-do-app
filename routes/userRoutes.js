const express = require('express');
const userRouter = express.Router();

const { getUser, updateUser, deleteUser } = require('../controllers/userController');

userRouter.get('/:id', getUser);
userRouter.patch('/update/:id', updateUser);
userRouter.delete('/delete/:id', deleteUser);

module.exports = userRouter;