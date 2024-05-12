const Team = require("../models/teamModel")

async function addTeam(req,res){
  try {
    const data = await Team.addTeam(req.body)
    res.status(200).json({data:data , ok:true , message:"Team Created!"})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

async function getLeagueTeams(req,res){
  try {
    const data = await Team.getLeagueTeams(req.params.leagueId)
    res.status(200).json({data:data , ok:true , message:"Teams Fetched!"})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

async function matchPlayed(req,res){
  try {
    const data = await Team.matchPlayed(req.body)
    res.status(200).json({data:data , ok:true , message:"Match Added!"})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}



module.exports = {
  addTeam,
  getLeagueTeams,
  matchPlayed
}