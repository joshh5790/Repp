import "./RNDropdown.css";

const RNDropdown = ({
  sectionHeaders,
  scrollToId,
  hideDropdown,
  setHideDropdown,
  preview,
}) => {
  const handleHeaderClick = (header) => {
    scrollToId(header);
    setHideDropdown(true);
  };

  return (
    <div
      id="rn-dropdown"
      className={`${hideDropdown ? "rn-hidden" : ""} ${
        preview ? "rn-preview" : ""
      }`}
    >
      <i
        onClick={() => setHideDropdown(true)}
        className="fa-solid fa-x hide-rn-dropdown"
      />
      <div id="rn-dropdown-links">
        {sectionHeaders.map((header) => (
          <div onClick={() => handleHeaderClick(header)} key={header}>
            {header}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RNDropdown;
