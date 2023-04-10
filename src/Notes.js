import { useState, useEffect } from "react";
import AddNote from "./AddNote";

import * as Unicons from "@iconscout/react-unicons";

import "./Notes.css";
import { useNavigate, Link } from "react-router-dom";

const Notes = () => {
  const [activeUserId, setActiveUserId] = useState([]);

  const [notesData, setNotesData] = useState([]);

  const [addNoteClicked, setAddNoteClicked] = useState();

  let activeUser = "";
  let activeNotesArray = [];
  let dateReminder = "";

  async function fetchNotes() {
    const response = await fetch(
      "https://users-34f04-default-rtdb.firebaseio.com/users.json"
    );
    const users = await response.json();

    const usersArray = Object.entries(users);
    console.log(usersArray);

    // let activeUserID = "";

    for (let u of usersArray) {
      if (u[1].status.includes("active")) {
        activeUser = u[0];
        console.log(activeUser);
      }
    }

    let notesArray = [];

    for (let u of usersArray) {
      if (u[0] === activeUser) {
        notesArray = Object.entries(u[1]);
        notesArray.splice(-3, 3);
      }
    }

    console.log(notesArray);

    // let activeNotesArray = [];

    for (let u of notesArray) {
      dateReminder = new Date().getTime() - new Date(u[1].dueDate).getTime();
      // console.log(dateReminder);
      if (u[1].status === "active") {
        activeNotesArray.push(u);
      }
    }

    // console.log(activeNotesArray);

    setNotesData(activeNotesArray);
    setActiveUserId(activeUser);
  }

  // useEffect(() => {
  //   fetchNotes();
  // }, []);

  const addNoteHandler = () => {
    setAddNoteClicked({ addNoteClicked: true });
  };

  const onNoteAddedHandler = () => {
    setAddNoteClicked(false);
    fetchNotes();
  };

  const onNoteCanceledHandler = () => {
    setAddNoteClicked(false);
  };

  const navigate = useNavigate();

  let currentPosition = [];

  const deleteNoteHandler = (e) => {
    const selectedNoteId =
      e.currentTarget.parentElement.parentElement.firstChild.firstChild
        .innerHTML;
    // console.log(notesData);
    for (let u of notesData) {
      // console.log(u[1].status);
      if (u[1].status === "active") {
        const getData = fetch(
          "https://users-34f04-default-rtdb.firebaseio.com/users/" +
            activeUserId +
            "/" +
            selectedNoteId +
            "/status.json",
          {
            method: "PUT",
            body: JSON.stringify(""),
            headers: { "Content-Type": "application/json" },
          }
        ).then((response) => response.json());

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  async function showMapHandler(e) {
    const selectedNoteId =
      e.currentTarget.parentElement.parentElement.firstChild.innerHTML;
    console.log(selectedNoteId);
    const response = await fetch(
      "https://users-34f04-default-rtdb.firebaseio.com/users/" +
        activeUserId +
        "/" +
        selectedNoteId +
        "/position.json"
    );
    const data = await response.json();

    const currentPosition = Object.entries(data);

    console.log(currentPosition);

    if (currentPosition.length > 0) {
      const passedCoords = currentPosition;
      setTimeout(() => {
        navigate("/position", { state: { passedCoords: currentPosition } });
      }, 1000);
    } else {
      setTimeout(() => {
        alert("This note doesn't have position information!");
      }, 1100);
    }
  }

  return (
    <div className="notes-body">
      {addNoteClicked && (
        <AddNote
          onNoteAdded={onNoteAddedHandler}
          onNoteCanceled={onNoteCanceledHandler}
        />
      )}
      <h2>My Notes</h2>
      <div>
        <button onClick={addNoteHandler} className="new-note-button">
          New Note
        </button>
        <Link to="/">
          <button className="logout-button">Sign Out</button>
        </Link>
      </div>
      {notesData.map((note) => (
        <div key={note[0]} className="note-container">
          <div className="note-item">
            <div className="note-prio-title-cont">
              <div id="id" style={{ display: "none" }}>
                {note[0]}
              </div>
              <div className="note-priority">
                {note[1].priority === "Important" ? (
                  <Unicons.UilTriangle size="28" color="red" />
                ) : (
                  <Unicons.UilTriangle size="28" color="green" />
                )}
              </div>
              <div className="note-title">{note[1].title}</div>
            </div>
            <div className="note-date-pos-cont">
              {Number(
                new Date(note[1].dueDate).getTime() - new Date().getTime()
              ) > 86400000 ? (
                <Unicons.UilCalendarAlt
                  className="date-icon"
                  size="28"
                  color="green"
                />
              ) : (
                <Unicons.UilCalendarAlt
                  className="date-icon"
                  size="28"
                  color="orangered"
                />
              )}
              <div className="note-date">{note[1].dueDate}</div>
              <div className="note-location">
                <button className="location-button" onClick={showMapHandler}>
                  <Unicons.UilMapMarker size="28" color="green" />
                </button>
              </div>
            </div>
          </div>
          <div className="note-description-container">
            <div className="note-description">{note[1].description}</div>
          </div>
          <div>
            <button className="done-button" onClick={deleteNoteHandler}>
              Done
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notes;
