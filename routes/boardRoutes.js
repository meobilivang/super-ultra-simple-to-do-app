const express = require('express');
const boardRouter = express.Router();

//const boardController = require('../controllers/boardController');

boardController.get('/list', boardController.getListBoard);
boardController.get('/list/:id', boardController.getSingleBoard);
boardController.post('/create', boardController.createBoard);
boardController.patch('/update', boardController.updateBoard);
boardController.delete('/delete', boardController.deleteBoard);

module.exports = boardRouter;