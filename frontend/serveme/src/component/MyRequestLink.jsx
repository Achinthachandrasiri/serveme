import React,{useState, useEffect}from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Notify from "../Img/notification.png"
import linkStyle from "../css/LinkStyle.css"
function MyRequestLink({profileId}){
    return(
        <div className="collapse navbar-collapse linkMainDiv" style={{display:"block"}} id="navbarNav">
             <ul navbar-nav>
                <li className="nav-item" style={{listStyle:"none"}}>
                    <Link to={`/newRequest/${profileId}`} className="nav-link"><img className="linkImg" src={Notify} alt="notification"/>Check My Request</Link>
                </li>
            </ul>
        </div>
    )
}
export default MyRequestLink;