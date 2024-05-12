const mongoose = require("mongoose");
const League = require("./leagueModel");
const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    leagueId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "League",
    },
    matchesPlayed: { type: Number, default: 0 },
    matchesDrawn: { type: Number, default: 0 },
    matchesWon: { type: Number, default: 0 },
    matchesLost: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    goalsFor: { type: Number, default: 0 },
    goalsAgainst: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

teamSchema.statics.addTeam = async function (body) {
  const { name, leagueId } = body;

  if (!mongoose.Types.ObjectId.isValid(leagueId)) {
    throw new Error("Invalid ID");
  }

  if (!name || !leagueId) {
    throw new Error(
      "Error Creating team! Either League Id is missing or Team Name is missing."
    );
  }

  const team = await this.create({ ...body });

  return team;
};

teamSchema.statics.matchPlayed = async function (body) {
  const { team1Id, team2Id, scoreTeam1, scoreTeam2 } = body;

  // Find team data from the database
  const team1Data = await this.findById(team1Id);
  const team2Data = await this.findById(team2Id);

  // Check if both teams exist
  if (!team1Data || !team2Data) {
    throw new Error("One or more teams not found.");
  }

  // Update data based on match result
  // WIN FOR TEAM 1
  if (scoreTeam1 > scoreTeam2) {
    team1Data.matchesPlayed += 1;
    team1Data.matchesWon += 1;
    team1Data.points += 3;
    team1Data.goalsFor += scoreTeam1;
    team1Data.goalsAgainst += scoreTeam2;

    team2Data.matchesPlayed += 1;
    team2Data.matchesLost += 1;
    team2Data.goalsFor += scoreTeam2;
    team2Data.goalsAgainst += scoreTeam1;
  } else if (scoreTeam2 > scoreTeam1) {
    //WIN FOR TEAM 2
    team2Data.matchesPlayed += 1;
    team2Data.matchesWon += 1;
    team2Data.points += 3;
    team2Data.goalsFor += scoreTeam2;
    team2Data.goalsAgainst += scoreTeam1;

    team1Data.matchesPlayed += 1;
    team1Data.matchesLost += 1;
    team1Data.goalsFor += scoreTeam1;
    team1Data.goalsAgainst += scoreTeam2;
  } else {
    // DRAW MATCH
    team1Data.matchesPlayed += 1;
    team1Data.matchesDrawn += 1;
    team1Data.points += 1;
    team1Data.goalsFor += scoreTeam1;
    team1Data.goalsAgainst += scoreTeam2;

    team2Data.matchesPlayed += 1;
    team2Data.matchesDrawn += 1;
    team2Data.points += 1;
    team2Data.goalsFor += scoreTeam2;
    team2Data.goalsAgainst += scoreTeam1;
  }

  // Save changes to the database
  await Promise.all([team1Data.save(), team2Data.save()]);

  const leagueId = team1Data.leagueId;
  const league = await League.findById(leagueId);
  const currentDate = new Date();

  // Format date as a JavaScript Date object
  const formattedDate = currentDate;

  // Get current day as a string (e.g., "Sunday", "Monday", etc.)
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = daysOfWeek[currentDate.getDay()];

  league.matches.push({
    team1: team1Data.name,
    team2: team2Data.name,
    scoreTeam1: scoreTeam1,
    scoreTeam2: scoreTeam2,
    date: formattedDate,
    day: currentDay,
  });

  await league.save();

  return { team1: team1Data, team2: team2Data };
};

teamSchema.statics.getLeagueTeams = async function (leagueId) {
  const teams = await this.find({ leagueId: leagueId });
  if (teams.length < 1) {
    throw new Error("No teams for this league yet.");
  }
  return teams;
};

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
