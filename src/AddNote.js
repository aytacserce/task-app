import React from "react";

import "./AddNote.css";

import { useState } from "react";

import Position from "./Position";

const AddNote = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredPriority, setEnteredPriority] = useState("");
  const [enteredDueDate, setEnteredDueDate] = useState("");
  const [enteredPosition, setEnteredPosition] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const priorityChangeHandler = (event) => {
    setEnteredPriority(event.target.value);
  };

  const dueDateChangeHandler = (event) => {
    setEnteredDueDate(event.target.value);
  };

  let coords = [];

  const positionChangeHandler = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        coords.push(latitude);
        coords.push(longitude);
        setEnteredPosition(coords);
        console.log(coords);
      },
      function () {
        alert("Can't get your position!");
      }
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const noteData = {
      title: enteredTitle,
      description: enteredDescription,
      priority: enteredPriority,
      dueDate: enteredDueDate,
      position: enteredPosition,
      status: "active",
    };

    console.log(noteData);

    async function fetchUsers() {
      const response = await fetch(
        "https://users-34f04-default-rtdb.firebaseio.com/users.json"
      );
      const users = await response.json();

      const usersArray = Object.entries(users);
      console.log(usersArray);

      let activeUserID = "";

      for (let u of usersArray) {
        if (u[1].status.includes("active")) {
          activeUserID = u[0];
          console.log(activeUserID);
        }
      }

      fetch(
        "https://users-34f04-default-rtdb.firebaseio.com/users/" +
          activeUserID +
          ".json",
        {
          method: "POST",
          body: JSON.stringify(noteData),
          headers: { "Content-Type": "application/json" },
        }
      ).then((response) => response.json());

      setTimeout(() => {
        props.onNoteAdded();
      }, 500);
    }

    fetchUsers();

    setEnteredTitle("");
    setEnteredDescription("");
    setEnteredPriority("");
    setEnteredDueDate("");
    setEnteredPosition("");
  };

  return (
    <div className="backdrop">
      <div className="addnote-container">
        <h3 className="form-header">Add a New Note</h3>
        <form className="addnote-form" onSubmit={submitHandler}>
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
          <label>Description</label>
          <input
            type="text"
            value={enteredDescription}
            onChange={descriptionChangeHandler}
          />
          <label>Priority</label>
          <select value={enteredPriority} onChange={priorityChangeHandler}>
            <option value="Choose Priority">Choose Priority</option>
            <option value="Important">Important</option>
            <option value="Usual">Usual</option>
          </select>
          <label>Due Date</label>
          <input
            type="date"
            value={enteredDueDate}
            onChange={dueDateChangeHandler}
          />
          <label>Location</label>
          <button
            type="button"
            className="addlocation-button"
            onClick={positionChangeHandler}
            style={
              enteredPosition != ""
                ? { backgroundColor: "green" }
                : { backgroundColor: "white" }
            }
          >
            {enteredPosition === "" ? "Add Location" : "Your Location Added"}
          </button>

          <div>
            <button className="addnote-button" type="submit">
              Add Note
            </button>
            <button
              className="addnote-button"
              type="button"
              onClick={props.onNoteCanceled}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
