import "./Headers.css";

const Headers = ({ text, narrow, mobileTab, setMobileTab }) => {
  return (
    <h2 className="manage-nav">
      {!narrow ? (
        text === "manage" ? (
          <>Manage Profile</>
        ) : (
          <>
            {/* <span
                    style={{
                      fontWeight: `${previewStyle ? "normal" : "bold"}`,
                    }}
                  >
                    Desktop
                  </span>
                  &nbsp;|&nbsp; */}
            <span
            // onClick={() => setPreviewStyle((prev) => !prev)}
            // style={{
            //   fontWeight: `${!previewStyle ? "normal" : "bold"}`,
            // }}
            >
              Mobile Preview
            </span>
          </>
        )
      ) : (
        <div
          className="mobile-header"
        >
          <div
            className={`mobile-header-name ${
              mobileTab === "edit" && "focus"
            }`}
            onClick={() => setMobileTab("edit")}
          >
            Edit
          </div>
          <div
            className={`mobile-header-name ${
              mobileTab === "preview" && "focus"
            }`}
            onClick={() => setMobileTab("preview")}
          >
            Preview
          </div>
        </div>
      )}
    </h2>
  );
};

export default Headers;

/*
<div className="switch-header manage-nav">
            {narrow && mobileTab === "preview" ? (
              <div
                className="button-hover switch-manage-button"
                onClick={() => setMobileTab("manage")}
              >
                Manage
              </div>
            ) : narrow && mobileTab === "manage" ? (
              <div
                className="button-hover switch-manage-button"
                onClick={() => setMobileTab("preview")}
              >
                Preview
              </div>
            ) : (
              <></>
            )}
          </div>
*/
