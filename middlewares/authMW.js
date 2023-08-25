const User = require("../models/User");
const AppError = require("../utils/appError");
const {verifyToken} = require("./../utils/auth.helper")

module.exports = async (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized - No Bearer Token Provided", 401));
    }
    const token = authorization.split(" ")[1];
    const decoded = verifyToken(token);
    console.log(decoded.id);
    req.user = await User.checkUser(decoded.id);

    next();
};