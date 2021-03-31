const express = require('express');
const taskRouter = express.Router();

const taskController = require('../controllers/taskController');
const { getTaskList, getSingleTask, createTask, updateTask, deleteTask }  = require('../controllers/taskController');

taskRouter.get('/list', getTaskList);
taskRouter.get('/:id', getSingleTask);
taskRouter.post('/create', createTask);
taskRouter.patch('/update/:id', updateTask);
taskRouter.delete('/delete/:id', deleteTask);

module.exports = taskRouter;