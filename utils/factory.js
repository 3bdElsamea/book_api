const {success, deleteResponse} = require('./../utils/response')
const {createToken} = require('./../utils/auth.helper')

module.exports.getAll = (Model) => async (req, res, next) => {
    const docs = await Model.find();
    success(res, 200, {data: docs});
};


module.exports.getOne = (Model) => async (req, res, next) => {
    const doc = Model.modelName === "User" ? req.user : req.doc;
    success(res, 200, {data: doc});
};

module.exports.createOne = (Model) => async ({body}, res, next) => {
    console.log(Model);
    const doc = await Model.create(body);
    if (Model.modelName === "User") {
        const token = createToken(doc._id);
        return success(res, 201, {token, data: doc});
    }
    success(res, 201, {data: doc});
};

module.exports.updateOne = (Model) => async (req, res, next) => {
    const doc = Model.modelName === "User" ? req.user : req.doc;
    Object.keys(req.body).forEach((key) => (doc[key] = req.body[key]));
    await doc.save();
    success(res, 200, {data: doc});
};

module.exports.deleteOne = (Model) => async (req, res, next) => {
    const doc = req.doc;
    await doc.deleteOne();
    deleteResponse(res, `${Model.modelName} deleted successfully`);
};