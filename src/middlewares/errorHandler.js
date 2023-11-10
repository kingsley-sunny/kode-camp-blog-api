const { StatusCodes } = require("http-status-codes");
const CustomErrorApi = require("../helpers/customErrorApi");

function errorHandler(err, req, res) {
    if (err instanceof CustomErrorApi) {
        return res
            .status(err.statusCode)
            .json({ message: err.message, error: true, statusCode: err.statusCode });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: true,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
}

module.exports = errorHandler;
