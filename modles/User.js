var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "email is required"],
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true
    },
    hash: String,

});

UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);