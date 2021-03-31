const Task = require('../models/taskModel');
const Board = require('../models/boardModel');
const User = require('../models/userModel')

const { successRes } = require('./response-models/successResponse');
const AppError = require("../utils/appError");
const { errorDescription, errorMessage, successMessage } =  require('../utils/const');
const { search } = require('../app');

/**
 *  Query into Database & check existence of:
 *  - Board Id
 *  - User Id
 * @param {*} userId 
 * @param {*} boardId 
 * @returns 
 */
const isValidBoardId =  async (userId, boardId) => {
    return Promise.all([User.findById(userId), Board.findById(boardId)]).then(values => {
        return values.every(elem => elem === true);
    });
};

/**
 *  Delete an existing Task
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.deleteTask = async (req, res, next) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);

        if (!deleteTask) {
            return next(new AppError(404, errorDescription.unableDelete, errorMessage.unableDelete), req, res, next);
        }

        res
            .status(200)
            .json(successRes(successMessage.taskDeleted, 200, { id: deleteTask.id }));
    
    } catch (error) {
        //next(error);
        next(new AppError(404, errorDescription.unableDelete, errorMessage.unableDelete), req, res, next);
    }
};

/**
 *  Update an existing Task
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.updateTask = async (req, res, next) => {
    try {

        const updateTask = await task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updateTask) {
            return next(new AppError(404, errorDescription.unableUpdate, errorMessage.unableUpdate), req, res, next);
        }

        res
            .status(200)
            .json(successRes(successMessage.taskUpdated, 200, { id: updateTask.id }));

    } catch (error) {
        //next(error);
        next(new AppError(404, errorDescription.unableUpdate, errorMessage.unableUpdate), req, res, next);
    }
};

/**
 *  Create a new Task
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.createTask = async (req, res, next) => {
    try {
         

        const createTask = await task.create(req.body);

        if (!createTask) {
            return next(new AppError(404, errorDescription.unableCreate, errorMessage.unableCreate), req, res, next);
        }

        res
            .status(200)
            .json(successRes(successMessage.taskCreated, 200, { id: createTask.id }));

    } catch (error) {
        //next(error);
        next(new AppError(404, errorDescription.unableCreate, errorMessage.unableCreate), req, res, next);
    }
};

/**
 *  Get a Task by Id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getSingleTask = async (req, res, next) => {
    try {

        const searchTask = await task.findById(req.params.id);

        if (!updateTask) {
            return next(new AppError(404, errorDescription.notFound, errorMessage.notFound), req, res, next);
        }

        res
            .status(200)
            .json(successRes(successMessage.taskListFound, 200, {
                id: searchTask.id,
                description: searchTask.description,
                ownerId: searchTask.ownerId,
                boardId: searchTask.boardId,
                createdAt: searchTask.createdAt,
                updatedAt: searchTask.updatedAt 
            }));

    } catch (error) {
        next(error);
    }
};

/**
 *  Get full List of Task from an User
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getTaskList = async (req, res, next) => {
    try {
        
        //Check whether Ids are valid
        if (!isValidBoardId(req.user.userId, req.boardId)) {

        }

        const taskList = await task
                                    .find({ ownerId: req.user.id })
                                    .select('description')
                                    .select('boardId')
                                    .select('ownerId')
                                    .select('createdAt')
                                    .select('updatedAt');

        if (!taskList)
            return next(new AppError(404, errorDescription.notFound, errorMessage.notFound), req, res, next);


        res
            .status(200)
            .json(successRes(successMessage.taskListFound, 200, taskList));

    } catch (error) {
        next(error);
    }

};

exports.modules = {
      
};