const UserModel = require("../auth/auth");
const ProfileModel = require("../profile/profile");
const FollowModel = require("../follow/follow");
const slugify = require("slugify");

const searchUser = async (req, res) => {
  const { keyword } = req.body;

  const users = await ProfileModel.find({
    slugUsername: { $regex: new RegExp(`${slugify(keyword)}`, "i") },
  }).populate({
    path: "userId",
    select: "username avatar",
  });

  res.send({
    success: true,
    data: users,
  });
};

const getAllUser = async (req, res) => {
  const { skip, limit } = req.query;
  const users = await ProfileModel.find()
    // .sort({ followers: -1 })
    // .limit(5)
    .populate({
      path: "userId",
      select: "username avatar",
    })
    .limit(Number(limit));

  res.send({
    success: true,
    data: users,
  });
};

//   updateUser: async (req, res) => {
//     try {
//       const updateUserData = req.body;

//       const updatedPost = await UserModel.findOneAndUpdate(
//         { _id: req.params.id },
//         updateUserData,
//         { new: true }
//       );
//       if (!updatedPost) return res.status(500).json({ msg: "Not found user" });

//       res.send({
//         success: 1,
//         data: updatedPost,
//       });
//     } catch (error) {
//       return res.status(500).json({ msg: error.message });
//     }
//   },
// };

module.exports = {
  getAllUser,
  searchUser,
};
