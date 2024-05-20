import { useEffect, useState } from "react";
import useSearchGroundByOwnerId from "../../../hooks/ground/searchGroundByOwnerIdHook";
import useGetOneGroundBookingRequests from "../../../hooks/booking/getOneGroundBookingRequests";
import useUpdateBookingStatus from "../../../hooks/booking/updateBookingStatusHook";
import "./bookingRequests.scss";
const TodayBookings = () => {
  const [refresh, setRefresh] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const { searchGroudByOwnerId } = useSearchGroundByOwnerId();
  const { getOneGroundBookingRequests } = useGetOneGroundBookingRequests();
  const { updateBookingStatus } = useUpdateBookingStatus();
  //Functions
  const fetchBookingRequests = async () => {
    const groundRes = await searchGroudByOwnerId();
    if (groundRes.ok) {
      const res = await getOneGroundBookingRequests(groundRes.data._id);
      if (res.ok) {
        setRequests(res.data);
        console.log(res.data);
      }
    } else {
      console.log("error in getting ground");
    }
  };

  const handleApprove = async (requestId, status) => {
    const res = await updateBookingStatus({ requestId, status });
    if (res.ok) {
      setRefresh(!refresh);
    }
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchBookingRequests();
    const date = new Date().toISOString().split("T")[0];
    setCurrentDate(date);
  }, [refresh]);

  function countPreviousBookings(userId) {
    const previousBookings = requests.filter(
      (request) => request.status === "approved" && request.date <= currentDate
    ).length;
    return previousBookings;
  }

  return (
    <div className="BookingRequests">
      <button onClick={handleRefresh} className="refreshBtn">
        🔃 Refresh
      </button>
      <h1>Todays Booking</h1>
      <div className="requestsHolder">
        {(!requests || requests.length === 0) && <div>No Requests to show</div>}

        {requests.length > 0 &&
          requests
            .filter(
              (request) =>
                request.date === currentDate && request.status === "approved"
            )
            .map((request) => (
              <div key={request._id} className="requestCard">
                <div className="requestUserImg">
                  <img src={request.user.profilePicture} alt="" />
                </div>
                <div className="requestUserDetail">
                  <p>
                    {" "}
                    <strong> Requested Date:</strong> {request.date}
                  </p>
                  <p>
                    <strong>Requested Time Slot:</strong> {request.startTime} -{" "}
                    {request.endTime}{" "}
                  </p>
                  <p>
                    <strong>Name:</strong> {request.user.name}{" "}
                  </p>
                  <p>
                    <strong>Team:</strong> {request.user.team}{" "}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {request.user.phoneNumber}
                  </p>
                  <p>
                    <strong>Previous Number of Bookings:</strong>{" "}
                    {countPreviousBookings(request.user._id)}{" "}
                  </p>
                  
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
 
export default TodayBookings;