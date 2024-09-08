const express = require("express");
const { userSchema, userLogin } = require("../middleware/schemaValidation");
const { userSignUp, login, viewUser } = require("../controller/user");
const { validateRequest } = require("../utils/commonFunction");
const { checkLogin } = require("../middleware/auth");
const router = express.Router();

router.post("/sign-up", validateRequest(userSchema), userSignUp);
router.post("/login", validateRequest(userLogin), login);

router.get("/user/view", checkLogin, viewUser);

module.exports = router;
