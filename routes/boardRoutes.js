const express = require('express');
const boardRouter = express.Router();

const { getBoardList, getSingleBoard, createBoard, updateBoard, deleteBoard }  = require('../controllers/boardController');

boardRouter.get('/list', getBoardList);
boardRouter.get('/:id', getSingleBoard);
boardRouter.post('/create', createBoard);
boardRouter.patch('/update', updateBoard);
boardRouter.delete('/delete', deleteBoard);

module.exports = boardRouter;