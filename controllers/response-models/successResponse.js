exports.successRes = (message, statusCode, data) => {
    return {
        message,
        error: null,
        status_code: parseInt(statusCode),
        data
    };
}

exports.successAuthRes = (message, statusCode, token) => {
    return {
        message,
        error: null,
        status_code: parseInt(statusCode),
        token
    };
}