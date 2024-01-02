import { useState } from "react";
import GroundFacilitiesDetails from "./groundFacilitiesDetails";

const GroundBasicDetails = () => {
  const [groundName, setGroundName] = useState('');
  const [location, setLocation] = useState('');
  const [contactInformation, setContactInformation] = useState('');
  const [groundSize, setGroundSize] = useState('');
  const [price, setPrice] = useState('');


  const handleGroundNameChange = (e) => setGroundName(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleContactInformationChange = (e) => setContactInformation(e.target.value);
  const handleGroundSizeChange = (e) => setGroundSize(e.target.value);
  const handlePricingChange = (e) => setPrice(e.target.value);

  return ( 
    <div>
      <h1>Ground Basic Details</h1>
      <form>
      <label>
        Ground Name:
        <input type="text" value={groundName} onChange={handleGroundNameChange} />
      </label>

      <label>
        Location:
        <input type="text" value={location} onChange={handleLocationChange} />
      </label>

      <label>
        Contact Information:
        <input type="text" value={contactInformation} onChange={handleContactInformationChange} />
      </label>

      <label>
        Ground Size:
        <input type="number" value={groundSize} onChange={handleGroundSizeChange} />
      </label>

      <label>
        Pricing per Slot:
        <input type="number" value={price} onChange={handlePricingChange} />
      </label>

      </form>
      <GroundFacilitiesDetails groundBasics={{groundName,groundSize,contactInformation,location,price}}/>
    </div>
   );
}
 
export default GroundBasicDetails;