import React ,{useState, useEffect} from "react";
import axios from "axios";
//import FileBase64 from 'react-file-base64';
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
function EditProfile(){
    const {id} =useParams() 
    const [formValues, setFormValues] = useState({});
    const[firstname, setFname]=useState("");
    const[lastname, setLname]=useState("");
    const[brandname, setBname]=useState("");
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const[age, setAge]=useState("");
    const[description, setDes]=useState("");
    const[location, setLocation]=useState("");
    const[language, setSelectedLanguages] = useState([]);
    const[mobile, setMobile]=useState("");
    const[skills, setSkills]=useState("");
    const[file, setProfile]=useState("");
    const navigate= useNavigate();

    useEffect(() => {
        async function getProfile() {
            try {
                const response = await axios.get(`http://localhost:10200/workers/update/${id}`)
                setFname(response.data.firstname)
                setLname(response.data.lastname)
                setBname(response.data.brandname)
                setEmail(response.data.email)
                setPassword(response.data.password)
                setAge(response.data.age)
                setDes(response.data.description)
                setLocation(response.data.location)
                setSelectedLanguages(response.data.language)
                setMobile(response.data.mobile)
                setSkills(response.data.skills)
                setProfile(response.data.file)    
               
            } catch (error) {
                console.log(error);
                alert('Error fetching profile data');
            }
        }
        getProfile();
    }, [id]);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
    
        if (isChecked) {
          setSelectedLanguages((prevSelectedLanguages) => [...prevSelectedLanguages, value]);
        } else {
          setSelectedLanguages((prevSelectedLanguages) =>
            prevSelectedLanguages.filter((language) => language !== value)
          );
        }
      };

    function sendData(e) {
        e.preventDefault();
        
        if (mobile.length !== 10) {
            alert("Mobile number should contain exactly 10 digits.");
            return;
        }

        if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            alert("Password must contain at least one letter, one number, and one symbol and should be at least 8 characters long.");
            return;
        }
        else{
            const newWorker = ({
                firstname,
                lastname,
                brandname,
                email,
                password,
                age,
                description,
                location,
                language,
                mobile,
                skills,
                file
        
            })
            axios.put("http://localhost:10200/workers/edit/" +id ,newWorker)
            .then(()=>{
                alert("Worker is updated");
               navigate('/profile');
            })
            .catch((err) => {
                alert("Worker updatinf failed");
                console.log("this is the err"+err)
            });
        }
        
    } 
    return(
        <div className="container" style={{marginTop:"25px", width:"60%"}}>
            <form onSubmit={sendData} encType="multipart/form-data">
            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">First name</label>
                <input type="fname" class="form-control" id="exampleFormControlInput1" name="firstname" placeholder="jhone"  value={firstname}
                onChange={(e)=>{
                    setFname(e.target.value);
                }}
                 />
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">Last name</label>
                <input type="lname" class="form-control" id="exampleFormControlInput1" name="lastname" placeholder="player"  value={lastname}
                onChange={(e)=>{
                    setLname(e.target.value);
                }}
                />
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">Brand name</label>
                <input type="bname" class="form-control" id="exampleFormControlInput1" placeholder="tronic man" name="brandname"  value={brandname}
                onChange={(e)=>{
                    setBname(e.target.value);
                }}
                />
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">Email</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="000102088629" name="email" value={email}
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}
                />
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="********" name="password" value={password}
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
                />
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlTextarea1" class="form-label">Age</label>
                <input type="nic" class="form-control" id="exampleFormControlInput1" placeholder="25" name="age" value={age}
                 onChange={(e)=>{
                    setAge(e.target.value);
                }}
                />
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="description" value={description}
                onChange={(e)=>{
                    setDes(e.target.value);
            }}
                ></textarea>
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">Loacation</label>
                <input type="bname" class="form-control" id="exampleFormControlInput1" placeholder="No/Rd/city/distric/province" name="location"  value={location}
                onChange={(e)=>{
                    setLocation(e.target.value);
                }}
                />
            </div>

            <div class="mb-3 container">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Sinhala" name="language"
                onChange={handleCheckboxChange}
                />
                <label class="form-check-label" for="inlineCheckbox1">Sinhala</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Tamil" name="language"
                onChange={handleCheckboxChange}/>
                <label class="form-check-label" for="inlineCheckbox2">Tamil</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="English" name="language"
                onChange={handleCheckboxChange}/>
                <label class="form-check-label" for="inlineCheckbox3">English</label>
            </div>
            </div>

            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">Mobile no</label>
                <input type="bname" class="form-control" id="exampleFormControlInput1" placeholder="+94 752222293" name="mobile" value={mobile}
                onChange={(e)=>{
                    setMobile(e.target.value);
                }}
                />
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">Skills</label>
                <input type="nic" class="form-control" id="exampleFormControlInput1" placeholder="communicating,leading,time managing" name="skills" value={skills}
                onChange={(e)=>{
                    setSkills(e.target.value);
                }}
                />
            </div>
           
            <div class="mb-3 container">
                <button style={{backgroundColor:"#67ba6a", border:"#67ba6a", outline:"none",width:"100%", textAlign:"center", padding:"10px", borderRadius:"4px",color:"white"}} >Register Here</button>
            </div>
            </form>
        </div>
    )
}
export default EditProfile;