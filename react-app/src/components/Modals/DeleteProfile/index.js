import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteProfileThunk } from "../../../store/profiles";
import { updateUser } from "../../../store/session";
import "./DeleteProfile.css";

function DeleteProfile({ page }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirmation, setConfirmation] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if (confirmation === `delete profile ${page.displayName}`) {
      setDisableButton(false);
    } else setDisableButton(true);
  }, [confirmation, page.displayName]);

  const handleDelete = () => {
    dispatch(deleteProfileThunk(page.id)).then(() => {
      dispatch(updateUser({ isRepp: false }));
      closeModal();
      history.push("/");
    });
  };

  return (
    <div>
      <h2>Delete Your Profile?</h2>
      <p>
        This action <b>cannot</b> be undone.
      </p>
      <p> All information associated with your page will be deleted.</p>
      <p>Are you sure you want to delete your page?</p>
      <p>
        Type <span className="red-text">delete page {page.displayName}</span>{" "}
        below to confirm.
      </p>
      <input
        value={confirmation}
        onChange={(e) => setConfirmation(e.target.value)}
        className="delete-confirmation"
      />
      <div className="delete-button-div">
        <button className="delete-acc-cancel button-hover" onClick={closeModal}>
          Cancel
        </button>
        <button
          disabled={disableButton}
          className="confirm-delete-acc-button button-hover"
          onClick={handleDelete}
        >
          Delete Page
        </button>
      </div>
    </div>
  );
}

export default DeleteProfile;
