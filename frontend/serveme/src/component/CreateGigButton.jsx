import React,{useState, useEffect}from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateGigButton({profileId}){
    return(
        <div>
            <li className="nav-item" style={{listStyle:"none"}}><Link to={`/creategig/${profileId}`} className="nav-link" style={{backgroundColor:"#67ba6a",fontWeight:"bold", border:"#67ba6a", outline:"none", position:"absolute",right:"135px",top:"14px",width:"120px"}}
             type="submit" class="btn btn-primary">Create Gig</Link></li>
        </div>
    )
}
export default CreateGigButton;