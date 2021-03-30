exports.successRes = (message, statusCode, data) => {
    return {
        message,
        error: null,
        status: parseInt(statusCode),
        data
    };
}