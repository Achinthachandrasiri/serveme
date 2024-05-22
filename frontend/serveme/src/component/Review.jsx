import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Reviewicon from "../Img/rating.png";
import Close from "../Img/cancel.png";
import PropTypes from 'prop-types';

function Review({ profileId }) {
    const [review, setReview] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    console.log("menna id eka "+profileId)

    // Toggle showPopup state
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const sendData = async (e) => {
        e.preventDefault();
        if (review === "") {
            alert("Empty");
        } else {
            if (profileId) {
                const newReview = {
                    profileId,
                    review
                };
                await axios.post("http://localhost:10200/reviews/add", newReview)
                    .then(() => {
                        navigate('/profile');
                        alert("Review is added");
                        setReview("");
                    })
                    .catch((err) => {
                        alert("Adding failed");
                        console.log(err);
                    });
            } else {
                alert("Profile ID is missing");
            }
        }
    };

    return (
        <div style={{ width: "33%", minHeight: "100vh", borderLeft: "solid 0.5px lightGray", paddingLeft: "2px", paddingTop: "6px", position: "absolute", right: "0", top: "66px" }}>
            <div style={{ backgroundColor: "#fff" }}>
                <div style={{ width: "100%", minHeight: "min-content",}}>
                    <h5 style={{ backgroundColor: "#f8f9fa", margin: "8px", padding: "15px", borderRadius: "10px" }}>Reviews<img style={{ width: "130px", height: "35px", marginRight: "5px" }} src={Reviewicon} alt="review section" /></h5>
                </div>
                <div style={{ width: "100%", minHeight: "min-content", borderRadius: "10px", marginBottom: "15px" }}>
                    <p style={{ backgroundColor: "#f8f9fa", margin: "8px", padding: "15px", borderRadius: "12px" }}>"I recently hired John's Electrical Services to fix some wiring issues in my home, and I couldn't be happier with the results. John was prompt, professional, and got the job done quickly. My lights are working perfectly now! Highly recommend."</p>
                </div>
                <div style={{ width: "100%", minHeight: "min-content", borderRadius: "10px", marginBottom: "15px" }}>
                    <p style={{ backgroundColor: "#f8f9fa", margin: "10px", padding: "15px", borderRadius: "12px" }}>"Incredibly knowledgeable and courteous. The electrician diagnosed the problem quickly and rewired my entire house efficiently and safely. I feel much safer now knowing the work was done by professionals. Thank you, Sparky Solutions!"</p>
                </div>
                <div style={{ width: "100%", minHeight: "min-content", borderRadius: "10px", marginBottom: "15px" }}>
                    <p style={{ backgroundColor: "#f8f9fa", margin: "10px", padding: "15px", borderRadius: "12px" }}>"in the hour, diagnosed the problem quickly, and had it fixed in no time. Their prices were reasonable, and the service was top-notch. I'll definitely be using them again."</p>
                </div>
                <div style={{ width: "100%", minHeight: "min-content", borderRadius: "10px", marginBottom: "15px" }}>
                    <p style={{ backgroundColor: "#f8f9fa", margin: "10px", padding: "15px", borderRadius: "12px" }}>"rived at my door within the hour, diagnosed the problem quickly, and had it fixed in no time. Their prices were reasonable, and the service was top-notch. I'll definitely be using them again."</p>
                </div>
                <div>
                    <button onClick={() => setShowPopup(true)} style={{ backgroundColor: "#67ba6a", fontWeight: "bold", border: "#67ba6a", outline: "none", width: "96%", marginLeft: "11px", marginTop: "4px", textAlign: "center",position:"sticky", bottom:"10%", padding: "10px", borderRadius: "4px", color: "white" }}>Add Review</button>
                    {showPopup && (
                        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 }}>
                            <form style={{ position: "absolute", top: "50%", left: "50%", width: "40%", transform: "translate(-50%, -50%)", backgroundColor: "#fff", padding: "20px", borderRadius: "4px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }} onSubmit={sendData} encType="multipart/form-data">
                                <h1 style={{textAlign:"center"}}>Add your feedback</h1>
                                <div style={{ minHeight: "min-content", borderRadius: "10px", marginBottom: "15px", padding: "10px" }}>
                                    <textarea style={{ width: "96%", marginLeft: "11px", padding: "15px", borderRadius: "12px" }} className="form-control" value={review} id="exampleFormControlTextarea1" placeholder="Write a comment..."
                                        onChange={(e) => {
                                            setReview(e.target.value);
                                        }}
                                    ></textarea>
                                </div>
                                <div style={{ minHeight: "min-content", borderRadius: "10px", marginBottom: "15px", padding: "10px" }}>
                                    <button style={{ backgroundColor: "#67ba6a", fontWeight: "bold", border: "#67ba6a", outline: "none", width: "96%", marginLeft: "11px", marginTop: "10px", textAlign: "center", padding: "10px", borderRadius: "4px", color: "white" }}>Publish</button>
                                </div>
                            </form>
                            <button onClick={() => setShowPopup(false)} style={{ position: "absolute", top: "24%", left: "1054px", background: "none", border: "#67ba6a", outline: "none" }}><img style={{ width: "32px", height: "32px" }} src={Close} alt="close" /></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Review;
