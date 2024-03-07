import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteUser } from "../../../store/session";
import { useHistory } from "react-router-dom";
import "./DeleteAccount.css";

function DeleteAccount({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirmation, setConfirmation] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if (confirmation === `delete account ${user.email}`) {
      setDisableButton(false);
    } else setDisableButton(true);
  }, [confirmation, user.email]);

  const handleDelete = () => {
    dispatch(deleteUser(user.id))
    closeModal();
    history.push("/");
  };

  return (
    <div className="delete-account-container">
      <h2>Delete Your Account?</h2>
      <p>
        This action <b>cannot</b> be undone.
      </p>
      <p> All information associated with your account will be deleted.</p>
      <p>Are you sure you want to delete your account?</p>
      <p>
        Type <span className="red-text">delete account {user.email}</span>{" "}
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
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
