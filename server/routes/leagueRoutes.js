const express = require("express")
const router = express.Router();
const {addLeague, findLeagueByGroundId,getAllMatches,getAllLeagues} = require("../controllers/leagueController")
router.post("/add" , addLeague)
router.get("/byGround/:groundId" , findLeagueByGroundId)
router.get("/allMatches/:leagueId" , getAllMatches)
router.get("/" , getAllLeagues)

module.exports = router;
