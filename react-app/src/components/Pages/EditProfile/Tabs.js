import "./Tabs.css";

const Tabs = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="manage-profile-tabs">
      <span
        className={currentTab === "General" ? "focus-tab" : " "}
        onClick={() => setCurrentTab("General")}
      >
        General
      </span>
      <span
        className={currentTab === "Socials" ? "focus-tab" : " "}
        onClick={() => setCurrentTab("Socials")}
      >
        Socials
      </span>
      <span
        className={currentTab === "Products" ? "focus-tab" : " "}
        onClick={() => setCurrentTab("Products")}
      >
        Products
      </span>
      <span
        className={currentTab === "Tours" ? "focus-tab" : ""}
        onClick={() => setCurrentTab("Tours")}
      >
        Tours
      </span>
      <span
        className={currentTab === "Videos" ? "focus-tab" : " "}
        onClick={() => setCurrentTab("Videos")}
      >
        Videos
      </span>
      <span
        className={currentTab === "+ More" ? "focus-tab" : " "}
        onClick={() => setCurrentTab("+ More")}
      >
        + More
      </span>
    </div>
  );
};

export default Tabs;
