const express = require('express');
const taskRouter = express.Router();

const taskController = require('../controllers/taskController');
const { getTaskList, getSingleTask, createTask, updateTask, deleteTask }  = require('../controllers/taskController');

taskRouter.get('/list', getTaskList);
taskRouter.get('/:id', getSingleTask);
taskRouter.post('/create', createTask);
taskRouter.patch('/update', updateTask);
taskRouter.delete('/delete', deleteTask);

module.exports = taskRouter;