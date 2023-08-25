const User = require("../models/User");
const Factory = require("./../utils/factory");
const {success} = require("./../utils/response");
const {createToken} = require("./../utils/auth.helper")

module.exports.signup = Factory.createOne(User);

module.exports.login = async (req, res, next) => {
    const user = User.authenticate();
    const token = createToken(user._id);
    success(res, 200, {token});
};