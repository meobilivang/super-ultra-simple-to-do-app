/**
 * Collection of Error Message in Response 
 */
const errorDescription = {};

errorDescription.notAuthenticated = "Not Authenticated! Please authenticate yourself to continue"
errorDescription.undefinedRoute = "This route is not valid! Please return to valid routes"

errorDescription.missingCredentials = "Missing credentials !";
errorDescription.wrongCredentials = "Wrong Credentials";


/**
 * Description for Errors
 */
const errorMessage = {};

errorMessage.notAuthenticated = "";
errorMessage.undefinedRoute = "Undefined Route !";

errorMessage.missingCredentials = "Please provide your username/password";
errorMessage.wrongCredentials = "Please re-enter your credentials";

/**
 *  Collection of Success Messages
 */
const successMessage = {};

successMessage.completeAuthentication = "Successfully Authenticated!";
successMessage.userSignedUpSuccess = "Successfully Signed Up!";

//Board constants
successMessage.boardListRead = "Successfully found your Board list";
successMessage.boardRead = "Successfully found your Board";
successMessage.boardCreated = "New Board has been created!";
successMessage.boardUpdated = "Existing Board has been updated!";
successMessage.boardDeleted = "Your Board has been deleted!";


module.exports = {
    errorMessage,
    errorDescription,
    successMessage,
}