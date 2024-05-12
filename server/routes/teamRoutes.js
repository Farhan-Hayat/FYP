const express = require("express")
const router = express.Router();
const {addTeam,getLeagueTeams,matchPlayed} = require("../controllers/teamController")
router.post("/add" , addTeam)
router.get("/league/:leagueId" , getLeagueTeams)
router.post("/matchPlayed" , matchPlayed)

module.exports = router;
