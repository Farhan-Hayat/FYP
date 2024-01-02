const Ground = require("../models/groundModel")

async function registerGround(req,res){
  try {
    const ground = await Ground.registerGround(req.body)
    res.status(200).json({message:"GROUND REGISTERD!" , ok:true,data:ground})
  } catch (error) {
    res.status(400).json({error:error.message,ok:false})
  }
}

async function getAllGrounds(req,res){
  try {
    const grounds = await Ground.getAllGrounds()
    res.status(200).json({message:"All ground Fetched" , ok:true,data:grounds})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

async function getSingleGround(req,res){
  const id = req.params.id
  try {
    const ground = await Ground.getSingleGround(id)
    res.status(200).json({message:"Fetched Successfully" , ok:true , data:ground})
  }
  catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

async function postTimeSlot(req,res){
  const {groundId , startTime,endTime} = req.body
  console.log(groundId)
  try {
    const timeSlot =await Ground.postTimeSlot(groundId,{startTime,endTime})
    res.status(200).json({message:"Time Slot Posted Success",ok:true,data:timeSlot})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

async function searchByOwnerId(req,res){
  const ownerId = req.params.ownerId
  try {
    const ground = await Ground.searchByOwnerId(ownerId)
    res.status(200).json({message:"Ground Found By Owner Id" , ok:true,data:ground})
  } catch (error) {
    res.status(400).json({error:error.message , ok:false})
  }
}

module.exports = {
  registerGround,
  getAllGrounds,
  getSingleGround,
  postTimeSlot,
  searchByOwnerId
}