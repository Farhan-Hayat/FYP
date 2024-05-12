import { useEffect, useState } from "react";
import useSearchGroundByOwnerId from "../../../../hooks/ground/searchGroundByOwnerIdHook";
import axios from "axios"
import LeagueTable from "../../../../components/leagueTable/leagueTable";
const OwnerLeagueTable = () => {
  const { searchGroudByOwnerId } = useSearchGroundByOwnerId();
  const [groundId, setGroundId] = useState(null);
  const [leagueId , setLeagueId] = useState("")


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
      console.log(response.data.data._id)
    } catch (error) {
      console.log(error)
    }
  }


  return ( 
    <div className="OwnerLeagueTable">
      <h1>League Table</h1>
      <div className="leagueTable">
      <LeagueTable leagueId={leagueId}/>

      </div>
    </div>
   );
}
 
export default OwnerLeagueTable;