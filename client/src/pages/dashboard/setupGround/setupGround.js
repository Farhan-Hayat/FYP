import { useEffect, useState } from "react";
import GroundBasicDetails from "../../../components/setupGround/groundBasicDetails";
import useSearchGroundByOwnerId from "../../../hooks/ground/searchGroundByOwnerIdHook";

const SetupGround = () => {
  const { searchGroudByOwnerId } = useSearchGroundByOwnerId();
  const [groundExists, setGroundExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const checkGroundExist = async () => {
    const res = await searchGroudByOwnerId();
    if (res.ok) {
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
    <div>
      {loading ? (
        <p>Loading ...</p>
      ) : groundExists ? (
        <div>
          <p>You have already registered a ground</p>
        </div>
      ) : (
        <GroundBasicDetails />
      )}
    </div>
  );
};

export default SetupGround;
