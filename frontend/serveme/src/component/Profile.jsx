import React,{useState, useEffect} from "react";
import Call from "../Img/phone.png";
import Mail from "../Img/email.png";
import Loca from "../Img/location.png";
import Draw from "../Img/draw.png";
import Age from "../Img/date-of-birth.png";
import Menu from "../Img/menu.png";
import axios from "axios";
import { Link , useNavigate} from 'react-router-dom';
import Gig from "./Gig";
import {useParams} from "react-router-dom";
import ViewRequest from "./ViewRequest";
import Review from "./Review";
import AxiosInstance from './AxiosInstance'
import CreateGigButton from "./CreateGigButton";

function Profile(){
    //Getting profile data
    const {id} =useParams() 
    const [profiles, setProfiles] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isBusy, setIsBusy] = useState(localStorage.getItem("isBusy") === "true");
    const navigate= useNavigate();
    const toggleBusyStatus = () => {
        const newStatus = !isBusy;
        setIsBusy(newStatus);
        localStorage.setItem("isBusy", newStatus.toString());
    }
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
    const handleDelete = (id) =>{
        axios.delete("http://localhost:10200/workers/deleteAccount/" + id)
        .then(response => {         
            console.log(response.data);
            alert('deleted')
            navigate('/');
        })
        .catch(()=>{
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
    return(
    <div style={{minHeight: "100vh" }}>
        <ViewRequest profileId ={profiles._id}/>
        <Gig profileId={profiles._id} />
        <Review profileId={profiles._id} />
        <CreateGigButton profileId={profiles._id}/>
        <ViewRequest profileId={profiles._id}/>

        <div style={{minHeight: "100vh",overflowY: "auto",borderRight:"solid 0.5px lightGray", backgroundColor: "#f8f9fa", width: "33%", padding:"10px", paddingTop:"2px"}}>
            <div style={{position:"relative", top:"10px",display:"flex"}}>
                <button style={{background:"none",border:"none", outline:"none"}} onClick={toggleButton}> <img  style={{width:"30px", height:"30px", padding:"2px"}} src={Menu} alt="profile"/> </button>
                <p style={{position:"absolute", left:"88%",color: isOnline ? '#67ba6a' : 'gray' }}>{isOnline ? '+Online' : '-Offline'}</p>
            </div>
            <div style={{position:"relative", top:"15px", left:"7px"}}>
                <form>
                    <button id="menu" style={{background:"none", position: "absolute",border:"none",display:"none" , outline:"none",boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding:"14px 12px 14px 12px", backgroundColor:"#f64e4e", borderRadius:"4px", color:"white"}}
                     onClick={(e)=> handleDelete(profiles._id)}
                    >Deactivate Account</button>
                </form>
            </div>

            {profiles && (
                <div style={{display:"flex", justifyContent:"center"}}>
                    <img style={{width:"130px", height:"130px" ,borderRadius:"65px", border:"solid 4px lightgray", padding:"2px"}} src={`http://localhost:10200/${profiles.file}`} alt="Profile" />
                </div>
            )}

            <div style={{justifyContent: "center",}}>
                <p style={{textAlign:"center",alignItems: "center"}}>{profiles.brandname}</p>
            </div>

            <div style={{marginTop:"8px",paddingTop:"15px"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <h3>{profiles.firstname +' '+profiles.lastname}</h3> <Link to={ `/workers/editprofile/${profiles._id}`} className="nav-link" style={{border:"solid 1px lightgray",outline:"none", padding:"7px 8px 0px 6px", borderRadius:"4px"}}><img style={{width:"17px",height:"17px", margin:"2px"}} src={Draw} alt="edit profile"/>Edit Profile</Link>
                </div><hr/>
                {/* Toggle button */}
                <div className="mb-3 container" style={{display:"flex"}}>
                    <div className="form-check form-switch">
                        <input style={{position:"absolute",left:"3.4%"}} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={isBusy} onChange={toggleBusyStatus} />
                    </div>
                    <label style={{color: !isBusy ? '#67ba6a' : '#f64e4e' }} className="form-label">{isBusy ? "I'm Bussy" : "Open for work "}</label>
                </div>
                <p style={{textAlign:"left"}}><img style={{width:"17px",height:"17px", marginRight:"5px"}} src={Age} alt="Age"/><b>Age </b>    {profiles.age}</p>
                <p style={{textAlign:"left"}}><img style={{width:"17px",height:"17px", marginRight:"5px"}} src={Mail} alt="Email"/><b>Email  </b>  {profiles.email}</p>
                <p style={{textAlign:"left"}}><img style={{width:"18px",height:"18px",marginRight:"5px"}} src={Call} alt="call"/><b>Mobile </b>  {profiles.mobile}</p>
                <p style={{textAlign:"left"}}><img style={{width:"17px",height:"17px", marginRight:"5px"}} src={Loca} alt="location"/><b>Loacation </b>  {profiles.location}</p>
            </div>

            <div style={{marginTop:"8px",paddingTop:"15px"}}>
                <h4>Description</h4>
                <p style={{textAlign:"left"}}>{profiles.description}
               </p>
            </div><hr/>

            <div style={{marginTop:"8px",paddingTop:"15px"}}>
                <h4>Loacation</h4>
                <p>{profiles.location}</p>
            </div><hr/>

            <div style={{marginTop:"8px",paddingTop:"15px"}}>
                <h4>Language</h4>
                <p>{profiles.language}</p>       
            </div><hr/>

            <div style={{marginTop:"8px",paddingTop:"15px"}}>
                <h4>Skills</h4>
                <p>{profiles.skills}</p>
            </div><hr/>

            <div style={{marginTop:"8px",paddingTop:"15px"}}>
                <h4>Contact</h4>
                <p>{profiles.mobile}</p>
            </div><hr/>
        </div>
    </div> 
    )
} 
export default Profile;