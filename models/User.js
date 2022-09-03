const { Schema, model } = require('mongoose');
const { User } = require('.');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: 'Email is required',
            unique: true,
            validate: [validateEmail, 'Please use a valid email address'],
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'Please use a valid email address']
        },
        thoughts: {

        },
        friends: {
            
        }
    }
);

const User = model('User', UserSchema);

module.exports = User