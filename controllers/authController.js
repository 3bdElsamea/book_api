const User = require("../models/User");
const Factory = require("./../utils/factory");
const {success} = require("./../utils/response");
const {createToken} = require("./../utils/auth.helper")

module.exports.signup = Factory.createOne(User);

module.exports.login = async (req, res) => {
    const user = await User.authenticate(req);
    const token = createToken(user._id);
    success(res, 200, {token});
};

module.exports.logout = async (req, res) => {
    delete req.headers.authorization;
    success(res, 200, {message: "Logged out successfully"});
}

module.exports.getProfile = Factory.getOne(User);

module.exports.updateProfile = Factory.updateOne(User);