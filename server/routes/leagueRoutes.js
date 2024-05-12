const express = require("express")
const router = express.Router();
const {addLeague, findLeagueByGroundId,getAllMatches} = require("../controllers/leagueController")
router.post("/add" , addLeague)
router.get("/byGround/:groundId" , findLeagueByGroundId)
router.get("/allMatches/:leagueId" , getAllMatches)

module.exports = router;
