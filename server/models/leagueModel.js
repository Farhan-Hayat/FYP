const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
  groundId : {type:mongoose.Schema.Types.ObjectId , ref:"Ground" , required:true},
  name:{type:String,required:true},
  matches:[
    {
      team1:{type:String , required:true},
      team2:{type:String , required:true},
      scoreTeam1:{type:Number , required:true},
      scoreTeam2:{type:Number , required:true},
      date:{type:Date , required:true},
      day:{type:String , required:true}
    }
  ]
} , {
  timestamps:true
})

leagueSchema.statics.addLeague = async function(body){
  const {groundId , name} = body
  const exists = await this.find({groundId:groundId})
  if(exists.length>0){
    throw new Error("Already a League is created with current Ground Id")
  }
  const nameExists = await this.find({name:name})
  if(nameExists.length>0){
    throw new Error("Another league exist with same name.")
  }
  const newLeague = await this.create(body)

  return newLeague
}

leagueSchema.statics.findLeagueByGroundId= async function(groundId){
  const leagues = await this.find({groundId:groundId})
  if(!leagues || leagues.length<1){
    throw new Error('No Leagues Found')
  }
  return leagues[0];
}

leagueSchema.statics.getAllMatches = async function(leagueId){
  const league = await this.findById(leagueId)
  if(!league){
    throw new Error ('Invalid League ID')
  }
  
  return league.matches
  
}

leagueSchema.statics.getAllLeagues = async function(){
  const leagues = await this.find()
  if(leagues.length<1){
    throw new Error ("No Leagues found")
  }
  return leagues;
}

const League = mongoose.model("League" , leagueSchema)

module.exports = League