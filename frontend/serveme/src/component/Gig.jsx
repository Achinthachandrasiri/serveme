import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Review from "./Review";
import GigStyle from '../css/Gig.css'

function Gig({ profileId }) {
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
        <div className="mainGigDiv container mt-3">
            <div className="gig-list">
                {gigs.map((gig, index) => (
                    <div key={index} className="gig-card">
                        <div className="gigMain">
                            <div >
                                <img className="gigImage" src={`http://localhost:10200/${gig.file}`} alt="gigImage" />
                            </div>
                            <div style={{ marginTop: "15px" }}>
                                <h5 className="gig-Title">
                                    <Link className="gig-link" to={`/workers/viewgig/${gig._id}`}>{gig.title}</Link></h5>
                                <p className="gigCat">{gig.category} <b>for , </b> {gig.subcategory}</p>
                                <p className="priceTag"><b>Price : {gig.price}</b></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gig
