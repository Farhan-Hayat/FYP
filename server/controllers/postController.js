const Post = require("../models/postModel")
async function uploadPost(req,res){
  try {
    const post = await Post.uploadPost(req.user._id , req.body);
    res.status(200).json({message:"Post Uploaded" , ok:true , data:post})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

async function getAllPosts(req,res){
  try{
    const posts = await Post.getAllPosts();
    res.status(200).json({message:"Successfully Fethced" , ok:true , data:posts})
  }
  catch(error){
    res.status(400).json({error:error.message , ok:false})
  }    
}

async function getUserPosts(req,res){
  const id = req.user._id
  try{
    const posts = await Post.getUserPosts(id)
    res.status(200).json({message:"Successfully Fetched",ok:true , data:posts})
  }
  catch(error){
    res.status(400).json({error:error.message , ok:false})
  }
}

async function deleteUserPost(req,res){
  const id = req.params.id
  try{
    const deletedPost= await Post.deleteUserPost(id)
    res.status(200).json({message:"deleted successfully" , ok:true , data:deletedPost})
  }
  catch(error){
    res.status(400).json({error:error.message , ok:false})
  }
}

module.exports = {
  uploadPost,
  getAllPosts,
  getUserPosts,
  deleteUserPost
}