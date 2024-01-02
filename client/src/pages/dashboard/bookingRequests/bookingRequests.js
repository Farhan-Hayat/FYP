import { useEffect, useState } from "react";
import useSearchGroundByOwnerId from "../../../hooks/ground/searchGroundByOwnerIdHook";
import useGetOneGroundBookingRequests from "../../../hooks/booking/getOneGroundBookingRequests";
import useUpdateBookingStatus from "../../../hooks/booking/updateBookingStatusHook";


const BookingRequests = () => {
  const [refresh, setRefresh] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const { searchGroudByOwnerId } = useSearchGroundByOwnerId();
  const { getOneGroundBookingRequests } = useGetOneGroundBookingRequests();
  const {updateBookingStatus} = useUpdateBookingStatus()
  //Functions
  const fetchBookingRequests = async () => {
    const groundRes = await searchGroudByOwnerId();
    if (groundRes.ok) {
      const res = await getOneGroundBookingRequests(groundRes.data._id);
      if (res.ok) {
        setRequests(res.data);
      }
    } else {
      console.log("error in getting ground");
    }
  };

  const handleApprove =async (requestId , status)=>{
    const res = await updateBookingStatus({requestId,status})
    if(res.ok){

      setRefresh(!refresh)
    }
  }

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchBookingRequests();
    const date = new Date().toISOString().split("T")[0];
    setCurrentDate(date);
  }, [refresh]);

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      {(!requests || requests.length === 0) && <div>No Requests to show</div>}

      {requests.length > 0 &&
        requests
          .filter((request) => (request.date >= currentDate && request.status==="pending"))
          .map((request) => <div key={request._id}>
            <p>{request.date}</p>
            <button onClick={()=>handleApprove(request._id,"approved")}>Approve</button>
            <button onClick={()=>handleApprove(request._id,"declined")}>Decline</button>
          </div>)}
    </div>
  );
};

export default BookingRequests;
