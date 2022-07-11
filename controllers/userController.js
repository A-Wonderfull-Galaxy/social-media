const { User } = require("../models");

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find()
        .then((response) => res.json(response))
    },

    // get single user
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then((response) => res.json(response))
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then((response) => res.json(response))
    },

    // uupdate User
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
        })
            .then((response) => res.json(response))
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((response) => res.json(response))
    },

    addFriend({ params }, res) {
        User.findOne({ _id: params.friendId }).then(({ _id }) => {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: _id } },
            { new: true }
        )
            .then((response) => res.json(response))
        });
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then((response) => res.json(response))
    },
};

module.exports = userController;