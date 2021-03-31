const express = require('express');
const userRouter = express.Router();

const { getUser, updateUser, deleteUser } = require('../controllers/userController');

userRouter.get('/:id', getUser);
userRouter.patch('/update', updateUser);
userRouter.delete('/delete', deleteUser);

module.exports = userRouter;