const mongoose = require("mongoose");

const groundSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  groundName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactInformation: {
    type: String,
    required: true,
  },
  groundSize: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  bleachers:{
    type:Boolean,
    default:false,
  },
  parking: {
    type: Boolean,
    default: false,
  },
  waterCooler: {
    type: Boolean,
    default: false,
  },
  lighting: {
    type: Boolean,
    default: false,
  },
  refreshmentArea: {
    type: Boolean,
    default: false,
  },
  capacity:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  timeSlots:[
    {
      startTime:{
        type:String,
      },
      endTime:{
        type:String,
      }
    }
  ]
},
{
  timestamps:true
});


groundSchema.statics.registerGround = async function(body){
  if (!mongoose.Types.ObjectId.isValid(body.owner)) {
    throw new Error("Invalid ID");
  }
  const newUser = new this(body)
  return newUser.save()
}

groundSchema.statics.getAllGrounds = async function(){
  const grounds= await this.find().populate("owner").exec();
  if(grounds.length<1){
    throw new Error('No Grounds Found')
  }
  return grounds;
}

groundSchema.statics.getSingleGround = async function(id){
  const ground= await this.findOne({_id:id});
  if(!ground){
    throw new Error('No Ground Found')
  }
  return ground;
}

groundSchema.statics.postTimeSlot = async function(groundId, newTimeSlot) {
  console.log(groundId,newTimeSlot)
  if (!mongoose.Types.ObjectId.isValid(groundId)) {
    throw new Error("Invalid Ground ID");
  }

  const updatedGround = await this.findByIdAndUpdate(
    {_id:groundId},
    { $push: { timeSlots: newTimeSlot } },
    { new: true }
  );

  return updatedGround;
};

groundSchema.statics.searchByOwnerId = async function(ownerId){
  const ground = await this.findOne({owner:ownerId});
  if(!ground){
    throw new Error('No Ground Found')
  }
  return ground
}


const Ground = mongoose.model("Ground" , groundSchema)

module.exports = Ground