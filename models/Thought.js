const { Schema, model, Types } = require('mongoose');
const { ReactionSchema } = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get: 
        },
        username: {
            type: String,
            required: true
        },
        reactions: {
            reaction: [ReactionSchema]
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;
