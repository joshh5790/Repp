import "./Footer.css";

const Footer = () => {
  return (
    <div className="repp-page-footer">
      {/* <button className='subscribe-button button-hover'>
        Subscribe to Newsletter
      </button> */}
      <div className="flex-col-center">
        <h3 style={{color: 'white'}}>
          Website Information
        </h3>
        <div
          style={{
            display: "flex",
            gap: "3rem",
            fontSize: "2rem",
          }}
        >
          <a href="https://github.com/joshh5790" target="_blank">
            <i className="fa-brands fa-github" style={{ color: "white" }} />
          </a>
          <a href="https://www.linkedin.com/in/joshua-ho-5790/" target="_blank">
            <i className="fa-brands fa-linkedin" style={{ color: "white" }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
