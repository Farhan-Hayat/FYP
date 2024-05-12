import React, { useState , useContext } from 'react';
import useRegisterGround from '../../hooks/ground/registerGroudHook';
import { UserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import "./groundBasicDetails.scss"
const GroundFacilitiesDetails = ({groundBasics}) => {
  // State variables
  const [bleachers, setBleachers] = useState(false);
  const [lighting, setLighting] = useState(false);
  const [waterCooler, setWaterCooler] = useState(false);
  const [parking, setParking] = useState(false)
  const [capacity,setCapacity] = useState("")
  const [description , setDescription] = useState("")
  const [refreshmentArea , setRefreshmentArea] = useState(false)
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  // Add more facilities as needed

  // Event handlers for facility changes
  const handleBleachersChange = () => setBleachers(!bleachers);
  const handleLightingChange = () => setLighting(!lighting);
  const handleWaterCoolerChange = () => setWaterCooler(!waterCooler);
  const handleParkingChange = () => setParking(!parking)
  const handleRefreshmentAreaChange = ()=>setRefreshmentArea(!refreshmentArea)
  const handleCapacityChange = (e) => setCapacity(e.target.value)
  const handleDescriptionChange = (e)=>setDescription(e.target.value)
  // Add more facility handlers as needed

  const {registerGround} = useRegisterGround()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const body= {...groundBasics,bleachers,capacity,lighting,waterCooler,parking,refreshmentArea,description , owner:user._id}
    console.log(body)
    const res = await registerGround(body)
    if(res.ok){
      navigate("/manager/dashboard/add-time-slots")
    }
     
  }

  return (
    <div className='GroundFacilitiesDetails'>
      <h1>Ground Amenities and Description</h1>
    <form>

      <label>
        Bleachers:
        <input type="checkbox" checked={bleachers} onChange={handleBleachersChange} />
      </label>

      <label>
        Lighting:
        <input type="checkbox" checked={lighting} onChange={handleLightingChange} />
      </label>

      <label>
        Water Cooler:
        <input type="checkbox" checked={waterCooler} onChange={handleWaterCoolerChange} />
      </label>
      <label>
        Parking:
        <input type="checkbox" checked={parking} onChange={handleParkingChange} />
      </label>
      <label>
        Refreshment Area:
        <input type="checkbox" checked={refreshmentArea} onChange={handleRefreshmentAreaChange} />
      </label>
      <label>
        Capcity:
        <input type="number" value={capacity} onChange={handleCapacityChange} />
      </label>
      <label>
        Description
        <input type="text" value={description} onChange={handleDescriptionChange} />
        {/* <textarea name="" id="" cols="30" rows="10" ></textarea> */}
      </label>

      <button onClick={handleSubmit}>Submit</button>
    </form>
    </div>
  );
};

export default GroundFacilitiesDetails;
