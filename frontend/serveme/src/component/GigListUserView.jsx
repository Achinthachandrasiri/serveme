import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function GigListUserView({profileId}) {
    const [gigs, setGigs] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        function getGig() {
            if (profileId) {
                axios.get(`http://localhost:10200/gigs/allgig/${profileId}`)
                .then(response => {
                    setError(null);
                    console.log("Response Data:", response.data);
                    setGigs(response.data);
                })
                .catch(error => {
                    console.error("Error fetching gigs:", error);
                    setError("Error fetching data");
                });
            }
        }
        getGig();
    }, [profileId]);
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ backgroundColor: "#fff", width: "34%", marginLeft:"2px",minHeight: "min-content", padding:"10px 10px 0px 10px", position:"absolute", left:"33%", top:"67px"}}>
            <div className="gig-list" style={{flexWrap: "wrap",gap: "13px",justifyContent: "flexStart" , marginTop:"3px"}}>
                {gigs.map((gig, index) => (
                <div key={index} className="gig-card" style={{marginBottom:"20px", height:"192px",backgroundColor:"#f8f9fa", border: '0px solid #e0e0e0',borderRadius: '4px',padding: '00px',width: 'calc(100% - 5px)',boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',transition: 'transform 0.3s ease-in-out',boxSizing: 'border-box',
                }}>
                <div style={{display:"flex"}}>
                    <div >
                        <img style={{width:"230px", height:"192px",paddingRight:"20px",borderRadius:"4px 0px 0px 4px"}} src={`http://localhost:10200/${gig.file}`} alt="gigImage" />
                    </div>
                    <div style={{marginTop:"15px"}}>
                        <h5><Link style={{textDecoration:"none",marginBottom:"20px", color:"black"}} to={`/workers/viewgigAsUser/${gig._id}`}>{gig.title}</Link></h5>
                        <p style={{marginBottom:"20px",}}>{gig.category} <b>for , </b> {gig.subcategory}</p>
                        <p style={{color:"#67ba6a", marginBottom:"20px",}}><b>Price : {gig.price}</b></p>
                    </div>
                </div>
            </div>
        ))}
        </div>
</div>
    )
}

export default GigListUserView;
