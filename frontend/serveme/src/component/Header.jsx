import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Img/bb.png";
import Notify from "../Img/notification.png";
function Header({ profileId }) {
  return (
    <div className="app" >
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="nav-link" href=""><img src={Logo} alt="logo" style={{ width: "50px", height: "50px", alignItems: "center" }} /></a>
          <a className="navbar-brand" href="#" style={{ color: "#67ba6a", fontWeight: "bold" }}>Serve Me</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/home"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/profile"}>Profile</Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Service</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Help</a></li>
              <li className="nav-item">
                <a className="nav-link" href="/"><button style={{ backgroundColor: "#67ba6a", padding: "6px 13px 6px 13px ", fontWeight: "bold", border: "#67ba6a", outline: "none", position: "absolute", right: "20px", top: "14px", width: "100px" }} type="submit" class="btn btn-primary">Login</button></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Header;