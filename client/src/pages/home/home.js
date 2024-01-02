import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetAllPosts from "../../hooks/post/getAllPostsHook";
import "./home.scss";
const Home = () => {
  //variables
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAllPosts } = useGetAllPosts();
  //functions
  const fetchPosts = async () => {
    const res = await getAllPosts();
    if (res.ok) {
      setPosts(res.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log("error");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const sortedPosts = posts
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="Home">
      <section className="landingPage">
        <div className="backgroundImage"></div>
        <div className="landingPageContent">
          <h1>NAVIGATE THE FOOTBALL WORLD WITH PITCH HUB</h1>
          <button>
            <Link to="/grounds">Book Now</Link>
          </button>
        </div>
      </section>
      <section className="feedSection">
        
        <div className="feedSectionChild">
          <div className="postHeadingCont">
          <h1>Update Feed</h1>
          </div>
          <div className="postsContainer">
          <div className="leftSideCont">
            <button>Home</button>
            <button>Grounds</button>
            <button>User Profile</button>
            <button>Signup</button>
            <button>Contact Us</button>
            <button>About Us</button>
            <br />
            <hr />
          </div>
            {isLoading ? (
              <div>loading...</div>
            ) : posts.length < 1 ? (
              <div>no posts yet!</div>
            ) : (
              <div className="posts">
                {sortedPosts.map((post) => (
                  <div key={post._id} className="post">
                    <div className="postDetail">
                      <div>
                        <img
                          className="postDetailDp"
                          src={post.user.profilePicture}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="postDetailName">{post.user.name}</p>
                        <p className="postDetailDate">
                          {post.createdAt.split("T")[0]}
                        </p>
                      </div>
                    </div>
                    <div className="postDescription">
                      <p className={post.imageUrl ? "" : "bigText"}>
                        {post.description}
                      </p>
                    </div>
                    <div className="postImage">
                      {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
                    </div>
                  </div>
                ))}

              </div>
            )}
            <div className="rightSideCont"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
