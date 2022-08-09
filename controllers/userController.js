const { User } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
  },
  // get a single by id
  getUserById({ params }, res) {
    User.findById({ _id: params.id })
      .populate({
        path: "postings",
        select: "-__v",
      })
      .then((dbUserData) => {
        res.json(dbUserData);
      })
  },
  // POST a new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
  },
  // update a user by id
  updateUser({ params, body }, res) {
    User.findByIdAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        res.json(dbUserData);
      })
  },
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        res.json(dbUserData);
      })
  },
};

module.exports = userController;