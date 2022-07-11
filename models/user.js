const { Schema, model } = require("mongoose");
const formatDate = require("../utils/formatDate");
const Posting = require("./posting");

//creates the user schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Provide a username!"],
            maxLength: [50, "Shorten your username"],
        },
        email: {
            type: String,
            required: [true, "Enter an email address!"],
            unique: true,
            match: [
                /^([a-z0-9_\.-]+)@([da-z\.-]+).([a-z\.]{2,6})$/,
                "Provide a valid email address",
            ],
        },
        postings: [
            {
                type: Schema.Types.ObjectId,
                ef: "Posting",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ], 
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", UserSchema);
module.exports = User;