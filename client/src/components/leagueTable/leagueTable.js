import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const LeagueTable = ({ leagueId }) => {
  const [data, setData] = useState([]);
  const [matchesData, setMatchesData] = useState([]);
  useEffect(() => {
    async function fetchTeams() {
      try {
        // console.log(leagueId)
        const response = await axios.get(
          "http://localhost:3001/api/team/league/" + leagueId
        );
        // console.log(response.data);
        const sortedData = response.data.data.sort(
          (a, b) => b.points - a.points
        );
        setData(sortedData);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchTeams();
    fetchMatchHistory(leagueId);
  }, [leagueId]);

  async function fetchMatchHistory(leagueId) {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/league/allMatches/" + leagueId
      );
      console.log(response.data.data)
      const first10Matches = response.data.data.reverse().slice(0, 10);
      setMatchesData(first10Matches);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  // COLUMNS
  const columns = [
    {
      name: "TEAM",
      selector: (row) => row.name,
      grow: 1,
      style: { fontSize: "16px" },
    },
    {
      name: "MP",
      selector: (row) => row.matchesPlayed,
      width: "50px",
    },
    {
      name: "W",
      selector: (row) => row.matchesWon,
      width: "50px",
    },
    {
      name: "D",
      selector: (row) => row.matchesDrawn,
      width: "50px",
    },
    {
      name: "L",
      selector: (row) => row.matchesLost,
      width: "50px",
    },
    {
      name: "GF",
      selector: (row) => row.goalsFor,
      width: "50px",
    },
    {
      name: "GA",
      selector: (row) => row.goalsAgainst,
      width: "50px",
    },
    {
      name: "Pts",
      selector: (row) => row.points,
      width: "50px",
    },
  ];

  return (
    <>
    <div className="LeagueTable">
      <DataTable data={data} columns={columns} customStyles={customStyles} />
    </div>
    <h1 style={{marginTop:"30px"}}>Matches</h1>
    <div style={customStyles.matchHistoryDiv}>
      
      {matchesData.length>0 && matchesData.map(item=>(
        <div style={customStyles.oneMatchDiv}>
          
          <div style={customStyles.oneTeamDiv}>
            <p style={customStyles.oneTeamDivP}>{item.team1}</p>
            <span style={customStyles.oneTeamDivSpan}>{item.scoreTeam1}</span>  
          </div>
          <div style={customStyles.oneTeamDiv}>
            <p style={customStyles.oneTeamDivP}>{item.team2}</p>
            <span style={customStyles.oneTeamDivSpan}>{item.scoreTeam2}</span>  
          </div>
          <div style={customStyles.oneMatchTimeDiv}>
            <span style={customStyles.oneMatchTimeDivSpan}>
              {item.date.split("T")[0]}
            </span>
            <span style={customStyles.oneMatchTimeDivSpan}>
              {item.day}
            </span>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default LeagueTable;

const customStyles = {
  headCells: {
    style: {
      paddingLeft: "12px", // override the cell padding for head cells
      paddingRight: "8px",
      fontSize: "15px",
      color: "white",
      backgroundColor: "darkBLue",
    },
  },
  matchHistoryDiv:{
    display:"flex",
    flexWrap:"wrap",
    alignItems:"center",
    justifyContent:"center",
    gap:"10px",
    
  },
  oneMatchDiv:{
    border:"1px solid gray",
    borderRadius:"20px",
    width:"40%",
    padding:"15px 30px 5px 30px",
    display:"flex",
    flexDirection:"column",
    boxShadow:" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    
  },
  oneTeamDiv:{
    display:"flex",
    justifyContent:"space-between",
    // border:"1px solid black"
  },
  oneTeamDivP:{
    height:"50px",
    lineHeight:"50px",
    borderRight:"1px solid gray",
    flexGrow:"2"
  },
  oneTeamDivSpan:{

    flexBasis:"50px",
    textAlign:"center",
    lineHeight:"50px"
  },
  oneMatchTimeDiv:{
    display:"flex",
    justifyContent:"flex-start",
    color:"gray",
    gap:"10px", 
    marginTop:"5px",
  },
  oneMatchTimeDivSpan:{
    fontSize:"12px"
  }
};
