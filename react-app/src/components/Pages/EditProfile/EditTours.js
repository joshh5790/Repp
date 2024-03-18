import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTourThunk,
  getToursThunk,
  updateTourThunk,
} from "../../../store/tours";
import { updateProfileThunk } from "../../../store/profiles";
import ManageTour from "../../Modals/ManageTour";
import OpenModalButton from "../../OpenModalButton";
import "./EditTours.css";

const EditTours = ({ profile }) => {
  const dispatch = useDispatch();
  const tours = useSelector((state) => Object.values(state.tours)); // .sort((a, b) => a.date - b.date), tour dates are not date variables
  const [tourName, setTourName] = useState(profile.tourName);
  const [tourDate, setTourDate] = useState("");
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState("");
  const [ticketsLink, setTicketsLink] = useState("");
  const [editInput, setEditInput] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (profile) {
      dispatch(getToursThunk(profile.id));
    }
  }, [dispatch, profile]);

  const focusTour = (e, tour) => {
    e.preventDefault();
    if (!editInput) {
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

  const handleSoldOut = (tourId, soldOut) => {
    dispatch(updateTourThunk({ tourId, soldOut: !soldOut }));
    setEditInput(0);
  };

  const handleDeleteTour = (tourId, e) => {
    e.preventDefault();
    dispatch(deleteTourThunk(tourId));
    resetState();
  };

  const resetState = () => {
    setEditInput(0);
    setTourDate("");
    setVenue("");
    setLocation("");
    setTicketsLink("");
  };

  // tours need to be sorted by date, can have a button to sort by earliest and latest

  // maybe move delete all tours to + More tab

  return (
    <>
      <div className="edit-tour-name-div">
        <b style={{ gridArea: "label" }}>Tour Name</b>
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
      <OpenModalButton
        modalComponent={<ManageTour profileId={profile?.id} />}
        buttonText={<b>+ New Tour Location</b>}
        className={"new-card-button"}
      />
      <div className="edit-tours-list">
        {tours &&
          tours.map((tour) => (
            <div
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
                onClick={(e) => handleDeleteTour(tour.id, e)}
              >
                <i className="fa-solid fa-x" />
              </button>
              <div style={{gridArea: "details"}}>
                <div>
                  <b>{tour?.tourDate}</b>
                </div>
                <div>{tour?.venue}</div>
                <div>{tour?.location}</div>
              </div>
              <a href={tour?.ticketsLink}>Link</a>
            </div>
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
