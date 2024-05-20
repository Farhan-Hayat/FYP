const AboutUs = () => {
  return (
    <div className="ContactUs">
      <div className="headingCont">
        <h1>About Us</h1>
      </div>
      <div className="contactUsDiv">
        <h3></h3>
        <div className="contactUsInfo">
          <p className="contactUsMoto">
            At PITCHHUB, we're passionate about bringing together football
            enthusiasts and ground owners to create a seamless experience for
            booking football matches. Whether you're a seasoned player, a
            budding team, or a ground owner looking to fill your pitch, we've
            got you covered.
          </p>
          <div className="contactUsMoreInfo">
            <h3>Our Mission</h3>
            <p style={{ fontSize: "18px" }}>
              Our mission is to facilitate the connection between football teams
              and ground owners, making it easier than ever to organize matches,
              build communities, and foster a love for the beautiful game.
            </p>
            <h3>What We Offer</h3>
            <ul>
              <li style={{ fontSize: "18px" }}>
                With our user-friendly platform, booking a football ground has
                never been simpler. Just a few clicks, and you're all set to hit
                the pitch.
              </li>
              <li style={{ fontSize: "18px" }}>
                We've partnered with numerous ground owners across Rawalpindi,
                ensuring you have plenty of options to choose from, no matter
                where you are.
              </li>
              <li style={{ fontSize: "18px" }}>
                Beyond just booking matches, we're dedicated to building a
                vibrant football community. Connect with fellow players, join
                leagues, and share your passion for football with like-minded
                individuals.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
