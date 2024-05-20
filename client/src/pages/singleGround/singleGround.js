import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetSingleGround from "../../hooks/ground/getSingleGround";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import usePostBookingRequest from "../../hooks/booking/postBookingRequest";
import "./singleGround.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SingleGround = () => {
  const params = useParams();
  const [ground, setGround] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingsTime, setBookingsTime] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const { getSingleGround } = useGetSingleGround();
  const { user } = useContext(UserContext);
  const { postBookingRequest } = usePostBookingRequest();

  // FUNCTIONS

  const fetchSingleGround = async () => {
    const res = await getSingleGround(params.id);
    if (res.ok) {
      setGround(res.data);
      if (res.data.timeSlots.length > 0) {
        setTimeSlots(res.data.timeSlots);
      }
    } else {
      console.log("error");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (bookingDate) {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/booking/ground/${params.id}`
        );
        if (response.data.ok) {
          setBookingsTime(
            response.data.data.filter(
              (item) => item.date === bookingDate && item.startTime
            )
          );
        }
      } catch (error) {
        console.log(error.response.data);
      }
      setSearchClicked(true);
    }
  };

  const test = () => {
    console.log(bookingsTime);
    console.log(currentDate);
  };

  useEffect(() => {
    fetchSingleGround();
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const getCurrentDate = new Date().toISOString().split("T")[0];
    setCurrentDate(getCurrentDate);
  }, [params.id]);

  const getStatus = (startTime) => {
    const matchingBooking = bookingsTime.find(
      (booking) => booking.startTime === startTime
    );

    return matchingBooking && matchingBooking.status === "approved"
      ? "Booked"
      : "Available";
  };

  const handleBook = async (startTime, endTime) => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login first to book.")
      return;
    }

    const body = {
      startTime: startTime,
      endTime: endTime,
      groundId: params.id,
      userId: user._id,
      date: bookingDate,
      status: "pending",
      price: ground.price,
    };
    const res = await postBookingRequest(body);
    if(res.ok){
      toast.success("Booking request submitted successfully!")
    }
  };

  return (
    <div className="SingleGround">
      {!ground && <div>Loading...</div>}

      <section className="firstSection">
        <div className="groundImagesCarousel">
          <img src="https://c.wallhere.com/photos/c0/f3/Football_football_stadium_footballers_soccer_Soccer_Field_soccer_pitches_Soccer_Spirits_nature-1805339.jpg!d" alt="" />
        </div>
        <div className="groundFacilitiesDiv">
          <div className="groundFacilities">
            <h3>Facilities</h3>
            <p>
              Bleachers <span> {ground && ground.bleachers?<>✅</>:<>❌</>}  </span>{" "}
            </p>
            <p>
              Parking <span>{ground && ground.parking?<>✅</>:<>❌</>}</span>{" "}
            </p>
            <p>
              Water Coolers <span>{ground && ground.waterCooler?<>✅</>:<>❌</>}</span>{" "}
            </p>
            <p>
              Lighting <span>{ground && ground.lighting?<>✅</>:<>❌</>}</span>{" "}
            </p>
            <p>
              Refreshment Area <span>{ground && ground.refreshmentArea?<>✅</>:<>❌</>}</span>{" "}
            </p>
            <p>
              Capacity <span>{ground && ground.capacity}</span>{" "}
            </p>
          </div>
        </div>
      </section>
      <section className="secondSection">
        {ground && (
          <div className="groundDetail">
            <h1>{ground.groundName}</h1>
            {/* <p>{ground.description}</p> */}
            <p>
              <strong>Location : </strong>
              {ground.location}
            </p>
            <p>
              <strong>Contact Information : </strong>
              {ground.contactInformation}
            </p>
            <p>
              <strong>price per slot: </strong>
              {ground.price}
            </p>
            <h3>Description</h3>
            <p>DESCRIPTION WILL BE HERE...</p>
          </div>
        )}
      </section>
      <section className="thirdSection">
        <div className="selectDateDiv">
          <h3>Select the date you want to book : </h3>
          <form onSubmit={handleSearch}>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={currentDate}
            />
            <button>Search</button>
          </form>
        </div>
        <div className="bookingTableDiv">
          {searchClicked && (
            <table striped bordered hover>
              <thead>
                <tr>
                  <th>start time</th>
                  <th>end time</th>
                  <th>status</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {timeSlots.length < 1 && <p>No time slots to show</p>}
                {timeSlots.length > 0 &&
                  timeSlots.map((item) => (
                    <tr key={item._id}>
                      <td>{item.startTime}</td>
                      <td> {item.endTime}</td>
                      <td> {getStatus(item.startTime)}</td>
                      <td>
                        {getStatus(item.startTime) === "Available" ? (
                          <button
                            onClick={() =>
                              handleBook(item.startTime, item.endTime)
                            }
                          >
                            Book
                          </button>
                        ) : (
                          <button disabled>Book</button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default SingleGround;
