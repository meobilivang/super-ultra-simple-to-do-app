const express = require('express');
const userRouter = express.Router();

// const userController = require('../controllers/userController');
// const authController = require('./../controllers/authController');

userRouter.post('/login', authController.login);
userRouter.post('/signup', authController.signup);

userRouter.get('/:id', userController.getUser);
userRouter.patch('/update', userController.updateUser);
userRouter.delete('/delete', userController.deleteUser);

// // Only admin have permission to access for the below APIs 
// router.use(authController.restrictTo('admin'));

// router
//     .route('/')
//     .get(userController.getAllUsers);


// router
//     .route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser);

module.exports = userRouter;