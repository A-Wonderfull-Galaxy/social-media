const router = require("express").Router();
const {
    getAllPostings,
    getPostingById,
    createPosting,
    addReaction,
    updatePosting,
    deletePosting,
} = require("../../controllers/postingController");

router.route("/").get(getAllPostings);

router.route("/:userId").post(createPosting);

router
    .route("/:id")
    .get(getPostingById)
    .put(updatePosting)
    .delete(deletePosting);

router.route("/:id/reactions").post(addReaction);

module.exports = router;