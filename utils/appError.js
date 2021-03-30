class AppError extends Error {
    constructor(statusCode, status, error, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
        this.error = error;
        this.message = message;
    }

}

module.exports = AppError;