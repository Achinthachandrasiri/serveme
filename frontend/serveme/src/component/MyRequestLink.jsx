import React,{useState, useEffect}from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Notify from "../Img/notification.png"
function MyRequestLink({profileId}){
    return(
        <div style={{position:"absolute", top:"21px", left:"28%"}}>
             <li className="nav-item" style={{listStyle:"none"}}>
                <Link to={`/newRequest/${profileId}`} className="nav-link"><img style={{width:"17px", height:"17px", marginLeft:"3px" , marginRight:"4px",marginBottom:"3px"}} src={Notify} alt="notification"/>Check My Request</Link>
            </li>
        </div>
    )
}
export default MyRequestLink;