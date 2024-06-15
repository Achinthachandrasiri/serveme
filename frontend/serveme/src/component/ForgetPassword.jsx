import React, { useState } from "react";
import axios from "axios";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await axios.post("/", { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="card text-center container mt-3" style={{ width: "40%", left: "30%", top: "10%", backgroundColor: "#f8f9fa", position: "absolute", marginTop: "100px" }}>
            <div className="h5 mt-2" style={{ color: "#67ba6a" }}>Password Reset</div>
            <div className="card-body px-5">
                <p className="card-text py-2">
                    Enter your email address and we'll send you an email with instructions to reset your password.
                </p>
                <div className="form-outline">
                    <label className="form-label" htmlFor="typeEmail">Email input</label>
                    <input type="email" id="typeEmail" className="form-control my-3" placeholder="Enter the email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button className="btn btn-primary w-100" style={{ background: "#67ba6a", border: "none", fontWeight: "bold" }} onClick={handleSubmit}>Reset password</button>
                <div className="mt-3">{message}</div>
            </div>
        </div>
    );
}

export default ForgetPassword;
