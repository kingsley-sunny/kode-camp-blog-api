function asyncWrapper(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error.message)
            next(error)
        }
    }
}

module.exports = asyncWrapper
