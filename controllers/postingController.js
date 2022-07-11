const { Posting, User } = require("../models");

const postingController = {
    // Get all post
    getAllPostings(req, res) {
        Posting.find({})
        .populate({
            path: "reactions",
            select: "__v",
        })
        .then((response) => {
            if (!response) res.json({ message: "No Postings found!" });
            res.json(response);
        })
    },

    // Get single post
    getPostingById({ params }, res) {
        Posting.findOne({ _id: params.id }) //Mongoose adds an _id property to your schemas
        .populate({
            path: "Reactions",
            select: "__v",
        })
        .select("__v")
        .then((response) => {
            if (!response) {
                res.json({ message: "Posting not found" });
                return;
            }
        res.json(response);
        })
      
    },

    // Create post
    createPosting({ params, body }, res) {
        Posting.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { postings: _id } },
            { new: true }
            );
        })
        .then((response) => {
            if (!response) {
                res.status(500).json({ message: "Something went wrong." });
                return;
            }
            res.json(response);
        })
      
    },

    //creates a reply
    addReaction({ params, body }, res) {
        Posting.findOneAndUpdate(
        { _id: params.id },
        { push: { reactions: body } },
        { new: true, runValidators: true }
        )
      .then((response) => {
        if (!response) {
            res.status(404).json({ message: "Something went wrong" });
            return;
        }
            res.json(response);
        })
    },

    // Remove reply
    removeReaction({ params, body }, res) {
        Posting.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then((response) => {
            if (!response) {
                res.status(404).json({ message: "Could not find Reaction!" });
            return;
            }
            res.json(response);
        })
    },

    // update post
    updatePosting({ params, body }, res) {
        Posting.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
        .then((response) => {
            if (!response) {
                res.json({ message: "Could not create Posting" });
                return;
            }
            res.json(response);
        })
    },

    // delete posting
    deletePosting({ params }, res) {
        Posting.findOneAndDelete({ _id: params.id })
        .then((response) => {
            if (!response) {
             res.json({ message: "Could not delete posting" });
        }
        return User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { posting: params.postingId } },
            { new: true }
        );
        })
        .then((response) => {
            if (!response) {
                res.status(404), json({ message: "Posting not found." });
            }
        })
    },
};

module.exports = postingController;