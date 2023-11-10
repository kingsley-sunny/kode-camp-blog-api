class CustomErrorApi extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = true;
    }
}

module.exports = CustomErrorApi;
