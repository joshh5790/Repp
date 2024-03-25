import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteProfileThunk } from "../../../store/profiles";
import { updateUser } from "../../../store/session";
import "./DeleteProfile.css";

function DeleteProfile({ profile }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirmation, setConfirmation] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if (
      confirmation === `delete profile ${profile?.displayName}` &&
      profile?.id !== 1
    ) {
      setDisableButton(false);
    } else setDisableButton(true);
    if (profile?.id === 1) setConfirmation("Cannot delete demo profile");
  }, [confirmation, profile?.displayName]);

  const handleDelete = () => {
    dispatch(deleteProfileThunk(profile.id)).then(() => {
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
      <p> All information associated with your profile will be deleted.</p>
      <p>Are you sure you want to delete your profile?</p>
      <p>
        Type{" "}
        <span className="red-text">delete profile {profile?.displayName}</span>{" "}
        below to confirm.
      </p>
      <input
        value={confirmation}
        onChange={(e) => setConfirmation(e.target.value)}
        id="delete-confirmation"
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
          Delete Profile
        </button>
      </div>
    </div>
  );
}

export default DeleteProfile;
