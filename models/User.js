const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AppError = require("../utils/appError");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
        maxlength: [20, "Name can't exceed 20 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (val) {
                return val.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            },
            message: "Please provide a valid email",
        },
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        trim: true,
        minlength: [8, "Password must be at least 8 characters long"],
        select: false,
    },
    /*
    * This Field Is only for implementing the logout functionality without Using Cookies or Sessions
    * Because we Cookies and Sessions will break the stateless nature of RESTful APIs
    * and its better to use Cookies or Sessions in the front-end
    * */
    loggedOutAt: {
        type: Date,
        default: null,
    },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
});


// User Static Method to authenticate user by email and password
userSchema.statics = {
    authenticate:
        async function ({body: {email, password}}) {
            if (!email || !password) throw new AppError("Please provide email and password", 400);
            const user = await this.findOne({email}).select("+password");
            if (!user) throw new AppError("Incorrect email or password", 401);

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new AppError("Incorrect email or password", 401);
            return user;

        },

    checkUser: async function (id) {
        const user = await this.findById(id);
        if (!user) throw new AppError("User of this token not found", 404);
        return user;
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;