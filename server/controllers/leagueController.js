const League = require("../models/leagueModel")

async function addLeague(req,res){

  try {
    const data = await League.addLeague(req.body)
    res.status(200).json({data:data , ok:true , message:"League Created"})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

async function findLeagueByGroundId(req,res){
  try {
    const data = await League.findLeagueByGroundId(req.params.groundId)
    res.status(200).json({data:data , ok:true , message:"League Found By Ground Id"})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

async function getAllMatches(req,res){
  try {
    const data = await League.getAllMatches(req.params.leagueId)
    res.status(200).json({data:data , ok:true , message:"League Found By Ground Id"})
    
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
    
  }
}

module.exports = {
  addLeague,
  findLeagueByGroundId,
  getAllMatches
}