const { Router } = require('express')
const AuthController = require('../controllers/auth/auth.controller')
const AuthValidator = require('../middlewares/validators/authValidator')
const CustomValidateResult = require('../middlewares/validators/validate')
const asyncWrapper = require('../middlewares/asyncWrapper')
const AuthMiddleware = require('../middlewares/auth/auth.middleware')

const authRoute = Router()

const authController = new AuthController()
const authValidator = new AuthValidator()
const authMiddleware = new AuthMiddleware()

// Login route
authRoute.post('/login', asyncWrapper(authController.login))

// Register route
authRoute.post(
    '/register',
    authValidator.validateRegistration(),
    CustomValidateResult,
    asyncWrapper(authController.register),
)

// me Route
authRoute.get(
    '/me',
    authMiddleware.verifyToken,
    asyncWrapper(authController.getAuthenticatedUser),
)

module.exports = authRoute
