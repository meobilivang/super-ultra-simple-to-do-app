const express = require('express');
const taskRouter = express.Router();

//const taskController = require('../controllers/taskController');

taskController.get('/list', taskController.getListTask);
taskController.get('/list/:id', taskController.getSingleTask);
taskController.post('/create', taskController.createTask);
taskController.patch('/update', taskControllerController.updateTask);
taskController.delete('/delete', taskController.deleteTask);

module.exports = taskRouter;