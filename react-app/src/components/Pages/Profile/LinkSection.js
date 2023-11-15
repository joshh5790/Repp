import { invalidImage } from "../../../utilities";
import "./LinkSection.css";

const LinkSection = ({
  page,
  sectionHeaders,
  scrollToId,
  mainImage,
  isMobile,
  preview
}) => {
  return (
    <>
      <div className="mobile-page-links flex-col-center">
        {isMobile && (
          <div className="mobile-headers-div flex-col-center">
            {sectionHeaders.map((header) => (
              <div
                className="mobile-header"
                onClick={() => scrollToId(header)}
                key={header}
              >
                {header}
              </div>
            ))}
          </div>
        )}
      </div>
      {isMobile && (
        <div style={{position: `${preview && "absolute"}`}} className="mobile-socials-div">
          {page?.tiktok && (
            <a target="_blank" rel="noreferrer" href={page.tiktok}>
              <i className="fa-brands fa-tiktok repp-socials" />
            </a>
          )}
          {page?.youtube && (
            <a target="_blank" rel="noreferrer" href={page.youtube}>
              <i
                className="fa-brands fa-youtube repp-socials"
                style={{ color: "white" }}
              />
            </a>
          )}
          {page?.instagram && (
            <a target="_blank" rel="noreferrer" href={page.instagram}>
              <i
                className="fa-brands fa-instagram repp-socials"
                style={{ color: "white" }}
              />
            </a>
          )}
          {page?.applemusic && (
            <a target="_blank" rel="noreferrer" href={page.applemusic}>
              <i className="fa-brands fa-apple repp-socials" />
            </a>
          )}
          {page?.spotify && (
            <a target="_blank" rel="noreferrer" href={page.spotify}>
              <i
                className="fa-brands fa-spotify repp-socials"
                style={{ color: "white" }}
              />
            </a>
          )}
          {page?.facebook && (
            <a target="_blank" rel="noreferrer" href={page.facebook}>
              <i
                className="fa-brands fa-facebook repp-socials"
                style={{ color: "white" }}
              />
            </a>
          )}
          {page?.discord && (
            <a target="_blank" rel="noreferrer" href={page.discord}>
              <i
                className="fa-brands fa-discord repp-socials"
                style={{ color: "white" }}
              />
            </a>
          )}
          {page?.twitter && (
            <a target="_blank" rel="noreferrer" href={page.twitter}>
              <i
                className="fa-brands fa-twitter repp-socials"
                style={{ color: "white" }}
              />
            </a>
          )}
          {page?.external && (
            <a target="_blank" rel="noreferrer" href={page.external}>
              <i className="fa-solid fa-square-up-right repp-socials" />
            </a>
          )}
        </div>
      )}
      <img
        className="repp-page-home-img"
        src={mainImage}
        alt={page?.displayName}
        onError={invalidImage}
      />
      <div className="repp-home-text">
        {!isMobile && <h1>{page?.displayName}</h1>}
      </div>
    </>
  );
};

export default LinkSection;
