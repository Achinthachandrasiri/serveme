import React, { useState } from "react";
import axios from "axios";
import Img from "../Img/cover.png";
import Googole from "../Img/Google-Icon-PNG.png";
import { createRoot } from 'react-dom';
import { useHistory, Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import AxiosInstance from "./AxiosInstance";
import LoginStyle from "../css/Login.css"

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate= useNavigate();
    async function sendData(e) {
        e.preventDefault();
        try {
            const emp = {
                email: email,
                password: password,
            };
            const response = await   AxiosInstance.post('login', emp)
            .then(result=>{
                console.log(result)
                if(result.data === "success"){
                    sessionStorage.setItem('userId', result.data.userId);
                    navigate("/profile")
                }
                else{
                    setErrorMessage("Invalid email or password.");
                }

            })
        } catch (error) {
            alert("unsuccessful");
            console.log("Error response:", error.response);
            setErrorMessage("An error occurred while logging in.");
        }
    }
    return(
    <div className="loginMainDiv">
        <div className="imgDiv">
            <img className="Img" src={Img} alt="cover"/>
        </div>
        <div class="container contain">
            <form onSubmit={sendData}>
                 <div><h1>Login</h1></div>
            <div class="mb-3 inputDiv">
                <label for="exampleInputEmail1" class="form-label">Username</label>
                <input type="email" class="form-control getText" id="exampleInputEmail1" aria-describedby="emailHelp"
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3 inputDiv">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control getText" id="exampleInputPassword1"
                 onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                />
            </div>
                <button type="submit" className="btn btn-primary btnSubmit">Submit</button><br/>
                <button type="submit" class="btn btn-primary btn-submit-google"><img className="btn-img" src={Googole} alt="google"/>Login with google</button>
            <div class=" mt-2 inputDivLink">
                <p><b>If you don't have an Account .</b></p><a href="/register">Create Account</a>
            </div>
            <div class="mt-2 forget">
                <Link to={'/resetPassword'} className="nav-link">Forget Password</Link>
            </div>         
            <div class="mb-3" style={{marginTop:"20px"}}>
            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
            </div>
            </form>
        </div>
    </div>
    )
}
export default Login;