const mongoose = require("mongoose")

const signupRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["player", "groundOwner"],
      required: true,
    },
    document:{
      type :String,
      required:true
    }
  },
  {
    timestamps: true,
  }
)

signupRequestSchema.statics.postRequest = async function(body){
  const userExist = await this.findOne( {username: body.username });
  if (userExist) {
    throw new Error("User already exists");
  }
  const newUser = new this(body)
  return await newUser.save()
}

signupRequestSchema.statics.getRequests = async function(){
  const requests =  await this.find()
  if(requests.length < 1){
    throw new Error('No request found')
  }
  return requests;
}

signupRequestSchema.statics.deleteRequest =async function(id){
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("User Id is Invalid");
  }
  const deletedRequest = await this.findByIdAndDelete(id)
  if(!deletedRequest){
    throw new Error("Could not delete the request")
  }
  return deletedRequest
}


const SignupRequest = mongoose.model("SignupRequest" , signupRequestSchema)
module.exports = SignupRequest