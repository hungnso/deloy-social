const PostModel = require("./post");
const CommentModel = require("../comment/comment");

/// classe phân trang và tái sử dụng

// class APIfeatures {
//   constructor(query, querySting) {
//     (this.query = query), (this.querySting = querySting);
//   }
//   pagination() {
//     const page = this.querySting.page * 1 || 1;
//     const limit = this.querySting.limit * 1 || 9;
//     const skip = (page - 1) * limit;
//     this.query = this.query.skip(skip).limit(limit);
//     return this;
//   }
// }

const createPost = async (req, res) => {
  const { user } = req;
  const { content, images } = req.body;

  const newPost = await PostModel.create({
    userId: user._id,
    content,
    images,
  });

  res.send({
    success: true,
    data: newPost,
  });
};

const getAllPosts = async (req, res) => {
  const { skip, limit } = req.query;
  const allPosts = await PostModel.find()
    .populate({
      path: "userId",
      select: "username avatar",
    })
    .sort({ createdAt: -1 })
    .skip(Number(skip))
    .limit(4);

  res.send({
    success: true,
    data: allPosts,
  });
};

const getPostId = async (req, res) => {
  const { postId } = req.params;

  const post = await PostModel.findById(postId).populate({
    path: "userId",
    select: "username avatar",
  });

  res.send({
    success: true,
    data: post,
  });
};

const getPostByUserId = async (req, res) => {
  const { userId } = req.params;

  const post = await PostModel.find({ userId }).populate({
    path: "userId",
    select: "username avatar",
  });

  res.send({
    success: true,
    data: post,
  });
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { user } = req;
  const updatePostData = req.body;

  const updatedPost = await PostModel.findOneAndUpdate(
    {
      _id: postId,
    },
    updatePostData,
    { new: true }
  );
  if (!updatePostData) {
    res.status(500).json({ msg: error.message });
    return;
  }
  res.send({
    success: true,
    data: updatedPost,
  });
};

// updatePost: async (req, res) => {
//   try {
//     const { content, images } = req.body;
//     const post = await PostModel.findOneAndUpdate(
//       { _id: req.params.id },
//       { content, images }
//     )
//       .populate("user likes", "avatar username fullname")
//       .populate({
//         path: "comments",
//         populate: {
//           path: "user likes",
//           select: "avatar username fullname",
//         },
//       });
//     res.send({
//       success: 1,
//       newPosts: {
//         ...post._doc,
//         content,
//         images,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// },

const likePost = async (req, res) => {
  const { postId } = req.params;
  const { user } = req;

  const postUpdate = await PostModel.findOneAndUpdate(
    { _id: postId },
    { $push: { likes: user._id } },
    { new: true }
  );

  res.send({
    success: true,
    data: postUpdate,
  });
};

const unLikePost = async (req, res) => {
  const { postId } = req.params;
  const { user } = req;

  const postUpdate = await PostModel.findOneAndUpdate(
    { _id: postId },
    { $pull: { likes: user._id } },
    { new: true }
  );

  res.send({
    success: true,
    data: postUpdate,
  });
};

const incCommentPost = async (req, res) => {
  const { postId } = req.params;

  const updateIncCommentPost = await PostModel.findOneAndUpdate(
    { _id: postId },
    { $inc: { commentCount: 1 } },
    { new: true }
  );

  res.send({
    success: true,
    data: updateIncCommentPost,
  });
};
const deletePost = async (req, res) => {
  const { postId } = req.params;

  const deletePost = await PostModel.findByIdAndDelete(
    { _id: postId },
    { new: true }
  );
  res.send({
    success: "da xoa",
    data: deletePost,
  });
};

// getUserPosts: async (req, res) => {
//   try {
//     const features = new APIfeatures(
//       PostModel.find({ user: req.params.id }),
//       req.query
//     ).pagination();
//     const posts = await features.query.sort("-createdAt");

//     res.send({
//       posts,
//       result: posts.length,
//     });
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// },
// getPost: async (req, res) => {
//   try {
//     const post = await PostModel.findById(req.params.id)
//       .populate("user likes", "avatar username fullname")
//       .populate({
//         path: "comments",
//         select: "avatar username fullname",
//       });
//     res.send({
//       success: 1,
//       post,
//     });

//     if (!post)
//       return res.status(400).json({ msg: "This post does not exist." });
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// },
// deletePost: async (req, res) => {
//   try {
//     const post = await PostModel.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user._id,
//     });
//     await CommentModel.deleteMany({ _id: { $in: post.comments } || null });

//     res.send({
//       success: 1,
//     });
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// },

module.exports = {
  createPost,
  getAllPosts,
  likePost,
  unLikePost,
  getPostId,
  incCommentPost,
  getPostByUserId,
  deletePost,
  updatePost,
};
