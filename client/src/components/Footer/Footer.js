import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";


// Depending on the current path, this component sets the "active" classNameName on the appropriate navigation link item
const Footer = props =>
<nav className="navbar navbar-expand navbar-dark footer">
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
  <ul className="navbar-nav">
    <li className="nav-item active">
      <a className="nav-link" href="#">B-Tween The Lines.com<span className="sr-only">(current)</span></a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="https://github.com/kantradiction/BetweenTheLines">GitHub</a>
    </li>
    <li className="nav-item">
      <a className="nav-link disabled" href="#">University of Arizona Coding Bootcamp</a>
    </li>
  </ul>
</div>
</nav>;

export default Footer;