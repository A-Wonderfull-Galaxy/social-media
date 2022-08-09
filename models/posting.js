const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dates");

const ReactionSchema = new Schema({
  // set custom id
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: "add a reactrion!",
    validate: [
      ({ length }) => length <= 200,
      "post with 1-200 characeter",
    ],
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});


const postingSchema = new Schema({
    postingText: {
        type: String,
        required: "include a post!",
        validate: [({ length }) => length >= 1 && length <= 200, "post with 1-200 characeter"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
},
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    });


// reaction count
postingSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Posting = model("Posting", postingSchema);

module.exports = Posting;