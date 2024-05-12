import { useEffect, useState } from "react";
import useSearchGroundByOwnerId from "../../../../hooks/ground/searchGroundByOwnerIdHook";
import axios from "axios"

const Teams = () => {
  const { searchGroudByOwnerId } = useSearchGroundByOwnerId();
  const [groundId, setGroundId] = useState(null);
  ///
  const [teamName , setTeamName]= useState("")
  const [leagueId , setLeagueId] = useState("")
  const [confirmationCheckBox, setConfirmationCheckBox] = useState(false);

  useEffect(() => {
    async function fetchGroundId() {
      const res = await searchGroudByOwnerId();
      if (res.ok) {
        setGroundId(res.data._id);
        findLeagueByGroundId(res.data._id)
      }
    }
    fetchGroundId();
  }, []);

  const findLeagueByGroundId = async (groundId)=>{
    try {
      const response = await axios.get("http://localhost:3001/api/league/byGround/" + groundId)
      setLeagueId(response.data.data._id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateTeam = async(e)=>{
    e.preventDefault()
    if(!teamName) {
      alert("Please Enter Team Name.")
      return
    }
    if(!confirmationCheckBox){
      alert("Please Confirm the Team Name")
      return
    }
    if(!leagueId){
      alert("Error Creating Team. Try Again Later!")
    }
    try {
      const response =  await axios.post("http://localhost:3001/api/team/add" , {
        name:teamName , leagueId
      })
      if(response.data.ok){
        setTeamName("")
        setConfirmationCheckBox(false)
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }
  
  return ( 
    <div className="Teams">
      <h1>Add Team</h1>
      <form>
        <div className="formDiv">
          <label htmlFor='name'>Name:</label>
          <input type="text" value={teamName} onChange={(e)=>setTeamName(e.target.value)} />
        </div>
        <div className="formDiv">
          <input
            type="checkbox"
            onChange={(e) => setConfirmationCheckBox(!confirmationCheckBox)}
            checked={confirmationCheckBox}
          />
          <p htmlFor="checkBOX">
            Are you sure, you want to enter a Team named :{" "}
            <b> {teamName}</b>
          </p>
        </div>
        <div className="formDiv">
          <button onClick={handleCreateTeam}>Create Team +</button>
        </div>
      </form>
    </div>
   );
}
 
export default Teams;