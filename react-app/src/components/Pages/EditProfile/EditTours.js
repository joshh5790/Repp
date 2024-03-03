import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTourThunk,
  deleteTourThunk,
  getToursThunk,
  updateTourThunk,
} from "../../../store/tours";
import { updateProfileThunk } from "../../../store/profiles";
import "./EditTours.css";

const EditTours = ({ profile }) => {
  const dispatch = useDispatch();
  const tours = useSelector((state) => Object.values(state.tours));
  const [tourName, setTourName] = useState(profile.tourName);
  const [tourDate, setTourDate] = useState("");
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState("");
  const [ticketsLink, setTicketsLink] = useState("");
  const [addMode, setAddMode] = useState(false);
  const [editInput, setEditInput] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (profile) {
      dispatch(getToursThunk(profile.id));
    }
  }, [dispatch, profile]);

  const focusTour = (e, tour) => {
    e.preventDefault();
    if (!editInput && !addMode) {
      setEditInput(tour.id);
      setTourDate(tour.tourDate);
      setVenue(tour.venue);
      setLocation(tour.location);
      setTicketsLink(tour.ticketsLink);
    }
  };

  const handleTourNameChange = () => {
    dispatch(updateProfileThunk({ profileId: profile.id, tourName }));
    setReload((prev) => !prev);
  };

  const handleAddTour = () => {
    dispatch(createTourThunk({tourDate, venue, location, ticketsLink}))
    resetState()
  };

  const handleSoldOut = (tourId, soldOut) => {
    dispatch(updateTourThunk({ tourId, soldOut: !soldOut }));
    setEditInput(0);
  };

  const handleDeleteTour = (tourId) => {
    dispatch(deleteTourThunk(tourId));
    resetState()
  };

  const handleUpdateTour = (tourId) => {
    dispatch(
      updateTourThunk({ tourId, tourDate, venue, location, ticketsLink })
    );
    resetState()
  };

  const resetState = () => {
    setEditInput(0);
    setTourDate("");
    setVenue("");
    setLocation("");
    setTicketsLink("");
  }

  // tours need to be sorted by date, can have a button to sort by earliest and latest

  // maybe move delete all tours to + More tab

  return (
    <>
      <div className="edit-tour-name-div">
        <b>Tour Name:</b>
        <input
          className="edit-tour-name-input"
          value={tourName}
          onChange={(e) => setTourName(e.target.value)}
        />
        <button
          className="confirm-tour-name-change button-hover"
          onClick={handleTourNameChange}
        >
          Confirm
        </button>
      </div>
      {!addMode ? (
        <div
          onClick={() => setAddMode(true)}
          className="new-card-button add-tour-button"
        >
          + New Tour Location
        </div>
      ) : (
        <div
          className="new-card-button add-tour-button"
          style={{
            border: "2px solid #999999",
            backgroundColor: "#F1F1F1",
            cursor: "auto",
          }}
        >
          <div
            className="flex-col"
            style={{
              marginTop: "1rem",
              gap: "0.5rem",
              width: "100%",
            }}
          >
            <label
              className="update-socials-label"
              style={{ marginBottom: "0" }}
            >
              Date
              <input
                className="add-video-input"
                value={tourDate}
                onChange={(e) => setTourDate(e.target.value)}
              />
            </label>
            <label
              className="update-socials-label"
              style={{ marginBottom: "0" }}
            >
              Venue
              <input
                className="add-video-input"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </label>
            <label
              className="update-socials-label"
              style={{ marginBottom: "0" }}
            >
              Location
              <input
                className="add-video-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <label
              className="update-socials-label"
              style={{ marginBottom: "0" }}
            >
              Link to Tickets
              <input
                className="add-video-input"
                value={ticketsLink}
                onChange={(e) => setTicketsLink(e.target.value)}
              />
            </label>
            <div>
              <button
                className="add-video-button button-hover"
                onClick={handleAddTour}
              >
                Add
              </button>
              <button
                className="cancel-video-button button-hover"
                onClick={() => {
                  resetState();
                  setAddMode(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="edit-tours-list">
        {tours &&
          tours.map((tour) => (
            <form
              key={tour?.id}
              className={`tour-card ease-bg ${
                editInput === tour?.id ? "focus-tour" : ""
              }`}
            >
              <div
                className="soldout-button button-hover"
                onClick={() => handleSoldOut(tour?.id, tour?.soldOut)}
              >
                {tour.soldOut ? "🎉 SOLD OUT! 🎉" : "Sold out?"}
              </div>
              <button
                className={"edit-card" + (tour?.soldOut ? " disabled" : "")}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "40px",
                  alignSelf: "start",
                  justifySelf: "end",
                }}
                onClick={(e) => focusTour(e, tour)}
                disabled={tour?.soldOut}
              >
                <i className="fa-regular fa-pen-to-square" />
              </button>
              <button
                className="delete-card delete-tour"
                onClick={() => handleDeleteTour(tour.id)}
              >
                <i className="fa-solid fa-x" />
              </button>
              <input
                className="tour-input"
                placeholder="Date"
                value={editInput !== tour.id ? tour.tourDate : tourDate}
                onChange={(e) => setTourDate(e.target.value)}
                disabled={editInput !== tour.id}
              />
              <input
                className="tour-input"
                placeholder="Venue"
                value={editInput !== tour.id ? tour.venue : venue}
                onChange={(e) => setVenue(e.target.value)}
                disabled={editInput !== tour.id}
              />
              <input
                className="tour-input"
                placeholder="Location"
                value={editInput !== tour.id ? tour.location : location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={editInput !== tour.id}
              />
              <input
                className="tour-input"
                placeholder="External Tickets Link"
                value={editInput !== tour.id ? tour.ticketsLink : ticketsLink}
                onChange={(e) => setTicketsLink(e.target.value)}
                disabled={editInput !== tour.id}
              />
              {editInput === tour.id && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    gridArea: "buttons",
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  <button
                    className="tour-button-cancel button-hover"
                    onClick={resetState}
                  >
                    Cancel
                  </button>
                  <button
                    className="tour-button-save button-hover"
                    onClick={() => handleUpdateTour(tour.id)}
                  >
                    Save
                  </button>
                </div>
              )}
            </form>
          ))}
      </div>
      {/* <button
        className="clear-all-tours-button button-hover"
        onClick={handleDeleteAllTours}
      >
        Delete All Tours
      </button> */}
    </>
  );
};

export default EditTours;
