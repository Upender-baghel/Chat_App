require("dotenv").config();
const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");
const {
  serverErrorResponse,
  hashPassword,
  bcryptCompare,
} = require("../utils/commonFunction");

exports.userSignUp = async (req, res) => {
  try {
    const { userName, email, password, avatar } = req.body;

    const emailExist = await UserModel.exists({ email });
    if (emailExist) {
      return res.status(409).send({ error: "Email already exists" });
    }

    const hash = await hashPassword(password);
    const createUser = await UserModel.create({
      userName,
      email,
      password: hash,
      avatar,
    });

    return res.status(201).send({ message: "User sign up successfully!" });
  } catch (error) {
    serverErrorResponse(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const dataExists = await UserModel.findOne({ email }).lean();
    if (!dataExists) {
      return res.status(404).send({ error: "Authentication failed" });
    }

    const matchPassword = await bcryptCompare(password, dataExists?.password);

    if (!matchPassword) {
      return res.status(400).send({ error: "Authentication failed" });
    }
    delete dataExists.password;

    const token = await jwt.sign({ ...dataExists }, process.env.SECRET_KEY);
    req.session.token = token;

    return res
      .status(200)
      .send({ message: "Login successfully!", data: dataExists });
  } catch (error) {
    serverErrorResponse(res, error);
  }
};

exports.viewUser = async (req, res) => {
  try {
    const data = await UserModel.find();

    return res
      .status(200)
      .send({ message: "User fetched successfully!", data });
  } catch (error) {
    serverErrorResponse(res, error);
  }
};
