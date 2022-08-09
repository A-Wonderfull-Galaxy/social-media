const { Posting, User } = require("../models");

const postingController = {
  // gets postings
  getAllPostings(req, res) {
    Posting.find({})
      .then((dbPostingData) => {
        res.json(dbPostingData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get postings by id
  getPostingById({ params }, res) {
    Posting.findById({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbPostingData) => {
        res.json(dbPostingData);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // create a posting
  createPosting({ body }, res) {
    Posting.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { posting: _id } },
          { new: true, runValidators: true }
        );
      })
      .then((dbUserData) => {
        res.json(dbUserData);
      })
  },
  // update psot by id
  updatePosting({ params, body }, res) {
    Posting.findByIdAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbPostingData) => {
        res.json(dbPostingData);
      })
  },
  // add a reaction 
  addReaction({ params, body }, res) {
    Posting.findOneAndUpdate(
      { _id: params.id },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbPostingData) => {
        res.json(dbPostingData);
      })
  }
};

module.exports = postingController;