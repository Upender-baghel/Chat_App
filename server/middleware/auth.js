const jwt = require("jsonwebtoken");
const { serverErrorResponse } = require("../utils/commonFunction");

exports.checkLogin = async (req, res, next) => {
  try {
    const token = req?.session?.token;

    if (!token) {
      return res.status(401).send({ error: "Access denied" });
    }

    const verify = jwt.verify(token, process.env.SECRET_KEY);
    if (!verify) {
      return res.status(401).send({ error: "Access denied" });
    }

    req.user = verify;

    next();
  } catch (error) {
    serverErrorResponse(res, error);
  }
};
