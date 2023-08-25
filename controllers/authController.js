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
    /* The logout should be implemented using cookies or local storage in the front-end
    * because in RESTFull Apis  the server is stateless and using cookies or local storage
    * will break this rule
    *
    * the Provided solution for this problem is not the best solution
    * it's better to use cookies or local storage in the front-end
    * */
    // Update the user's loggedOutAt field
    await User.findByIdAndUpdate(req.user._id, {loggedOutAt: Date.now()});
    success(res, 200, {message: "Logged out successfully"});
}

module.exports.getProfile = Factory.getOne(User);

module.exports.updateProfile = Factory.updateOne(User);