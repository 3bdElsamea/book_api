const joi = require('joi');
const ValidationMW = require('./../middlewares/validationMW');

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
});

const signupSchema = joi.object({
    name: joi.string().min(3).max(20).required().trim(),
    email: joi.string().email({
        minDomainSegments: 2,
        tlds: {allow: ['com', 'net']}
    }).required(
    ).trim(),
    password: joi.string().min(8).required().trim(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().trim()
});

const updateProfileSchema = joi.object({
    name: joi.string().min(3).max(20).trim(),
    email: joi.string().email({
        minDomainSegments: 2,
        tlds: {allow: ['com', 'net']}
    }).trim(),
    password: joi.string().min(8).trim()
});

module.exports = {
    loginValidation: ValidationMW(loginSchema),
    signupValidation: ValidationMW(signupSchema),
    updateProfileValidation: ValidationMW(updateProfileSchema)
};