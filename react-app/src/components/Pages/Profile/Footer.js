import "./Footer.css";

const Footer = () => {
  return (
    <div id="profile-page-footer">
      {/* <button className='subscribe-button button-hover'>
        Subscribe to Newsletter
      </button> */}
      <div className="flex-col-center">
        <h3>
          Website Information
        </h3>
        <div
          style={{
            display: "flex",
            gap: "3rem",
            fontSize: "2rem",
          }}
        >
          {/* <a href="https://github.com/joshh5790" target="_blank">
            <i className="fa-brands fa-github" style={{ color: "#F1F1F1" }} />
          </a> */}
          <a href="https://www.linkedin.com/in/joshua-ho-5790/" target="_blank">
            <i className="fa-brands fa-linkedin" style={{ color: "#F1F1F1" }} />
          </a>
        </div>
      </div>
      <h3>Contact Info</h3>
      <div>
        joshh5790@gmail.com
      </div>
      <div style={{marginTop: "0.5rem"}}>
        (408) 590-7827
      </div>
    </div>
  );
};

export default Footer;
