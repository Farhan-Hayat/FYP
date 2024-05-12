import { useEffect, useState } from "react";
import LeagueTable from "../../components/leagueTable/leagueTable";
import axios from "axios";
import "./leagues.scss"
const Leagues = () => {
  const [leagues , setLeagues] = useState([])
  const [leagueId , setLeagueId] = useState()
  const [leagueHeading , setLeagueHeading] = useState("")
  useEffect(() => {
    async function fetchLeagues(){
      try {
        const response = await axios.get("http://localhost:3001/api/league/")
        // console.log(response.data)
        setLeagues(response.data.data)
        setLeagueId(response.data.data[0]._id)
        setLeagueHeading(response.data.data[0].name)

      } catch (error) {
        console.log(error)
      }
    }
    fetchLeagues()
  }, []);

  return ( 
    <div className="Leagues">
      <div className="headingCont">
        <h1>Leagues</h1>
      </div>
      <aside className="leaguesNames">
        {
          leagues.length>0 && leagues.map(league=>(
            <div onClick={()=>{setLeagueId(league._id);setLeagueHeading(league.name)}}>
              <p>{league.name}</p>
            </div>
          ))
        }
      </aside>
      <div className="tableHere">
        <h1>{leagueHeading}</h1>
        <LeagueTable leagueId={leagueId} />
      </div>
    </div>
   );
}
 
export default Leagues;