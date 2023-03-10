const mongoose = require('mongoose');// import mongoose
const bcrypt = require('bcrypt');// import bcrypt

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },

})

userSchema.pre('save', async function(next){ // hash password before saving to database
    if(this.isModified('password')) {
     this.password = await bcrypt.hash(this.password, 10);
     
    }
    next();
})

module.exports = mongoose.model('User', userSchema);