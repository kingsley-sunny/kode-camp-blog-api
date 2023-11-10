const { validationResult } = require('express-validator')
const { StatusCodes } = require('http-status-codes')
const CustomErrorApi = require('../../helpers/customErrorApi')

const CustomValidateResult = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const validationErrors = new Set(
            errors.array().map((value) => value.msg),
        )

        next(
            new CustomErrorApi(
                `Validation error: ${Array.from(validationErrors).join(', ')}`,
                StatusCodes.BAD_REQUEST,
            ),
        )
    }
    next()
}

module.exports = CustomValidateResult
