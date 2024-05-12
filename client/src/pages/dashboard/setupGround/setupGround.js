import { useEffect, useState } from "react";
import GroundBasicDetails from "../../../components/setupGround/groundBasicDetails";
import useSearchGroundByOwnerId from "../../../hooks/ground/searchGroundByOwnerIdHook";
import "./setupGround.scss"
const SetupGround = () => {
  const { searchGroudByOwnerId } = useSearchGroundByOwnerId();
  const [groundExists, setGroundExists] = useState(false);
  const [groundDeatils , setGroundDetails] = useState(null)
  const [loading, setLoading] = useState(true);
  const checkGroundExist = async () => {
    const res = await searchGroudByOwnerId();
    if (res.ok) {
      setGroundDetails(res.data)
      setLoading(false);
      setGroundExists(true);
    } else {
      setLoading(false);
      setGroundExists(false);
    }
  };

  useEffect(() => {
    checkGroundExist();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="SetupGround">
      {loading ? (
        <p>Loading ...</p>
      ) : groundExists ? (
        <div>
          <p>You have already registered a ground : {groundDeatils&&groundDeatils.groundName}</p>
        </div>
      ) : (
        <GroundBasicDetails />
      )}
    </div>
  );
};

export default SetupGround;
