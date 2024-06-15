import React, { useState, useEffect } from "react";
import axios from "axios";
import Close from "../Img/cancel.png";
import Draw from "../Img/draw.png";
import Delete from "../Img/delete.png";
import { Link, useNavigate, useParams } from 'react-router-dom';

function ViewGig() {
    const { id } = useParams();
    const [gig, setGig] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //gig data fetching funtion
    useEffect(() => {
        function getGig() {
            axios.get(`http://localhost:10200/gigs/details/${id}`)
                .then(response => {
                    console.log(response.data);
                    setGig(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    alert('Error fetching gig details');
                });
        }
        getGig();
    }, [id]);

    //delete function
    const handleDelete = (id) => {
        axios.delete(`http://localhost:10200/gigs/deleteGig/${id}`)
            .then(response => {
                console.log(response.data);
                alert('Deleted successfully');
                navigate(`/workers/profile/${gig.accId}`);
            })
            .catch(() => {
                alert('Cannot delete');
            });
    };

    const handleAddOrderClick = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    //send order function
    const [location, setLocation] = useState("");
    const [task, setTask] = useState("");
    const [startDate, setStartDate] = useState("");
    const [time, setTime] = useState("");
    const [budget, setBudget] = useState("");
    const [contact, setContact] = useState("");
    const [contactError, setContactError] = useState("");

    const validateContact = (contact) => {
        const regex = /^0\d{9}$/;
        return regex.test(contact);
    };

    const handleContactChange = (e) => {
        const value = e.target.value;
        if (!validateContact(value)) {
            setContactError("Contact number must be exactly 10 digits and start with 0");
        } else {
            setContactError("");
        }
        setContact(value);
    };

    function sendOrder(e) {
        e.preventDefault();
        if (validateContact(contact)) {
            const newProject = {
                accId: gig.accId,
                location,
                task,
                startDate,
                time,
                budget,
                contact
            };
            axios.post("http://localhost:10200/projects/add", newProject)
                .then(() => {
                    navigate(`/workers/viewgig/${id}`);
                    alert("Project is added");
                })
                .catch((err) => {
                    alert("Project adding failed");
                });
        } else {
            alert("Please enter a valid contact number");
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!gig) {
        return <div>Error loading gig details</div>;
    }

    return (
        <div style={{ backgroundColor: "#fff", width: "34%", minHeight: "min-content", padding: "7px 10px 0px 10px", position: "absolute", left: "33%", top: "70px" }}>
            <form>
                <div style={{ backgroundColor: "#f8f9fa", width: "100%", borderRadius: "4px", boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.1)", marginBottom: "10px", padding: "15px" }}>
                    <div style={{ marginTop: "8px", paddingTop: "0px" }}>
                        <h4 style={{ textAlign: "center" }}>{gig.title}</h4>
                        <hr />
                    </div>

                    <div style={{ marginTop: "8px", paddingTop: "15px" }}>
                        <h5>Category</h5>
                        <div style={{ display: "flex" }}>
                            <p>{gig.category} <b>for , </b></p>
                            <p>{gig.subcategory}</p>
                        </div>
                        <hr />
                    </div>

                    <div style={{ marginTop: "8px", paddingTop: "15px" }}>
                        <h5>Description</h5>
                        <p>{gig.description}</p>
                        <hr />
                    </div>

                    <div style={{ marginTop: "8px", paddingTop: "15px" }}>
                        <h5>Price</h5>
                        <h4 style={{ textAlign: "left", color: "#67ba6a" }}>{gig.price}</h4>
                        <hr />
                    </div>

                    <div style={{ marginTop: "8px", paddingTop: "15px" }}>
                        <h5>Project Size</h5>
                        <p>{gig.projectsize}</p>
                        <hr />
                    </div>

                    <div style={{ marginTop: "8px", paddingTop: "15px" }}>
                        <h5>Requirement</h5>
                        <p>{gig.rules}</p>
                        <hr />
                    </div>

                    <div style={{ display: "flex" }}>
                        <div>
                            <Link to={`/EditGig/${gig._id}`} className="nav-link" style={{ border: "none", background: "none", outline: "none", width: "80px", marginBottom:"5px", padding: "5px", borderRadius: "4px" }}>
                                <img style={{ width: "17px", height: "17px", marginRight: "5px" }} src={Draw} alt="edit gig" />Edit
                            </Link>
                        </div>
                        <button onClick={(e) => { e.preventDefault(); handleDelete(gig._id); }} style={{ border: "none", background: "none", outline: "none", width: "80px",marginBottom:"5px",  padding: "5px", borderRadius: "4px" }}>
                            <img style={{ width: "17px", height: "17px", marginRight: "5px" }} src={Delete} alt="delete gig" />Delete
                        </button>
                    </div>

                    <div className="mb-3">
                        <button style={{ backgroundColor: "#67ba6a", marginTop: "13px", border: "#67ba6a", fontWeight: "bold", outline: "none", width: "100%", textAlign: "center", padding: "10px 0px 10px 0px", borderRadius: "4px", color: "white" }} onClick={handleAddOrderClick}>Add an order</button>
                    </div>
                </div>
            </form>

            {/* Popup */}
            {showPopup && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", width: "40%", transform: "translate(-50%, -50%)", backgroundColor: "#fff", padding: "20px", borderRadius: "4px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}>
                        <form onSubmit={sendOrder} encType="multipart/form-data">
                            <div className="mb-3 container">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Location</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Address/City/District/Province"
                                    onChange={(e) => {
                                        setLocation(e.target.value);
                                    }} />
                            </div>
                            <div className="mb-3 container">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Task</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="House Wiring"
                                    onChange={(e) => {
                                        setTask(e.target.value);
                                    }} />
                            </div>
                            <div className="mb-3 container">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Start Date</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Before 12th May in 2024"
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                    }} />
                            </div>
                            <div className="mb-3 container">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Time Duration</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Around 2 weeks"
                                    onChange={(e) => {
                                        setTime(e.target.value);
                                    }} />
                            </div>
                            <div className="mb-3 container">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Budget</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Rs 1500 per point"
                                    onChange={(e) => {
                                        setBudget(e.target.value);
                                    }} />
                            </div>
                            <div className="mb-3 container">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Contact</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="+94 2235 658"
                                    value={contact}
                                    onChange={handleContactChange} />
                                {contactError && <small style={{ color: 'red' }}>{contactError}</small>}
                            </div>
                            <div className="mb-3 container">
                                <button disabled={!!contactError} style={{ backgroundColor: "#67ba6a", border: "#67ba6a", outline: "none", width: "100%", textAlign: "center", padding: "10px", fontWeight: "bold", borderRadius: "4px", color: "white" }}><b>Request For Project</b></button>
                            </div>
                        </form>
                    </div>
                    <button onClick={() => setShowPopup(false)} style={{ position: "absolute", top: "21px", left: "1051px", background: "none", border: "#67ba6a", outline: "none", }}>
                        <img style={{ width: "32px", height: "32px" }} src={Close} alt="close" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default ViewGig;
