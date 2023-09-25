import { useState } from "react";
import "../styles/LoginRegister.css";
import { updateLoginName, updateLoginPassword, updateRegisterName, updateRegisterPassword, updateSession } from "../actions";
import { connect } from "react-redux";
import { API_HOST } from "../config";

const OnboardingComponent = (props) => {
  const [activeForm, setActiveForm] = useState("login");

  const handleTabClick = (formType) => {
    setActiveForm(formType);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let data = {
      username: props.registerName,
      password: props.registerPassword,
    };
    let r = await fetch(`${API_HOST}/register`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    if (r.status === 409) {
      alert(`A user with that name already exists!`);
      return;
    }
    if (r.status !== 200) {
      alert("An error occurred!");
      return;
    }
    alert(`User successfully created! Now login!`);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let data = {
      username: props.loginName,
      password: props.loginPassword,
    };
    let r = await fetch(`${API_HOST}/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    if (r.status === 404) {
      alert(`That user doesn't exist!`);
      return;
    } else if (r.status === 401) {
      alert("Wrong password!");
      return;
    } else if (r.status !== 200) {
      alert("An error occurred!");
      return;
    }
    let fetchedData = await r.json();
    let { accessToken, is_admin, username } = fetchedData;
    props.dispatch(updateSession(accessToken, is_admin, username));
    alert("Succesfully logged in!");
    window.location.href = "/my-profile";
  };

  return (
    <div className="onboarding-outer">
      <div className="onboarding-wrapper">
        <div className="onboarding-tabs">
          <button className={`onboarding-tab-button onboarding-tab ${activeForm === "register" ? "active" : ""}`} onClick={() => handleTabClick("register")}>
            Register
          </button>
          <button className={`onboarding-tab-button onboarding-tab ${activeForm === "login" ? "active" : ""}`} onClick={() => handleTabClick("login")}>
            Login
          </button>
        </div>
        <div className="onboarding-container" id="register-form" style={{ display: activeForm === "register" ? "block" : "none" }}>
          <form>
            <h1 className="onboarding-heading">Register</h1>
            <input className="onboarding-input" type="text" placeholder="Name" required onChange={(e) => props.dispatch(updateRegisterName(e.target.value))} />
            <input
              className="onboarding-input"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => props.dispatch(updateRegisterPassword(e.target.value))}
            />
            <button onClick={(e) => handleRegister(e)}>Register</button>
          </form>
        </div>
        <div className="onboarding-container" id="login-form" style={{ display: activeForm === "login" ? "block" : "none" }}>
          <form>
            <h1 className="onboarding-heading">Login</h1>
            <input className="onboarding-input" type="text" placeholder="Name" required onChange={(e) => props.dispatch(updateLoginName(e.target.value))} />
            <input
              className="onboarding-input"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => props.dispatch(updateLoginPassword(e.target.value))}
            />
            <button onClick={(e) => handleLogin(e)}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

let mapStateToProps = (state) => ({
  registerName: state.handleRegister.name,
  registerPassword: state.handleRegister.password,
  loginName: state.handleLogin.name,
  loginPassword: state.handleLogin.password,
});

export default connect(mapStateToProps)(OnboardingComponent);
