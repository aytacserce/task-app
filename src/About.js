import React, { Component } from "react";
import "./About.css";

class About extends Component {
  render() {
    return (
      <div className="about-page">
        <h1>About Note-It App</h1>
        <h2>Welcome to Note-It practice app.</h2>
        <h2>User Guide</h2>
        <p className="about-paragraph">
          This is a note-taking application developed for education purposes.
          You can sign-up and create an account. You can sign-in and take notes.
          You can remove your notes. Notes have title, due date, priority level
          and location features. It was designed from a casual point-of-view and
          the general idea was to make it fun to take notes. Feel free to check
          out this basic app and enjoy.
        </p>
        <p></p>
        <h2>Developer Guide</h2>
        <p className="about-paragraph">
          This practice application was built to practice frontend development
          using ReactJS. I have practiced lost of props and state management,
          Routing, Authentication, database manipulation with Rest API, a couple
          of third party libraries like Ionics and Leaflet. Core features: User
          profiles as regular and admin where admin account can also control the
          other users' notes established with server-side authentication, taking
          notes with lots of options and keeping them in a database, getting
          your notes, remove the ones you completed etc. Admin account also has
          information about the volume, user and note counts, completion rate
          and priority rate.
        </p>
      </div>
    );
  }
}

export default About;
