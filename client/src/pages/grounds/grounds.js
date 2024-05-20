import { useEffect, useState } from "react";
import useGetAllGrounds from "../../hooks/ground/getAllGroundsHook";
import { Link } from "react-router-dom";
import "./grounds.scss";

const Grounds = () => {
  const [grounds, setGrounds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { getAllGrounds } = useGetAllGrounds();

  const fetchGrounds = async () => {
    const res = await getAllGrounds();
    if (res.ok) {
      setGrounds(res.data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchGrounds();
  }, []);

  const handleInputChange = async (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    // Fetch all grounds if the search query is empty
    if (newQuery.trim() === '') {
      fetchGrounds();
    } else {
      // Otherwise, filter grounds based on the search query
      const res = await getAllGrounds();
      if (res.ok) {
        const filteredGrounds = res.data.filter(ground =>
          ground.groundName.toLowerCase().includes(newQuery.toLowerCase())
        );
        setGrounds(filteredGrounds);
      } else {
        console.log("error");
      }
    }
  };

  return (
    <div className="Grounds">
      <div className="headingCont">
        <h1>Grounds</h1>
      </div>
      <div className="cardsCont">
        <div className="searchBoxCont">
          <input
            type="text"
            className="searchBox"
            placeholder="Search Ground Name"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        {grounds.length < 1 && <div>NO grounds to show</div>}
        {grounds.length > 0 &&
          grounds.map((ground) => (
            <div key={ground._id} className="card">
              <Link to={`/ground/${ground._id}`}>
                <div className="cardImgCont">
                  <img src="https://c.wallhere.com/photos/c0/f3/Football_football_stadium_footballers_soccer_Soccer_Field_soccer_pitches_Soccer_Spirits_nature-1805339.jpg!d" alt="" />
                </div>
                <div className="cardDetailCont">
                  <p><strong>Name:</strong> {ground.groundName}</p>
                  <p><strong>Owner:</strong> {ground.owner.name}</p>
                  <p><strong>Location:</strong>  {ground.location}</p>
                  <p><strong>Size:</strong> {ground.groundSize}</p>
                  <p><strong>Price Per Slot:</strong> {ground.price}</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Grounds;
