const Task = require('../models/taskModel');
const { successRes } = require('./response-models/successResponse');
const AppError = require("../utils/appError");
const { errorDescription, errorMessage, successMessage } =  require('../utils/const');

exports.deleteTask = async (req, res, next) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);

        if (!deleteTask) {
            return next(new AppError(404, errorDescription.unableDelete, errorMessage.unableDelete), req, res, next);
        }

        return res
                .status(200)
                .json(successRes(successMessage.taskDeleted, 200, { id: deleteTask.id }));
    
            } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {

        const updateTask = await task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updateTask) {
            return next(new AppError(404, errorDescription.unableUpdate, errorMessage.unableUpdate), req, res, next);
        }

        return res
                .status(200)
                .json(successRes(successMessage.taskUpdated, 200, { id: updateTask.id }));

    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const createTask = await task.create(req.body);

        if (!createTask) {
            return next(new AppError(404, errorDescription.unableCreate, errorMessage.unableCreate), req, res, next);
        }

        return res
                .status(200)
                .json(successRes(successMessage.taskCreated, 200, { id: createTask.id }));

    } catch (error) {
        next(error);
    }
};

exports.getSingleTask = async (req, res, next) => {
    try {

        const searchTask = await task.findById(req.params.id);

        if (!updateTask) {
            return next(new AppError(404, errorDescription.notFound, errorMessage.notFound), req, res, next);
        }

        return res
                .status(200)
                .json(successRes(successMessage.taskListFound, 200, { id: searchTask.id }));

    } catch (error) {
        next(error);
    }
};

exports.getTaskList = async (req, res, next) => {
    try {
        
        const taskList = await task.find({ owner_id: req.user.id }).exec();

        if (!taskList)
            return next(new AppError(404, errorDescription.notFound, errorMessage.notFound), req, res, next);


        return res
                .status(200)
                .json(successRes(successMessage.taskListFound, 200, taskList));

    } catch (error) {
        next(error);
    }

};

exports.modules = {
      
};