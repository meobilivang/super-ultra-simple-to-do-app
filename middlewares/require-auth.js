const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const { successRes } = require('./response-models/successResponse');
const AppError = require("../utils/appError");
const { errorDescription, errorMessage, successMessage } =  require('../utils/const');

/**
 *  Middleware Checking for Authentication Status
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
let requireAuth = (req, res, next) => {
    
    //Retrieve the Authorization from header
    const { authorization } = req.headers;

    if (!authorization)
        return res
                .status(401)
                //Todo: .json(errorRes(responseMessage.notAuthenticated, res.statusCode, errorDescription.notAuthenticated));
    
    //Retrieve token
    const retrievedToken = authorization.replace('Bearer', '');

    //Validate token
    jwt.verify(retrievedToken, tokenSigning.signingString , async(error, payload) => {
        //Invalid token
        if (error)
            return next(new AppError(404, errorDescription.notAuthenticated, errorMessage.notAuthenticated), req, res, next);
        
        //Get data by decryped token
        const { id } = payload;

        //Find user
        const validUser = await User.findById(id);

        //Attach user Object to request
        req.user = {
            id: validUser.id,
            userName: validUser.userName,
        };
        
        next();
    }); 
    
}

module.exports = requireAuth;
