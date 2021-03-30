const express = require('express');
const router = express.Router();

const boardRouter = require('./boardRoutes');
const userRouter = require('./userRoutes');
const taskRouter = require('./taskRoutes');
const requireAuth = require('../middlewares/require-auth');

//Requires JWT to access these APIs
router.use(['/board', '/task'], requireAuth);

router.user('/user', userRouter);
router.use('/board', boardRouter);
router.user('/task', taskRouter);

module.exports = router;