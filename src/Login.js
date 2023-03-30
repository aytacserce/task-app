import { React, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Bar from "./Bar";

import "./Login.css";

const Login = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [dbData, setdbData] = useState([]);

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  async function submitHandler(event) {
    event.preventDefault();

    const userData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    const response = await fetch(
      "https://users-34f04-default-rtdb.firebaseio.com/users.json"
    );
    const data = await response.json();
    setdbData(data);

    const receivedData = await data;

    const AuthCheck = () => {
      // console.log(userData);
      // console.log(receivedData);

      const usersArray = Object.entries(receivedData);
      for (let u of usersArray) {
        let id = u[0];
        let status = u[1].status;

        if (status === "regular-active") {
          fetch(
            "https://users-34f04-default-rtdb.firebaseio.com/users/" +
              id +
              "/status.json",
            {
              method: "PUT",
              body: JSON.stringify("regular"),
              headers: { "Content-Type": "application/json" },
            }
          ).then((response) => response.json());
        } else if (status === "admin-active") {
          fetch(
            "https://users-34f04-default-rtdb.firebaseio.com/users/" +
              id +
              "/status.json",
            {
              method: "PUT",
              body: JSON.stringify("admin"),
              headers: { "Content-Type": "application/json" },
            }
          ).then((response) => response.json());
        }

        // console.log(u[1]);
        if (
          userData.username === u[1].username &&
          userData.password === u[1].password
        ) {
          // console.log(u[0]);

          console.log(id, status);

          if (status === "regular") {
            fetch(
              "https://users-34f04-default-rtdb.firebaseio.com/users/" +
                id +
                "/status.json",
              {
                method: "PUT",
                body: JSON.stringify("regular-active"),
                headers: { "Content-Type": "application/json" },
              }
            ).then((response) => response.json());
          } else if (status === "admin") {
            fetch(
              "https://users-34f04-default-rtdb.firebaseio.com/users/" +
                id +
                "/status.json",
              {
                method: "PUT",
                body: JSON.stringify("admin-active"),
                headers: { "Content-Type": "application/json" },
              }
            ).then((response) => response.json());
          }
          setTimeout(() => {
            console.log(id, status);
            if (status.includes("regular")) {
              navigate("/notes");
            } else if (status.includes("admin")) {
              navigate("/admin");
            }
          }, 1000);
        }
      }
    };

    AuthCheck();

    setEnteredUsername("");
    setEnteredPassword("");
    setdbData("");
  }

  const navigate = useNavigate();

  return (
    <div>
      <Bar />
      <div className="login-container">
        <div className="left-arrow">
          <p className="login-header">Sign-In</p>
          <p className="login-signup">or if you are new here?</p>
          <button>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Sign-Up
            </Link>
          </button>
        </div>
        <div className="right-arrow">
          <form className="login-form" onSubmit={submitHandler}>
            <label>User Name</label>
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
            <button type="submit">Let Me In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
