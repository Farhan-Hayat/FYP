import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import NotFound from "./pages/notFound/notFound";
import Login from "./pages/login/login";
import SignupPlayer from "./pages/signup/signupPlayer";
import Navbar from "./components/navbar/navbar";
import useAuthHelper from "./hooks/authentication/useAuthHelpers"
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
import "./App.scss"
function App() {
  const {authHelper} = useAuthHelper()
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
            <Route path="player" element={<SignupPlayer/>}></Route>
            <Route path="ground-owner" element={<SignupOwner/>}></Route>
          </Route>
          <Route path="my" element={<ProtectedRoute/>}>
            <Route path="profile" element={<UserProfile/>}></Route>
          </Route>
          <Route path="/admin" element={<AdminProtectedRoute/>}>
            <Route path="dashboard" element={<AdminDashboard/>}>
              <Route path="signupRequest" element={<SignupRequest/>}></Route>
            </Route>
          </Route>
          <Route path="/manager" element={<ManagerProtectedRoute/>}>
            <Route path="dashboard" element={<Dashboard/>}>
              <Route path="add-time-slots" element={<AddTimeSlots/>}></Route>
              <Route path="upload-post" element={<UploadPost/>}></Route>
              <Route path="my-posts" element={<MyPosts/>}></Route>
              <Route path="setup-ground" element={<SetupGround />}></Route>
              <Route path="bookingRequests" element={<BookingRequests/>}></Route>
            </Route>
          </Route>
          <Route path="/grounds" element={<Grounds/>}></Route>
          <Route path="/ground/:id" element={<SingleGround/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
