import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createTourThunk } from "../../../store/tours";
import "./AddTour.css";

const AddTour = ({ profileId }) => {
  const dispatch = useDispatch();
  const [tourDate, setTourDate] = useState("");
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState("");
  const [ticketsLink, setTicketsLink] = useState("");
  const { closeModal } = useModal();

  const handleAddTour = (e) => {
    e.preventDefault();
    dispatch(
      createTourThunk({ profileId, tourDate, venue, location, ticketsLink })
    );
    closeModal();
  };

  return (
    <>
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
        <button className="add-tour-button button-hover" onClick={(e) => handleAddTour(e)}>
          Add Tour
        </button>
      </form>
    </>
  );
};

export default AddTour;
