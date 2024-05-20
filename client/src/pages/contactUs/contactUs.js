import "./contactUs.scss";

const ContactUs = () => {
  return (
    <div className="ContactUs">
      <div className="headingCont">
        <h1>Contact Us</h1>
      </div>
      <div className="contactUsDiv">
        <h3>How can you contact us?</h3>
        <div className="contactUsInfo">
          <p className="contactUsMoto">
            At PITCHUB we believe in providing excellent Service to our
            Customers.
          </p>
          <div className="contactUsMoreInfo">
            <p>
              However, if you still require more information or assistance, feel
              free to contact our Customer Support team!
            </p>
            <p>You can:</p>
            <ol>
              <li>
                Send us an email: help@pitchhub.com.pk (09:00 am till 09:00 pm only){" "}
              </li>
              <li>Live chat (09:00 am till 09:00 pm only) </li>
              <li> Submit a support request by filling this form</li>
              <li> Call us: 0800-10101 (9:00 am till 09:00 pm only)</li>
              <li>
                Visit our Facebook page: /PitchHubPakistan (09:00 am till 09:00 pm
                only){" "}
              </li>
              <li>
                Reach us on Insta/Twitter: @PitchHub_Pakistan (09:00 am till 09:00 pm
                only){" "}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
