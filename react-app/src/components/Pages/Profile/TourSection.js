import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TourSection.css";
import { getToursThunk } from "../../../store/tours";

const TourSection = ({ profileId, tourName, previewStyle }) => {
  const dispatch = useDispatch();
  const tours = useSelector((state) => Object.values(state.tours));

  useEffect(() => {
    dispatch(getToursThunk(profileId));
  }, [dispatch, profileId]);
  return (
    <div id="profile-page-tours">
      <h2>{tourName}</h2>
      {tours.map((tour) => (
        <div
          key={tour?.id}
          className={"tour-details " + (previewStyle ? "mobile" : "desktop")}
        >
          <div style={{ gridArea: "date", fontWeight: "bold" }}>
            {tour?.tourDate}
          </div>
          <div style={{ gridArea: "venue" }}>{tour?.venue}</div>
          <div className={"tour-location-div " + (previewStyle ? "mobile" : "desktop")}>{tour?.location}</div>
          <a
            target="_blank"
            rel="noreferrer"
            href={tour?.ticketsLink}
            className={
              tour?.soldOut
                ? "sold-out button-hover"
                : "tour-tickets-button button-hover"
            }
            onClick={(e) => {
              if (tour?.soldOut) e.preventDefault();
            }}
          >
            {tour?.soldOut ? "SOLD OUT" : "BUY TICKETS"}
          </a>
        </div>
      ))}
    </div>
  );
};

export default TourSection;
