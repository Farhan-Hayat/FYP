import { useEffect, useState } from "react";
import usePostTimeSlot from "../../../hooks/ground/postTImeSlotHook";
import useSearchGroundByOwnerId from "../../../hooks/ground/searchGroundByOwnerIdHook";
import axios from "axios";
import "./addTimeSlots.scss";
const AddTimeSlots = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { postTimeSlot } = usePostTimeSlot();
  const { searchGroudByOwnerId } = useSearchGroundByOwnerId();
  const [groundId, setGroundId] = useState("");
  const [timeSlotsData , setTimeSlotsData] = useState([])
  const [groundRegistered , setGroundRegistered] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      groundId: groundId,
      startTime: startTime,
      endTime: endTime,
    };
    if(startTime && endTime){
      const res = await postTimeSlot(body);
      console.log("HEre" ,res)
      setTimeSlotsData(res.data.timeSlots)

    }else{
      alert("Fill The Given Fields")
    }
  };

  const checkGroundExist = async () => {
    const res = await searchGroudByOwnerId();
    if (res.ok) {
      setGroundRegistered(true)
      setTimeSlotsData(res.data.timeSlots)
      setGroundId(res.data._id);
    } else {
      setGroundRegistered(false)
      console.log(res.error);
    }
  };

  useEffect(() => {
    // console.log(timeSlotsData)
  }, [timeSlotsData]);

  useEffect(() => {
    checkGroundExist();
  }, []);

  const handleDeleteOneTimeSlot = async (timeSlotId)=>{
    try {
      const response = await axios.post("http://localhost:3001/api/ground/delete/timeSlot" , {timeSlotId , groundId:groundId})
      setTimeSlotsData(response.data.data.timeSlots)
    } catch (error) {
      console.log(error)
    }
  }


  if(!groundRegistered){
    return (
      <div className="AddTimeSlots">
          Please Register Your Ground First.
      </div>
    )
  }
else{


  return (
    <div className="AddTimeSlots">
      <h1>Add a Time SLot</h1>
      <form onSubmit={handleSubmit}>
        <div className="formDiv">
          <label>start Time : </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="formDiv">
          <label>End Time : </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="formDiv">
          <button>Add Slot</button>
        </div>
      </form>
      <div>
        <table>
          <thead>

          <tr>
            <th>######</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            
        {timeSlotsData && timeSlotsData.map((item , index)=>(
          <tr>
            <td>{index + 1}</td>
            <td>{item.startTime}</td>
            <td>{item.endTime}</td>
            <td><button onClick={()=>handleDeleteOneTimeSlot(item._id)}>del</button></td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

};

export default AddTimeSlots;
