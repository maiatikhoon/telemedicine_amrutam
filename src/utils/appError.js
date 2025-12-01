
class AppError extends Error {

    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.operational = true;
    }
}

module.exports = AppError; 