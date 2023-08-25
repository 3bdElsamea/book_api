const joi = require('joi');
const ValidationMW = require('./../middlewares/validationMW');

const createBookSchema = joi.object({
    title: joi.string().required().trim(),
    author: joi.string().required().trim(),
    description: joi.string().min(10).required().trim(),
    cover: joi.string().uri().required().trim(),
});

const updateBookSchema = joi.object({
    title: joi.string().trim(),
    author: joi.string().trim(),
    description: joi.string().min(10).trim(),
    cover: joi.string().uri().trim(),
});

module.exports = {
    createBookValidation: ValidationMW(createBookSchema),
    updateBookValidation: ValidationMW(updateBookSchema)
};