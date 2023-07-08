const router = require("express").Router();

const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");
const bookRoutes = require("./book-routes");

// collect endpoints and prefix them
// router instance uses these prefixes
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/books", bookRoutes);

module.exports = router;