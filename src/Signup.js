import "./Signup.css";

import { Link } from "react-router-dom";

import { useState } from "react";

const Signup = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const userData = {
      username: enteredUsername,
      password: enteredPassword,
      status: "regular",
    };

    console.log(userData);

    fetch("https://users-34f04-default-rtdb.firebaseio.com/users.json", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());

    setEnteredUsername("");
    setEnteredPassword("");
  };

  return (
    <div className="signup-container">
      <p>
        <span>"</span>When your heart speaks, take good notes. (Judith Exner)
        <span>"</span>
      </p>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <img alt="logo" src={require("./img/logo.png")} />
      </Link>
      <form className="signup-form" onSubmit={submitHandler}>
        <label>Username</label>
        <input
          type="text"
          value={enteredUsername}
          onChange={usernameChangeHandler}
        />
        <label>Password</label>
        <input
          type="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
        />
        <button type="submit">Sign Me Up</button>
      </form>
    </div>
  );
};

export default Signup;
