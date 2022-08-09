const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: "enter username",
    trim: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "enter an email address"],
  },

  postings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posting",
    },
  ],

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// user schema
const User = model("User", UserSchema);

module.exports = User;