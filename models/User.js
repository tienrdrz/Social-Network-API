const { Schema, model } = require('mongoose');
const validator = require('validator')

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
            validate: {
                 validator: validator.isEmail, 
                 message: 'Please use a valid email address',
                 isAsync: false
                },
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'Please use a valid email address']
        },
        thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'    
        }
    ],
        friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'    
        }
    ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;