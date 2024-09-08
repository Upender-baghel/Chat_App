const bcrypt = require("bcrypt");

exports.serverErrorResponse = async (res, error) => {
  console.log("Error :", error.message);
  return res.status(500).send({ error: "Something broke!" });
};

// Function to validate the request body against a Joi schema
exports.validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error.details[0].message  )
      return res.status(400).send({ error: error.details[0].message });
    }
    next();
  };
};

exports.hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

exports.bcryptCompare = async (password, hash) => {
  const compare = await bcrypt.compare(password, hash);
  return compare;
};
