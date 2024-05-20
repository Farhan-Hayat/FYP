import { useEffect, useState } from "react";
import useGetSignupRequest from "../../../hooks/signupRequest/getSignupRequest";
import useSignup from "../../../hooks/authentication/signupHook";
import useDeleteSignupRequest from "../../../hooks/signupRequest/deleteSignupRequest";
const SignupRequest = () => {
  const [requests , setRequests] = useState([])
  const {getSignupRequest} = useGetSignupRequest();
  const {signup} = useSignup()
  const {deleteRequest} = useDeleteSignupRequest();
  const handleGetRequests = async ()=>{
    const res = await getSignupRequest()
    if(res.ok){
      setRequests(res.data)
      console.log(res.data)
    }else{
      console.log(res)
    }
  }
  
  const handleAccept = async (request)=>{
    const body = {name:request.name,username:request.username,password:request.password,phoneNumber:request.phoneNumber,role:request.role}
    const res = await signup(body)
    if(res.ok){
      console.log(res)
      handleDecline(request._id)
    }
  }

  const handleDecline =async (id)=>{
    const res = await deleteRequest(id)
    if(res.ok){
      setRequests(requests.filter(item=>item._id!==res.data._id))
      // console.log(requests)
    }
    else{
      console.log(res)
    }
  }

  useEffect(() => {
    handleGetRequests()
  }, []);
  return ( 
    <div className="signupRequest">
      {requests.length < 1 && <div><p>NO request to show</p></div>}
      {requests.length > 0 && requests.map(request=>(
        <div key={request._id} className="reqCard">
          <p> <b>Name : </b> {request.name}</p>
          <p> <b>Username:</b> {request.username}</p>
          <p> <b>Phone Number:</b> {request.phoneNumber} </p>
          <p> <b>Date Requested:</b> {request.createdAt.split("T")[0]} </p>
          <div className="buttonHolder">

          <button onClick={()=>handleAccept(request)}>ACCEPT</button>
          <button onClick={()=>handleDecline(request._id)}>DECLINE</button>
          </div>
          <div className="imgHolder">
            <img src={request.document} alt="" />
          </div>
        </div>
      ))}
    </div>
   );
}
 
export default SignupRequest;