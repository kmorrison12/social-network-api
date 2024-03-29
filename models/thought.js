const { MongoMissingCredentialsError } = require('mongodb')
const { Schema, model } = require('mongoose')
// const moment = require ('moment')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,                                                                              
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method to format timestamp

        },
    },
    {
        toJSON: {
            getters: true
        }
    }
)


const thoughtSchema = new Schema(
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
            // get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh: mm a')

        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought
