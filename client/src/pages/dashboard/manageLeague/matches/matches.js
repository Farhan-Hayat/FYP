import { useEffect, useState } from "react";
import useSearchGroundByOwnerId from "../../../../hooks/ground/searchGroundByOwnerIdHook";
import axios from "axios";
const Matches = () => {
  const { searchGroudByOwnerId } = useSearchGroundByOwnerId();
  const [groundId, setGroundId] = useState(null);
  const [leagueId, setLeagueId] = useState("");
  const [data, setData] = useState([]);
  const [team1, setTeam1] = useState("");
  const [team1Score, setTeam1Score] = useState("");
  const [team2, setTeam2] = useState("");
  const [team2Score, setTeam2Score] = useState("");
  const [sameTeamError, setSameTeamError] = useState("");
  useEffect(() => {
    async function fetchGroundId() {
      const res = await searchGroudByOwnerId();
      if (res.ok) {
        setGroundId(res.data._id);
        findLeagueByGroundId(res.data._id);
      }
    }
    fetchGroundId();
  }, []);

  const findLeagueByGroundId = async (groundId) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/league/byGround/" + groundId
      );
      setLeagueId(response.data.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchTeams() {
      try {
        // console.log(leagueId)
        const response = await axios.get(
          "http://localhost:3001/api/team/league/" + leagueId
        );
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchTeams();
  }, [leagueId]);

  const handleAddMatchRecord = async (e) => {
    e.preventDefault();
  
    if (team1 === team2) {
      setSameTeamError("You cannot select same teams.");
      return;
    }
    if(!team1 || !team2){
      setSameTeamError("");
      alert("Please Select Both Teams!")
      return
    }

    if(!team1Score || !team2Score){
      setSameTeamError("");
      alert("Please Enter Score For Each Team!")
      return
    }
  
    const team1Id = document.querySelector('#team1 option:checked').dataset.teamid;
    const team2Id = document.querySelector('#team2 option:checked').dataset.teamid;
    
    
    try {
      const response = await axios.post("http://localhost:3001/api/team/matchPlayed" , 
        {
          team1Id:team1Id ,
          team2Id:team2Id ,
          scoreTeam1:parseInt(team1Score),
          scoreTeam2:parseInt(team2Score)
        }
      )
      if(response.data.ok){
        setTeam1("")
        setTeam2("")
        setTeam1Score("")
        setTeam2Score("")
        setSameTeamError("")
      }
    } catch (error) {
      console.log(error.response.data)
    }
  };
  

  return (
    <div className="Matches">
      <h1>Add Played Matches</h1>
      <form>
        <div className="formDiv">
          <label> Team 1 :</label>
          <select
            name=""
            id="team1"
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
          >
            <option value="" selected disabled>
              Select Team 1
            </option>
            {data.length > 0 &&
              data.map((team) => (
                <option key={team._id} data-teamId={team._id} value={team.name}>
                  {team.name}
                </option>
              ))}
          </select>
          <label>Score :</label>
          <input
            type="number"
            value={team1Score}
            onChange={(e) => setTeam1Score(e.target.value)}
          />
        </div>
        <div className="formDiv">
          <label> Team 2 :</label>
          <select
            name=""
            id="team2"
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
          >
            <option value="" selected disabled>
              Select Team 2
            </option>
            {data.length > 0 &&
              data.map((team) => (
                <option key={team._id} data-teamId={team._id} value={team.name}>
                  {team.name}
                </option>
              ))}
          </select>
          <label>Score :</label>

          <input
            type="number"
            value={team2Score}
            onChange={(e) => setTeam2Score(e.target.value)}
          />
        </div>
        <div className="formDiv">
          <button onClick={handleAddMatchRecord}>Add Match Record</button>
        </div>
        {sameTeamError && <p>{sameTeamError}</p>}
      </form>
    </div>
  );
};

export default Matches;
