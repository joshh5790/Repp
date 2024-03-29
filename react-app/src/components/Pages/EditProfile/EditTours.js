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
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (profile) {
      dispatch(getToursThunk(profile.id));
    }
  }, [dispatch, profile]);

  const handleTourNameChange = () => {
    dispatch(updateProfileThunk({ profileId: profile.id, tourName }));
    setReload((prev) => !prev);
  };

  const handleSoldOut = (tourId, soldOut) => {
    dispatch(updateTourThunk({ tourId, soldOut: !soldOut }));
  };

  const handleDeleteTour = (tourId, e) => {
    e.preventDefault();
    dispatch(deleteTourThunk(tourId));
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
            <div key={tour?.id} className="tour-card ease-bg">
              <div
                className="tour-card-button button-hover"
                style={{ gridArea: "soldout" }}
                onClick={() => handleSoldOut(tour?.id, tour?.soldOut)}
              >
                {tour.soldOut ? "🎉 SOLD OUT! 🎉" : "Sold out?"}
              </div>
              <OpenModalButton
                className={
                  "edit-card edit-tour-button ease-bg" +
                  (tour?.soldOut ? " disabled" : "")
                }
                buttonText={<i className="fa-regular fa-pen-to-square" />}
                modalComponent={<ManageTour tour={tour} />}
              />
              <button
                className="delete-card delete-tour"
                onClick={(e) => handleDeleteTour(tour.id, e)}
              >
                <i className="fa-solid fa-x" />
              </button>
              <div
                className="edit-tour-details"
                style={{ gridArea: "details" }}
              >
                <div>
                  <b>{tour?.tourDate}</b>
                </div>
                <div>{tour?.venue}</div>
                <div>{tour?.location}</div>
              </div>
              <a
                target="_blank"
                className="tour-card-button button-hover"
                style={{ textDecoration: "none", gridArea: "link" }}
                href={tour?.ticketsLink}
              >
                Link
              </a>
            </div>
          ))}
      </div>
    </>
  );
};

export default EditTours;
