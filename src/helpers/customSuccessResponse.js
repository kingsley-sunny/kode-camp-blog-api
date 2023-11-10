const createSuccessResponse = (
    data,
    message = 'Successful',
    statusCode = 200,
) => {
    return { data, message, statusCode }
}

module.exports = createSuccessResponse
