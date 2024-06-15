import React, { useState, useEffect } from "react";
import Call from "../Img/call.png";
import Mail from "../Img/email (1).png";
import Loca from "../Img/location (1).png";
import Draw from "../Img/draw.png";
import Age from "../Img/cake.png";
import Menu from "../Img/menu.png";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Gig from "./Gig";
import { useParams } from "react-router-dom";
import ViewRequest from "./ViewRequest";
import Review from "./Review";
import ProfileStyle from "../css/Profile.css";
import AxiosInstance from './AxiosInstance'
import CreateGigButton from "./CreateGigButton";
import MyRequestLink from "./MyRequestLink";

function Profile() {
    //Getting profile data
    const { id } = useParams()
    const [profiles, setProfiles] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isBusy, setIsBusy] = useState(localStorage.getItem("isBusy") === "true");
    const navigate = useNavigate();
    const toggleBusyStatus = () => {
        const newStatus = !isBusy;
        setIsBusy(newStatus);
        localStorage.setItem("isBusy", newStatus.toString());
    }
    const [showGig, setShowGig] = useState(false);

    const handleClick = () => {
        setShowGig(!showGig);
    };

    useEffect(() => {
        async function getProfile() {
            try {
                const response = await AxiosInstance.get("/profile");
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

    //Delete account
    const handleDelete = (id) => {
        axios.delete("http://localhost:10200/workers/deleteAccount/" + id)
            .then(response => {
                console.log(response.data);
                alert('deleted')
                navigate('/');
            })
            .catch(() => {
                alert('Cant delete')
            })
    }
    //Delet button
    const toggleButton = () => {
        const button = document.getElementById('menu');
        if (button.style.display === 'none' || button.style.display === '') {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    }
    return (
        <div style={{ minHeight: "100vh" }}>
            <Gig profileId={profiles._id} />
            <CreateGigButton profileId={profiles._id} />
            <MyRequestLink profileId={profiles._id} />
            <div className="mainDiv" >
                <div className="subDiv">
                    <div className="togBtnDiv">
                        <button className="togBtn" onClick={toggleButton}> <img style={{ width: "30px", height: "30px", padding: "2px" }} src={Menu} alt="profile" /> </button>
                        <p style={{ color: isOnline ? '#67ba6a' : 'gray' }} className="onOff">{isOnline ? '+Online' : '-Offline'}</p>
                    </div>
                    <div className="deletBtnDiv">
                        <form>
                            <button id="menu" className="menuBtn"
                                onClick={(e) => handleDelete(profiles._id)}
                            >Deactivate Account</button>
                        </form>
                    </div>

                    {profiles && (
                        <div className="profilePicDiv">
                            <img className="profilePic" src={`http://localhost:10200/${profiles.file}`} alt="Profile" />
                        </div>
                    )}

                    <div style={{ justifyContent: "center", }}>
                        <p style={{ textAlign: "center", alignItems: "center" }}>{profiles.brandname}</p>
                    </div>

                    <div className="detailsSec">
                        <div className="nameSec">
                            <h3>{profiles.firstname + ' ' + profiles.lastname}</h3>
                            <Link to={`/workers/editprofile/${profiles._id}`} className="nav-link editBtn" ><img style={{ width: "17px", height: "17px", margin: "2px" }} src={Draw} alt="edit profile" />Edit Profile</Link>
                        </div><hr />
                    </div>
                    <div className="gigBtn">
                        <button className="gigBtn" onClick={handleClick}>
                            <Link className="nav-link" to={'/reviewsFromMoile/'}>View Reviews</Link>
                        </button>
                    </div>
                    {/* Toggle button */}
                    <div className="mb-3 container togBtnforStatus">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={isBusy} onChange={toggleBusyStatus} />
                        </div>
                        <label style={{ color: !isBusy ? '#67ba6a' : '#f64e4e' }} className="form-label">{isBusy ? "I'm Bussy" : "Open for work "}</label>
                    </div>

                    <div className="specialdetailsSect">
                        <p className="mainInfo"><img className="mainInfoIcon" src={Age} alt="Age" /><b>Age </b>{profiles.age}</p>
                        <p className="mainInfo"><img className="mainInfoIcon" src={Mail} alt="Email" /><b>Email  </b>  {profiles.email}</p>
                        <p className="mainInfo"><img className="mainInfoIcon" src={Call} alt="call" /><b>Mobile </b>  {profiles.mobile}</p>
                        <p className="mainInfo"><img className="mainInfoIcon" src={Loca} alt="location" /><b>Loacation </b>  {profiles.location}</p>
                    </div>
                    <div className="detailsSec">
                        <h4>Description</h4>
                        <p className="mainInfo">{profiles.description}
                        </p>
                    </div><hr style={{ width: "100%" }} />

                    <div className="detailsSec">
                        <h4>Loacation</h4>
                        <p>{profiles.location}</p>
                    </div><hr />

                    <div className="detailsSec">
                        <h4>Language</h4>
                        <p>{profiles.language}</p>
                    </div><hr />

                    <div className="detailsSec">
                        <h4>Skills</h4>
                        <p>{profiles.skills}</p>
                    </div><hr />

                    <div className="detailsSec">
                        <h4>Contact</h4>
                        <p>{profiles.mobile}</p>
                    </div><hr />
                </div>
            </div>
        </div>
    )
}
export default Profile;