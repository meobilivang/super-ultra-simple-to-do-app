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
        
        //Check existence of User, Board from Ids
        let isIdsExist = values.every(elem => elem != null); 
        
        //Check whether Board belongs to this User
        if (isIdsExist & typeof values == "object") {
            return String(values[1].ownerId).localeCompare(String(values[0].id)) == 0;
        }
        
        return false;
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

        const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
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

        //Check whether Ids are valid
        if (!await isValidBoardId(req.user.id, req.body.boardId)) {
            return next(new AppError(404, errorDescription.notFound, errorMessage.notFound), req, res, next);
        }

        const createTask = await Task.create(req.body);

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

        const searchTask = await Task.findById(req.params.id);

        if (!searchTask) {
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
        //next(error);
        next(new AppError(404, errorDescription.notFound, errorMessage.notFound), req, res, next);
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
        if (!await isValidBoardId(req.user.id, req.body.boardId)) {
            return next(new AppError(404, errorDescription.notFound, errorMessage.notFound), req, res, next);
        }

        const taskList = await Task
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
        //next(error);
        next(new AppError(404, errorDescription.notFound, errorMessage.notFound), req, res, next);
    }

};

exports.modules = {
      
};