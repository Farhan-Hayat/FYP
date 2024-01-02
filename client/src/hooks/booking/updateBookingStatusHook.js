import axios from "axios";
const useUpdateBookingStatus = () => {
  async function updateBookingStatus(body) {
    try {
      const response = await axios.patch(
        "http://localhost:3001/api/booking/update/status",
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
  return { updateBookingStatus };
};

export default useUpdateBookingStatus;
