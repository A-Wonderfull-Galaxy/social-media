const router = require("express").Router();

const {
    getAllPostings,
    getPostingById,
    createPosting,
    updatePosting,
    deletePosting,
    addReaction,
    deleteReaction
} = require("../../controllers/postingController");

router.route("/")
    .get(getAllPostings)
    .post(createPosting);

router.route("/:id")
    .get(getPostingById)
    .put(updatePosting)
    .delete(deletePosting);

router.route("/:id/reactions")
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;