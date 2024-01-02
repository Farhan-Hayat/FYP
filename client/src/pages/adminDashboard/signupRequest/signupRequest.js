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
    <div>
      {requests.length < 1 && <div><p>NO request to show</p></div>}
      {requests.length > 0 && requests.map(request=>(
        <div key={request._id}>
          <p>{request.name}</p>
          <p>{request.username}</p>
          <button onClick={()=>handleAccept(request)}>Accept</button>
          <button onClick={()=>handleDecline(request._id)}>DECLINE</button>
        </div>
      ))}
    </div>
   );
}
 
export default SignupRequest;