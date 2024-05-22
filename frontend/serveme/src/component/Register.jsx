import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
//gettimg inputs from useState and set to formdata
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    brandname: "",
    email: "",
    password: "",
    age: "",
    description: "",
    location: "",
    language: [],
    mobile: "",
    skills: "",
    file: null,
  });
const navigate = useNavigate();

//handle text input
const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
//handle language box
const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

setFormData((prevFormData) => {
  if (isChecked) {
      return { ...prevFormData, language: [...prevFormData.language, value] };
  } else {
      return { ...prevFormData, language: prevFormData.language.filter((lang) => lang !== value) };
      }
  });
};
//handle file
const handleFileChange = (event) => {
    setFormData({ ...formData, file: event.target.files[0] });
  };

// mobile validation logic
const isMobileValid = (mobileNumber) => {
    return /^\d{10}$/.test(mobileNumber);
};

//password validation logic
const isPasswordValid = (password) => {
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};
const isEmailValid = (email) => {
  return email.includes("@");
};

//data sending function
  const sendData = async (e) => {
    e.preventDefault();
    const {firstname,lastname,brandname,email,password,age,description,location,language,mobile,skills,file,} = formData;
    const newWorker = new FormData();
    newWorker.append("firstname", firstname);
    newWorker.append("lastname", lastname);
    newWorker.append("brandname", brandname);
    newWorker.append("email", email);
    newWorker.append("password", password);
    newWorker.append("age", age);
    newWorker.append("description", description);
    newWorker.append("location", location);
    language.forEach((lang) => newWorker.append("language", lang));
    newWorker.append("mobile", mobile);
    newWorker.append("skills", skills);
    newWorker.append("file", file);

//checking validation
    if (!isMobileValid(mobile)) {
        alert("Mobile number should contain exactly 10 digits.");
        return;
    }

    if (!isPasswordValid(password)) {
        alert("Password must contain at least one letter, one number, and one symbol and should be at least 8 characters long.");
        return;
    }
    if (!isEmailValid(email)) {
      alert("Email must contain an '@' symbol.");
      return;
    }
//sending data without error
    else{
        try {
             await axios.post("http://localhost:10200/workers/add", newWorker, {
                headers: {
                "Content-Type": "multipart/form-data",
            },
        });
            navigate("/");
            alert("Worker is added");
    }   catch (error) {
            console.error("Worker adding failed", error);
            alert("Worker adding failed");
    }
  }
}
  return (
    <div className="container" style={{ marginTop: "25px", width: "60%" }}>
      <form onSubmit={sendData} encType="multipart/form-data">
        <div className="mb-3 container">
          <label htmlFor="firstname" className="form-label">First name</label>
          <input 
            type="text" placeholder="Jhone"
            className="form-control" 
            id="firstname" 
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange} />
        </div>
        <div className="mb-3 container">
          <label htmlFor="lastname" className="form-label">Last name</label>
          <input 
            type="text" placeholder="Player"
            className="form-control" 
            id="lastname" 
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange} />
        </div>
        <div className="mb-3 container">
          <label htmlFor="brandname" className="form-label">Brand name</label>
          <input 
            type="text" placeholder="Resi Tech"
            className="form-control" 
            id="brandname" 
            name="brandname"
            value={formData.brandname}
            onChange={handleInputChange} />
        </div>
        <div className="mb-3 container">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" placeholder="jhonplayer@gmail.com"
            className="form-control" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange} />
        </div>
        <div className="mb-3 container">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" placeholder="********"
            className="form-control" 
            id="password" 
            name="password"
            value={formData.password}
            onChange={handleInputChange} />
            <div style={{ fontSize: "0.8rem", color: "#6c757d" }}>Password must include at least one letter, one number, and one symbol.</div>
        </div>
        <div className="mb-3 container">
          <label htmlFor="age" className="form-label">Age</label>
          <input 
            type="text" placeholder="35"
            className="form-control" 
            id="age" 
            name="age"
            value={formData.age}
            onChange={handleInputChange} />
        </div>
        <div className="mb-3 container">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
            className="form-control" placeholder="Describe about your job role"
            id="description" 
            rows="3" 
            name="description"
            value={formData.description}
            onChange={handleInputChange}></textarea>
        </div>
        <div className="mb-3 container">
          <label htmlFor="location" className="form-label">Location</label>
          <input 
            type="text" placeholder="No 17 Marukona ukuwela"
            className="form-control" 
            id="location" 
            name="location"
            value={formData.location}
            onChange={handleInputChange} />
        </div>
        <div className="mb-3 container">
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="sinhala" 
              value="Sinhala" 
              name="language"
              onChange={handleCheckboxChange} />
            <label className="form-check-label" htmlFor="sinhala">Sinhala</label>
          </div>
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="tamil" 
              value="Tamil" 
              name="language"
              onChange={handleCheckboxChange} />
            <label className="form-check-label" htmlFor="tamil">Tamil</label>
          </div>
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="english" 
              value="English" 
              name="language"
              onChange={handleCheckboxChange} />
            <label className="form-check-label" htmlFor="english">English</label>
          </div>
        </div>
        <div className="mb-3 container">
          <label htmlFor="mobile" className="form-label">Mobile</label>
          <input 
            type="text" placeholder="+94 702525 025"
            className="form-control" 
            id="mobile" 
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange} />
        </div>
        <div className="mb-3 container">
          <label htmlFor="skills" className="form-label">Skills</label>
          <input 
            type="text" placeholder="House wiring"
            className="form-control" 
            id="skills" 
            name="skills"
            value={formData.skills}
            onChange={handleInputChange} />
        </div>
        <div className="mb-3 container">
          <label htmlFor="file" className="form-label">Profile image</label>
          <input 
            type="file" 
            className="form-control" 
            id="file" 
            name="file"
            onChange={handleFileChange} />
            <div style={{ fontSize: "0.8rem", color: "#6c757d" }}>Ensure to upload squre image (200px x 200px)</div>
        </div>
        <div class="mb-3 container">
            <button type="submit" style={{backgroundColor:"#67ba6a",marginTop:"20px", border:"#67ba6a", outline:"none",width:"100%", textAlign:"center", padding:"10px", borderRadius:"4px",color:"white",fontWeight:"bold"}} >Register Here</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
