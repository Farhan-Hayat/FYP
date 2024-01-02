import { useEffect, useState } from "react";
import usePostTimeSlot from "../../../hooks/ground/postTImeSlotHook";
import useSearchGroundByOwnerId from "../../../hooks/ground/searchGroundByOwnerIdHook";

const AddTimeSlots = () => {
  const [startTime , setStartTime] = useState("")
  const [endTime ,  setEndTime] = useState("")
  const {postTimeSlot} = usePostTimeSlot()
  const { searchGroudByOwnerId } = useSearchGroundByOwnerId();
  const [groundId , setGroundId] = useState("")
  const handleSubmit =async (e)=>{
    e.preventDefault()
    const body = {
      groundId:groundId,
      startTime:startTime,
      endTime:endTime
    }
    const res =await postTimeSlot(body)
  }

  const checkGroundExist = async () => {
    const res = await searchGroudByOwnerId();
    if (res.ok) {
      setGroundId(res.data._id);
    } else {
      console.log(res.error)
    }
  };

  useEffect(() => {
    checkGroundExist();
  }, []);

  return ( 
    <div>
        <h1>Add a Time SLot</h1>
      <form onSubmit={handleSubmit}>
        <label>start Time : </label>
        <input type="time" value={startTime} onChange={(e)=>setStartTime(e.target.value)} />
        <label>start Time : </label>
        <input type="time" value={endTime} onChange={(e)=>setEndTime(e.target.value)} />
        <button>click</button>
      </form>
    </div>
   );
}
 
export default AddTimeSlots;