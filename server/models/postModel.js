const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    // Reference to the User model
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    }
  },
  { timestamps: true }
);

postSchema.statics.uploadPost = async function (user, body ) {
  const {description , imageCode} = body
  if (!mongoose.Types.ObjectId.isValid(user)) {
    throw new Error("User Id is Invalid");
  }
  const newPost = new this({
    user,
    description,
    imageUrl:imageCode
  });
  const savedPost = await newPost.save();
  return savedPost;
};

postSchema.statics.getAllPosts = async function () {
  const posts = await this.find()
    .populate({
      path: "user",
      select: "-password",
    })
    .exec();

  return posts;
};

postSchema.statics.getUserPosts = async function (id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID");
  }

  const userPosts = await this.find({ user: id });

  if (userPosts.length < 1) {
    throw new Error("No Post(s) for this User!");
  }

  return userPosts;
};

postSchema.statics.deleteUserPost = async function(id){
  if(!mongoose.Types.ObjectId.isValid(id)){
    throw new Error('ID not valid');
  }

  //delete
  const deletedPost=await this.findByIdAndDelete(id);

  return deletedPost
}

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
