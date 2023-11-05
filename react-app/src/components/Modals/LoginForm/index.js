import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/session";
import { useModal } from "../../../context/Modal";
import logo from "../../../images/repp_name.png";
import OpenModalButton from "../../OpenModalButton";
import SignupForm from "../SignupForm";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if (credential.length > 3 && password.length > 5) {
      setDisableButton(false);
    } else setDisableButton(true);
  }, [credential, password]);

  const onSubmit = (e) => {
    setError("");
    e.preventDefault();
    dispatch(login(credential, password)).then(async (data) => {
      if (data) setError(data[0]);
      else closeModal();
    });
  };

  const handleDemo = () => {
    dispatch(login("ericnam@aa.io", "password")).then(closeModal);
  };

  return (
    <div className="login-modal-container">
      <h1 className="modal-header">
        Login to <img src={logo} className="logo" />
      </h1>
      {error && <p className="error-msg">{error}</p>}
      <form className="login-form" onSubmit={onSubmit}>
        <input
          className="login-input"
          name="credential"
          placeholder="Email address"
          type="text"
          value={credential}
          onChange={(e) => {
            setError("");
            setCredential(e.target.value);
          }}
          required
        />
        <input
          className="login-input"
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setError("");
            setPassword(e.target.value);
          }}
          required
        />
        <button className="submit-login-button" disabled={disableButton}>
          Log In
        </button>
      </form>
      <button className="demo-user-button" onClick={handleDemo}>
        Demo User
      </button>
      <OpenModalButton
        buttonText="Don't have an account? Sign up"
        modalComponent={<SignupForm />}
        onButtonClick={closeModal}
        className="signup-redirect-button"
      />
    </div>
  );
}

export default LoginForm;
