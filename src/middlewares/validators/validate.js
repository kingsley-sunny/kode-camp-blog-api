const { validationResult } = require("express-validator");
const CustomErrorApi = require("../../helpers/customErrorApi");

const CustomValidateResult = async (req, res, next) => {
  console.log(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new CustomErrorApi(
      errors.array().map(value => value.msg),
      400
    );
    return next(error);
  }
  next();
};

module.exports = CustomValidateResult;
