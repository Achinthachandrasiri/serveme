import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CreateGigButton({ profileId }) {
    const [gigs, setGigs] = useState([]);
    const [gigCount, setGigCount] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profileId) {
            axios.get(`http://localhost:10200/gigs/allgig/${profileId}`)
                .then(response => {
                    console.log("Response Data:", response.data);
                    setGigs(response.data);
                    setGigCount(response.data.length);
                    setError(null);
                })
                .catch(error => {
                    console.error("Error fetching gigs:", error);
                    setError("Error fetching data");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [profileId]);

    if (loading) {
        return <div></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const buttonDisplay = gigCount === 3 ? 'none' : 'block';

    return (
        <div className="collapse navbar-collapse" id="navbarNav" style={{ display: "block" }}>
            <ul className="navbar-nav">
                <li className="nav-item" style={{ listStyle: "none" }}>
                    <Link 
                        to={`/creategig/${profileId}`} 
                        id="BtngigCreate" 
                        className="nav-link btn btn-primary" 
                        style={{ 
                            backgroundColor: "#67ba6a",
                            fontWeight: "bold", 
                            display: buttonDisplay, 
                            border: "#67ba6a", 
                            outline: "none", 
                            color:"white",
                            padding:"6px 13px 6px 13px ",
                            position: "absolute",
                            right: "135px",
                            top: "14px",
                            width: "120px"
                        }}
                        type="submit"
                    >
                        Create Gig
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default CreateGigButton;
