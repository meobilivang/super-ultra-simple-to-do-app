/**
 * Collection of Error Message in Response 
 */
const errorMessage = {};

errorMessage.notAuthenticated = "Not Authenticated! Please authenticate yourself to continue"

errorMessage.undefinedRoute = "This route is not valid! Please return to valid routes"

/**
 * Description for Errors
 */
const errorDescription = {};

errorDescription.notAuthenticated = "";
errorDescription.undefinedRoute = "Undefined Route !";

/**
 *  Collection of Success Messages
 */
const successMessage = {};


module.exports = {
    errorMessage,
    errorDescription,
    successMessage,
}