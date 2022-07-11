const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/formatDate");
const formatDate = require("../utils/formatDate");
const User = require("./User");

//reply schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: [280, "Please shorten your reaction"],
        },
        username: {
            type: String,
            require: true,
        },
        createdAt: {
            type: Date,
            defatult: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },  
    }
);

//post schema
const PostingSchema = new Schema(
    {
        postingText: {
            type: String,
            required: "Your posting cannot be empty!",
            minLength: [1, "Posting is too short"],
            maxlength: [280, "Please shorten your posting."],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => formatDate(createdAtVal),
        },
            username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

//reply function
PostingSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Posting = model("Posting", PostingSchema);
module.exports = Posting;