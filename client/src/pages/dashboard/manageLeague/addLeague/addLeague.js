import axios from "axios";
import { useEffect, useState } from "react";
import useSearchGroundByOwnerId from "../../../../hooks/ground/searchGroundByOwnerIdHook";
const AddLeague = () => {
  const { searchGroudByOwnerId } = useSearchGroundByOwnerId();

  const [leagueName, setLeagueName] = useState("");
  const [groundId, setGroundId] = useState(null);
  const [confirmationCheckBox, setConfirmationCheckBox] = useState(false);
  useEffect(() => {
    async function fetchGroundId() {
      const res = await searchGroudByOwnerId();
      if (res.ok) {
        setGroundId(res.data._id);
      }
    }
    fetchGroundId();
  }, []);

  const handleCreateLeague = async (e) => {
    e.preventDefault();
    if (leagueName) {
      if (confirmationCheckBox) {
        try {
          const response = await axios.post(
            "http://localhost:3001/api/league/add",
            { groundId, name: leagueName }
          );
          if (response.data.ok) {
            alert("League Created");
            setLeagueName("")
          }
        } catch (error) {
          console.log(error.response.data.error);
          alert(error.response.data.error);
        }
      }else{
        alert("Please Confirm the League Name")
      }
    }else{
      alert("Please League Name")
    }
  };

  return (
    <div className="AddLeague">
      <h1>Add League</h1>
      <div className="impNote">
        <p>
          ⚠️ Only one league can be add in a ground. If you want to add another
          league you must register a different ground.
        </p>
      </div>
      <form>
        <div className="formDiv">
          <label htmlFor="">Name : </label>
          <input type="text" onChange={(e) => setLeagueName(e.target.value)} value={leagueName} />
        </div>
        <div className="formDiv">
          <input
            type="checkbox"
            onChange={(e) => setConfirmationCheckBox(!confirmationCheckBox)}
          />
          <p htmlFor="checkBOX">
            Are you sure, you want to create a league named :{" "}
            <b> {leagueName}</b>
          </p>
        </div>
        <div className="formDiv">
          <button onClick={handleCreateLeague}>Create League +</button>
        </div>
      </form>
    </div>
  );
};

export default AddLeague;
