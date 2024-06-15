import React,{useState, useEffect} from "react";
import Call from "../Img/call.png";
import Mail from "../Img/email (1).png";
import Loca from "../Img/location (1).png";
import Age from "../Img/cake.png";
import axios from "axios";
import { Link , useNavigate} from 'react-router-dom';
import Gig from "./Gig";
import {useParams} from "react-router-dom";
import Review from "./Review";
import UserProfile from "../css/UserProfile.css";
import AxiosInstance from './AxiosInstance'
import CreateGigButton from "./CreateGigButton";
import GigListUserView from "./GigListUserView";

function ProfileUserView(){
    //Getting profile data
    const {id} =useParams() 
    const [profiles, setProfiles] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isBusy, setIsBusy] = useState(localStorage.getItem("isBusy") === "true");
    const toggleBusyStatus = () => {
        const newStatus = !isBusy;
        setIsBusy(newStatus);
        localStorage.setItem("isBusy", newStatus.toString());
    }
    useEffect(() => {
        async function getProfile() {
            try {
                const response = await axios.get(`http://localhost:10200/workers/checkprofile/${id}`)
                setProfiles(response.data);
            } catch (error) {
                alert('Error fetching profile');
            }
        }
        getProfile();
    }, []);
    
    //online offline checkin
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
    
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
        };
      }, []);

    return(
    <div style={{minHeight: "100vh" }}>
        
        <CreateGigButton profileId={profiles._id}/>
        <GigListUserView  profileId={profiles._id}/>

        <div className="mainDiv">
        <div className="subDiv">
                <p style={{color: isOnline ? '#67ba6a' : 'gray' }} className="onoff">{isOnline ? '+Online' : '-Offline'}</p>
            </div>
            {profiles && (
                <div className="profilePicDiv">
                    <img className="profilePic" src={`http://localhost:10200/${profiles.file}`} alt="Profile" />
                </div>
            )}

            <div style={{justifyContent: "center",}}>
                <p style={{textAlign:"center",alignItems: "center"}}>{profiles.brandname}</p>
            </div>

            <div className="detailsSec">
                <div className="nameSec">
                    <div>
                        <h3>{profiles.firstname +' '+profiles.lastname}</h3>
                    </div>
                    {/* Toggle button */}
                    <div>
                        <label style={{color: !isBusy ? '#67ba6a' : '#f64e4e' }} className="form-label status">{isBusy ? "I'm Bussy" : "Open for work "}</label>
                    </div>
                </div><hr/>
                <div className="specialdetailsSec">
                    <p className="mainInfo"><img className="mainInfoIcon" src={Age} alt="Age"/><b>Age </b>{profiles.age}</p>
                    <p className="mainInfo"><img className="mainInfoIcon" src={Mail} alt="Email"/><b>Email  </b>  {profiles.email}</p>
                    <p className="mainInfo"><img className="mainInfoIcon" src={Call} alt="call"/><b>Mobile </b>  {profiles.mobile}</p>
                    <p className="mainInfo"><img className="mainInfoIcon" src={Loca} alt="location"/><b>Loacation </b>  {profiles.location}</p>
                </div>
            </div>

            <div className="detailsSec">
                <h4>Description</h4>
                <p className="mainInfo">{profiles.description}
               </p>
            </div><hr/>

            <div className="detailsSec">
                <h4>Loacation</h4>
                <p>{profiles.location}</p>
            </div><hr/>

            <div className="detailsSec">
                <h4>Language</h4>
                <p>{profiles.language}</p>       
            </div><hr/>

            <div className="detailsSec">
                <h4>Skills</h4>
                <p>{profiles.skills}</p>
            </div><hr/>

            <div className="detailsSec">
                <h4>Contact</h4>
                <p>{profiles.mobile}</p>
            </div><hr/>
        </div>
    </div> 
    )
} 
export default ProfileUserView;