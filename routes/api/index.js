const router = require("express").Router();
const userRoutes = require("./user-routes");
const postingRoutes = require("./postingRoutes");

router.use("/users", userRoutes);
router.use("/postings", postingRoutes);

module.exports = router;