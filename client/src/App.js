import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import NotFound from "./pages/notFound/notFound";
import Login from "./pages/login/login";
import SignupPlayer from "./pages/signup/signupPlayer";
import Navbar from "./components/navbar/navbar";
import useAuthHelper from "./hooks/authentication/useAuthHelpers";
import { useEffect } from "react";
import UserProfile from "./pages/userProfile/userProfile";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import ManagerProtectedRoute from "./components/protectedRoute/managerProtectedRoute";
import Dashboard from "./pages/dashboard/dashboard";
import UploadPost from "./pages/dashboard/uploadPost/uploadPost";
import MyPosts from "./pages/dashboard/myPosts/myPosts";
import SignupNavigation from "./pages/signup/signupNavigation";
import SignupOwner from "./pages/signup/signupOwner";
import AdminProtectedRoute from "./components/protectedRoute/adminProtectedRoute";
import AdminDashboard from "./pages/adminDashboard/adminDashboard";
import SignupRequest from "./pages/adminDashboard/signupRequest/signupRequest";
import SetupGround from "./pages/dashboard/setupGround/setupGround";
import Grounds from "./pages/grounds/grounds";
import SingleGround from "./pages/singleGround/singleGround";
import AddTimeSlots from "./pages/dashboard/addTimeSlots/addTimeSlots";
import BookingRequests from "./pages/dashboard/bookingRequests/bookingRequests";
import "./App.scss";
import TodayBookings from "./pages/dashboard/todayBookings/todayBookings";
import ManageLeague from "./pages/dashboard/manageLeague/manageLeague";
import AddLeague from "./pages/dashboard/manageLeague/addLeague/addLeague";
import Teams from "./pages/dashboard/manageLeague/teams/teams";
import OwnerLeagueTable from "./pages/dashboard/manageLeague/ownerLeagueTable/ownerLeagueTable";
import Matches from "./pages/dashboard/manageLeague/matches/matches";
import ContactUs from "./pages/contactUs/contactUs";
import AboutUs from "./pages/aboutUs/aboutUs";
function App() {
  const { authHelper } = useAuthHelper();
  useEffect(() => {
    authHelper();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignupNavigation />}>
            <Route path="player" element={<SignupPlayer />}></Route>
            <Route path="ground-owner" element={<SignupOwner />}></Route>
          </Route>
          <Route path="my" element={<ProtectedRoute />}>
            <Route path="profile" element={<UserProfile />}></Route>
          </Route>
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route path="dashboard" element={<AdminDashboard />}>
              <Route path="signupRequest" element={<SignupRequest />}></Route>
            </Route>
          </Route>
          <Route path="/manager" element={<ManagerProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="add-time-slots" element={<AddTimeSlots />}></Route>
              <Route path="upload-post" element={<UploadPost />}></Route>
              <Route path="my-posts" element={<MyPosts />}></Route>
              <Route path="setup-ground" element={<SetupGround />}></Route>
              <Route
                path="bookingRequests"
                element={<BookingRequests />}
              ></Route>
              <Route path="today-Bookings" element={<TodayBookings />}></Route>
              <Route path="manage-league" element={<ManageLeague />}>
                <Route path="add" element={<AddLeague />}></Route>
                <Route path="teams" element={<Teams />}></Route>
                <Route
                  path="league-table"
                  element={<OwnerLeagueTable />}
                ></Route>
                <Route path="matches" element={<Matches />}></Route>
              </Route>
            </Route>
          </Route>
          <Route path="/grounds" element={<Grounds />}></Route>
          <Route path="/ground/:id" element={<SingleGround />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/contact/us" element={<ContactUs />}></Route>
          <Route path="/about/us" element={<AboutUs />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
