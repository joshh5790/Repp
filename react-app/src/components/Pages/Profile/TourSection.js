import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TourSection.css";
import { getToursThunk } from "../../../store/tours";

const TourSection = ({ profileId, tourName, previewStyle }) => {
  const dispatch = useDispatch();
  const tours = useSelector((state) => Object.values(state.tours)); // rename tours to tourName, optional
  // can create tours whenever, add button to clear all tours
  // tours edit page will have a text bar on top for the title, and underneath is the same just add tour location

  // each tour will have date top left, venue right under, location center, booking link right, sold out boolean
  useEffect(() => {
    dispatch(getToursThunk(profileId));
  }, [dispatch, profileId]);
  return (
    <div className="profile-page-tours">
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
