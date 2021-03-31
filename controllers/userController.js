const User = require('../models/userModel');
const { successRes } = require('./response-models/successResponse');
const AppError = require("../utils/appError");
const { errorDescription, errorMessage, successMessage } =  require('../utils/const');

exports.getUser = async (req, res, next) => {
    try {

        const searchUser = await User.findById(req.params.id);

        if (!searchUser) {
            return next(new AppError(404, errorDescription.notFound, errorMessage.notFound), req, res, next);
        }

        return res
            .status(200)
            .json(successRes(successMessage.userFound, 200, 
            {
                id: searchUser.id,
                userName: searchUser.userName, 
                fullName: searchUser.fullName, 
                email: searchUser.email, 
                description: searchUser.description,
                gender: searchUser.gender, 
                created_at: searchUser.createdAt,
                updated_at: searchUser.updatedAt
            })
        );

    } catch(err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {

        const deleteUser = await User.findByIdAndDelete(req.params.id);

        if (!deleteUser) {
            return next(new AppError(404, errorDescription.unableDelete, errorMessage.unableDelete), req, res, next);
        }

        return res
                .status(204)
                .json(successRes(successMessage.userDeleted, 204, 
                {
                    id: deleteUser.id
                })
        );

    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {

        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updateUser) {
            return next(new AppError(404, errorDescription.unableUpdate, errorMessage.unableUpdate), req, res, next);
        }

        return res
                .status(204)
                .json(successRes(successMessage.userUpdated, 204, { id: updateUser.id}));

    } catch (error) {
        next(error);
    }
};