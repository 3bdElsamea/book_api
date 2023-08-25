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
    const user = await User.checkUser(decoded.id);
    // if user loggedOutAt is after the token issuedAt then the token is invalid
    if (user.loggedOutAt && user.loggedOutAt > decoded.iat * 1000) {
        return next(new AppError("The User Already Logged This token Out", 401));
    }
    req.user = user;
    next();
};