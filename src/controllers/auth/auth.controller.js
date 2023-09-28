const { StatusCodes } = require("http-status-codes");
const database = require("../../database/database");
const createSuccessResponse = require("../../helpers/customSuccessResponse");
const CustomErrorApi = require("../../helpers/customErrorApi");
const Utils = require("../../utils/utils");
const asyncWrapper = require("../../middlewares/asyncWrapper");
class AuthController {
  async login(req, res, next) {
    let user = await database.user.findFirst({ where: { username: req.body.username } });

    if (!user) {
      return next(new CustomErrorApi("User not found", StatusCodes.NOT_FOUND));
    }

    const isPasswordValid = await Utils.comparePassword(req.body.password, user.password);

    if (!isPasswordValid) {
      return next(new CustomErrorApi("Invalid password", StatusCodes.UNAUTHORIZED));
    }

    const accessToken = Utils.createAccessToken({ id: user.id, username: user.username });

    res.json(createSuccessResponse({ user, accessToken }, "Login successful"));
  }

  async register(req, res, next) {
    let user = await database.user.findFirst({ where: { username: req.body.username } });

    if (user) {
      return next(new CustomErrorApi("Username already exists", StatusCodes.CONFLICT));
    }

    const hashedPassword = await Utils.hashPassword(req.body.password);

    user = await database.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
    });

    const accessToken = Utils.createAccessToken({ id: user.id, username: user.username });

    res.json(createSuccessResponse({ user, accessToken }, "Registration successful"));
  }

  async getAuthenticatedUser(req, res) {
    const { id } = req.user;

    console.log(id);

    const user = await database.user.findFirst({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });

    return res.json(createSuccessResponse(user));
  }
}

module.exports = AuthController;
