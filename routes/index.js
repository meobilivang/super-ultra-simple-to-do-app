const express = require('express');
const router = express.Router();

const boardRouter = require('./boardRoutes');
const userRouter = require('./userRoutes');
const taskRouter = require('./taskRoutes');
const requireAuth = require('../middlewares/require-auth');

//Requires JWT to access these APIs
router.use(['/board', '/task', '/user'], requireAuth);

router.use('/user', userRouter);
router.use('/board', boardRouter);
router.use('/task', taskRouter);

module.exports = router;