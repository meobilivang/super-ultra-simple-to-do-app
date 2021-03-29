const express = require('express');
const router = express.Router();

const boardRouter = require('./boardRoutes');
const userRouter = require('./userRoutes');
const taskRouter = require('./taskRoutes');

router.user('/user', userRouter);
router.use('/board', boardRouter);
router.user('/task', taskRouter);

module.exports = router;