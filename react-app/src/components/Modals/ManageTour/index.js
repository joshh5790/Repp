import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createTourThunk, updateTourThunk } from "../../../store/tours";
import "./ManageTour.css";

const ManageTour = ({ profileId, tour }) => {
  const dispatch = useDispatch();
  const [tourDate, setTourDate] = useState("");
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState("");
  const [ticketsLink, setTicketsLink] = useState("");
  const { closeModal } = useModal();

  useEffect(() => {
    if (tour) {
      setTourDate(tour.tourDate)
      setVenue(tour.venue)
      setLocation(tour.location)
      setTicketsLink(tour.ticketsLink)
    }
  }, [tour])

  const manageTour = (e) => {
    e.preventDefault();
    if (profileId) {
      dispatch(
        createTourThunk({ profileId, tourDate, venue, location, ticketsLink })
      );
    }
    else {
      dispatch(updateTourThunk({ tourId: tour.id, tourDate, venue, location, ticketsLink }))
    }
    closeModal();
  };

  return (
    <div id="tour-modal">
      <form className="flex-col">
        <label className="product-input-label">
          Tour Date
          <input
            className="product-input"
            value={tourDate}
            onChange={(e) => setTourDate(e.target.value)}
          />
        </label>
        <label className="product-input-label">
          Venue
          <input
            className="product-input"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </label>
        <label className="product-input-label">
          Location
          <input
            className="product-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label className="product-input-label">
          Tickets Link
          <input
            className="product-input"
            value={ticketsLink}
            onChange={(e) => setTicketsLink(e.target.value)}
          />
        </label>
        <button
          className="tour-button button-hover"
          onClick={(e) => manageTour(e)}
        >
          {profileId ? "Add Tour" : "Update Tour"}
        </button>
      </form>
    </div>
  );
};

export default ManageTour;
