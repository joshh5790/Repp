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
  const [tourName, setTourName] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState("");
  const [ticketsLink, setTicketsLink] = useState("");
  const [addMode, setAddMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editInput, setEditInput] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (profile) {
      dispatch(getToursThunk(profile.id));
    }
  }, [dispatch, profile]);

  const focusTour = (tour) => {
    if (!editInput && !addMode) {
      setEditInput(tour.id);
      setTourDate(tour.tourDate);
      setVenue(tour.venue);
      setLocation(tour.location);
      setTicketsLink(tour.ticketsLink);
    }
  };

  const handleTourNameChange = () => {};

  const handleAddTour = () => {};

  const handleDeleteTour = (tourId) => {};

  const handleUpdateTour = (tourId) => {};

  const handleDeleteAllTours = () => {};

  // sold out will be a button right under the x for removing a tour
  // click the SOLD OUT? button to mark a tour as sold out! with party emojis

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
      <div className="new-card-button add-tour-button">+ Add Tour Location</div>
      {tours &&
        tours.map((tour) => (
          <div key={tour.id} className={`tour-card ease-bg ${editInput === tour.id ? 'focus-tour' : ''}`} onClick={() => focusTour(tour)}>
            <div>{tour.soldOut ? '🎉 SOLD OUT! 🎉' : 'Sold out?'}</div>
            <button
            className="delete-card"
            onClick={() => handleDeleteTour(tour.id)}
            style={{
              gridArea: "buttons",
              alignSelf: "start",
              justifySelf: "end",
              }}
            >
              <i className="fa-solid fa-x" />
            </button>
            <div></div>
            <form>
              <input
                className=""
                value={tour.tourDate}
                onChange={(e) => setTourDate(e.target.value)}
                disabled={editInput !== tour.id}
              />
              <input
                className=""
                value={tour.venue}
                onChange={(e) => setVenue(e.target.value)}
                disabled={editInput !== tour.id}
              />
              <input
                className=""
                value={tour.location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={editInput !== tour.id}
              />
              <input
                className=""
                value={tour.ticketsLink}
                onChange={(e) => setTicketsLink(e.target.value)}
                disabled={editInput !== tour.id}
              />
              <button className="">Cancel</button>
              <button className="" onClick={() => handleUpdateTour(tour.id)}>
                Save
              </button>
            </form>
          </div>
        ))}
      <button
        className="clear-all-tours-button button-hover"
        onClick={handleDeleteAllTours}
      >
        Delete All Tours
      </button>
    </>
  );
};

export default EditTours;
