import { useContext, useEffect, useState } from "react";
import "./myBookings.scss";
import { UserContext } from "../../contexts/userContext";
import axios from "axios";
const MyBookings = () => {
  const { user } = useContext(UserContext);
  const [bookingsData, setBookingsData] = useState([])

  useEffect(() => {
    if (user) {
      async function fetchUserBookings() {
        try {
          console.log(user._id);
          const response = await axios.get(
            "http://localhost:3001/api/booking/user/" + user._id
          );
          console.log(response.data)
          setBookingsData(response.data.data.reverse())
        } catch (error) {
          console.log(error.response.data);
        }
      }
      fetchUserBookings();
    }
  }, [user]);

  return (
    <div className="MyBookings">
      <div className="headingCont">
        <h1>My Bookings</h1>
      </div>
      <div className="myBookingsDiv">
        {bookingsData.length>0 &&
          bookingsData.map((request) =>(
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
                    <strong>Ground Name:</strong> {request.ground.name}{" "}
                  </p>
                  <p>
                    <strong>Price:</strong> {request.ground.price}{" "}
                  </p>
                  <p>
                    <strong>Location:</strong> {request.ground.location}
                  </p>
                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>
                </div>
              </div>
          ))
        }
      </div>
    </div>
  );
};

export default MyBookings;
