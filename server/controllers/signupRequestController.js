const SignupRequest = require("../models/signupRequestModel");

async function postRequest(req, res) {
  try {
    const postedRequest = await SignupRequest.postRequest(req.body);
    res.status(201).json({ message: "Sign up request created" , ok:true , data:postedRequest});
  } catch (error) {
    res.status(400).json({ error: error.message, ok: false });
  }
}

async function getRequests(req,res){
  try {
    const requests = await SignupRequest.getRequests()
    res.status(200).json({message:"Successful" , ok:true , data:requests})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

async function deleteRequest(req,res){
  try{
    const deleted = await SignupRequest.deleteRequest(req.params.id)
    res.status(200).json({message:"Deleted successfully!" , ok:true,data:deleted})
  }catch(error){
    res.status(400).json({error:error.message , ok:false})
  }
}


module.exports = {
  postRequest,
  getRequests,
  deleteRequest
}