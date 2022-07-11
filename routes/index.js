const router = require("express").Router();
// htmlRoutes = require ./html;
const apiRoutes = require("./api");

// router use "/", htmlRoutes;
router.use("/api", apiRoutes);

router.use((req, res) => {});

module.exports = router;