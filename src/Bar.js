import { Link } from "react-router-dom";

import "./Bar.css";

const Bar = () => {
  return (
    <div className="bar">
      <div>
        <img alt="logo" src={require("./img/logo.png")} />
      </div>
      <div className="about"></div>
      <Link to="/about">
        <p className="about-text">About </p>
      </Link>
      <div className="copyright">
        <p>All Rights Reserved by Aytaç Serçe. &copy; 2023</p>
      </div>
    </div>
  );
};

export default Bar;
