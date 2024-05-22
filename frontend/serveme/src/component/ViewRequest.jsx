import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewRequest({ profileId }) {
    // Getting profile data
    const [profiles, setProfile] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getReq() {
            if (profileId) {
                try {
                    const response = await axios.get(`http://localhost:10200/projects/request/${profileId}`);
                    if (Array.isArray(response.data) && response.data.length > 0) {
                        setProfile(response.data);
                    } else {
                        console.log("Empty or non-array response received.");
                    }
                } catch (error) {
                    alert('Error fetching project');
                }
            }
        }
        getReq();
    }, [profileId]);

    return (
        <div style={{width: "33%", minHeight: "100vh",borderLeft:"solid 0.5px lightGray", padding:"0px 14px 14px",paddingTop:"15px", position:"absolute", right:"0",top:"66px"}}>
            <div style={{backgroundColor:"#fff"}} >
                {profiles.map((profile, index) => (
                    <div key={index} className="gig-card" style={{ padding:"25px",backgroundColor:"#f8f9fa",  minHeight: "min-content",  border: '0px solid #e0e0e0', borderRadius: '4px', padding: '00px', width: 'calc(100% - 5px)', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out', boxSizing: 'border-box', }}>
                        <div style={{ display: "flex",padding:"15px", marginBottom:"20px"}}>
                            <div style={{ marginTop: "5px",width:"100%" }}>
                                <p style={{ marginBottom: "5px" }}><b>Location  :</b> {profile.location}</p>
                                <p style={{ marginBottom: "5px" }}><b>Task  :</b> {profile.task}</p>
                                <p style={{ marginBottom: "5px" }}><b>Start Date:</b> {profile.startDate}</p>
                                <p style={{ marginBottom: "5px" }}><b>Time  :</b> {profile.time}</p>
                                <p style={{ marginBottom: "5px" }}><b>Budget  :</b> {profile.budget}</p>
                                <p style={{ marginBottom: "5px" }}><b>Contact  :</b> {profile.contact}</p>
                                <div style={{ marginTop: "10px" }}>
                                    <button style={{ backgroundColor: "#67ba6a", border: "#67ba6a", outline: "none", width: "100%", textAlign: "center", padding: "10px", fontWeight: "bold", borderRadius: "4px", color: "white" }} ><b>Accept Request</b></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ViewRequest;
