import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import * as Unicons from "@iconscout/react-unicons";

import "./Admin.css";

const AdminNotes = () => {
  const [dbUsers, setdbUsers] = useState([]);

  let usersArray = [];

  async function fetchUsers() {
    const response = await fetch(
      "https://users-34f04-default-rtdb.firebaseio.com/users.json"
    );
    const data = await response.json();

    const receivedData = await data;

    usersArray = Object.entries(receivedData);
    for (let u of usersArray) {
      // console.log(u[1]);
    }
    setdbUsers(usersArray);
  }

  console.log(dbUsers);

  let notesArray = [];

  for (let u of dbUsers) {
    let notes = Object.values(u[1]);
    notes.splice(-3, 3);
    for (let n of notes) {
      notesArray.push(n);
    }
    console.log(notesArray);
  }

  const userNumber = dbUsers.length;
  const volume = notesArray.length;

  let activeNotes = [];
  for (let n of notesArray) {
    if (n.status === "active") {
      activeNotes.push(n);
    }
  }

  const status = ((activeNotes.length / notesArray.length) * 100).toFixed(2);
  console.log(status);

  let usualPriority = [];
  let importantPriority = [];
  for (let n of notesArray) {
    if (n.priority === "Usual") {
      usualPriority.push(n);
    } else if (n.priority === "Important") {
      importantPriority.push(n);
    }
  }
  const priority = usualPriority.length / importantPriority.length;

  const navigate = useNavigate();

  const userNoteHandler = (e) => {
    const selectedUserId =
      e.currentTarget.parentElement.parentElement.firstChild.firstChild
        .innerHTML;
    console.log(selectedUserId);
    setTimeout(() => {
      navigate("/adminnotes", { state: { passedUserId: selectedUserId } });
    }, 500);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-body">
      <h2 style={{ fontSize: "40px" }}>Users</h2>
      <div className="report">
        <div className="volume-container">
          <Unicons.UilUser size="28" color="red" /> <span>{userNumber}</span>{" "}
          Users <Unicons.UilFileAlt size="28" color="orangered" />{" "}
          <span>{volume}</span> Notes
        </div>
        <div className="status-container">
          <Unicons.UilFileCheckAlt size="28" color="orangered" /> Completed
          Notes / <Unicons.UilFileAlt size="28" color="orangered" /> Overall
          Notes : <span>{status}</span>
        </div>
        <div className="priority-container">
          <p>
            Usual Notes / Important Notes : <span>{priority}</span>
          </p>
        </div>
        <Link to="/">
          <button className="logout-button">Sign Out</button>
        </Link>
      </div>
      {dbUsers.map((user) => (
        <div key={user[0]} className="user-container">
          <div className="user-item">
            <div id="id" style={{ display: "none" }}>
              {user[0]}
            </div>
            <div>
              <Unicons.UilUser size="28" color="red" />
            </div>
            <div className="user-username">{user[1].username}</div>
            <Unicons.UilFileAlt
              className="notes-icon"
              size="28"
              color="orangered"
            />
            <div className="total-notes">{Object.keys(user[1]).length - 3}</div>

            {/* <Unicons.UilFileCheckAlt size="28" color="green" />
            <div className="notes-rate">{Object.values(user[1])}</div>
          </div>
          <div className="notes-description-container">
            <div className="notes-description">{user[1].description}</div> */}
          </div>
          <div>
            <button className="notes-button" onClick={userNoteHandler}>
              See Notes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminNotes;
