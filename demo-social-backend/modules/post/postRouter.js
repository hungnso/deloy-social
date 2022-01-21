const router = require("express").Router();
const auth = require("../../middleware/auth");
const postCtrl = require("./postCtrl");

router.post("/create", auth, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/user/:userId", auth, postCtrl.getPostByUserId);
router.get("/post/:postId", auth, postCtrl.getPostId);
router.put("/edit-post/:postId", auth, postCtrl.updatePost);
router.put("/:postId/like", auth, postCtrl.likePost);
router.put("/:postId/unLike", auth, postCtrl.unLikePost);
router.put("/:postId/incCommentPost", auth, postCtrl.incCommentPost);
router.delete("/:postId/", auth, postCtrl.deletePost);

// router
//   .route("/posts")
//   .post(auth, postCtrl.createPost)
//   .get(auth, postCtrl.getPosts);

// router
//   .route("/post/:id")
//   .patch(auth, postCtrl.updatePost)
//   .get(auth, postCtrl.getPost)
//   .delete(auth, postCtrl.deletePost);

// router.patch("/post/:id/like", auth, postCtrl.likePost);

// router.patch("/post/:id/unlike", auth, postCtrl.unLikePost);

// router.get("/user_post/:id", auth, postCtrl.getUserPosts);

module.exports = router;
