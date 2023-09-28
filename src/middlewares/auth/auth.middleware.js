const { StatusCodes } = require("http-status-codes");
const Utils = require("../../utils/utils");
const CustomErrorApi = require("../../helpers/customErrorApi");

class AuthMiddleware {
  verifyToken(req, res, next) {
    const headers = req.headers.authorization;

    if (!headers?.startsWith("Bearer")) {
      throw new CustomErrorApi("Unauthorized!", StatusCodes.UNAUTHORIZED);
    }

    try {
      const token = headers.split(" ")[1];
      const user = Utils.verifyToken(token);

      req.user = { id: user.id, username: user.username };
    } catch (error) {
      throw new CustomErrorApi("Unauthorized!", StatusCodes.UNAUTHORIZED);
    }

    next();
  }
}

module.exports = AuthMiddleware;
