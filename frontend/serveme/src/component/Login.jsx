import React, { useState } from "react";
import axios from "axios";
import Img from "../Img/cover.png";
import Googole from "../Img/Google-Icon-PNG.png";
import { createRoot } from 'react-dom';
import { useHistory } from 'react-router-dom';
import {useNavigate, useParams} from "react-router-dom";
import AxiosInstance from "./AxiosInstance";

function Login(){
    const {id} =useParams() 
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
    <div style={{display:"flex", justifyContent:"space-around"}}>
        <div style={{position:"absolute", width:"50%",left:"25%",top:"20%"}}>
            <img style={{width:"50%", height:"80%"}} src={Img} alt="cover"/>
        </div>

        <div class="container" style={{position:"absolute",top:"20%",width:"50%", left:"51%"}}>
            <form onSubmit={sendData}>
                 <div><h1>Login</h1></div>
            <div class="mb-3" style={{width:"50%"}}>
                <label for="exampleInputEmail1" class="form-label">Username</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3" style={{width:"50%"}}>
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"
                 onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                />
            </div>
                <button type="submit" class="btn btn-primary" style={{marginTop:"5px",width:"50%", backgroundColor:"#67ba6a", border:"solid 2px #67ba6a", outline:"none",fontWeight:"bold"}}>Submit</button><br/>
                <button type="submit" class="btn btn-primary" style={{marginTop:"10px",width:"50%", backgroundColor:"#f8f9fa", border:"solid 1px lightgray", outline:"none", color:"gray", fontWeight:"bold"}}><img style={{width:"25px", height:"25px", marginRight:"5px"}} src={Googole} alt="google"/>Login with google</button>
            <div class="mb-3" style={{display:"flex",marginTop:"20px"}}>
                <p><b>If you don't have an Account .</b></p><a href="/register">Create Account</a>
            </div>        
            <div class="mb-3" style={{marginTop:"20px"}}>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
            </form>
        </div>
    </div>
    )
}
export default Login;