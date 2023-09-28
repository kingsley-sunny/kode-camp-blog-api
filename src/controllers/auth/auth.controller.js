const { StatusCodes } = require("http-status-codes");
const database = require("../../database/database");
const createSuccessResponse = require("../../helpers/customSuccessResponse");
const CustomErrorApi = require("../../helpers/customErrorApi");
const Utils = require("../../utils/utils");
const asyncWrapper = require("../../middlewares/asyncWrapper");
class AuthController {
  login(req, res) {
    res.json({ message: "Login successful" });
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
}

module.exports = AuthController;
