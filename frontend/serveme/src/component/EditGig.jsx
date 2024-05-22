import React, { useState , useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
//import FileBase64 from 'react-file-base64';
import {useParams} from "react-router-dom";
function EditGig(){
    //Fetchin for updatae
    const {id} =useParams() 
    useEffect(() => {
        async function getProfile() {
            try {
                const response = await axios.get(`http://localhost:10200/gigs/update/${id}`)
                setAccId(response.data.id)
                setTitle(response.data.title)
                setCategory(response.data.category)
                setSub(response.data.subcategory)
                setDes(response.data.description)
                setPrice(response.data.price)
                setSize(response.data.projectsize)
                setRules(response.data.rules)
                setImage(response.data.image)
                console.log(response);
               
            } catch (error) {
                console.log(error);
                alert('Error fetching gig data');
            }
        }
        getProfile();
    }, [id]);

    //updating
    const[accId ,setAccId]=useState("");
    const[title, setTitle]=useState("");
    const[category, setCategory]=useState("");
    const[subcategory, setSub]=useState("");
    const[description, setDes]=useState("");
    const[price, setPrice]=useState("");
    const[projectsize, setSize]=useState("");
    const[rules, setRules]=useState("");
    const[image, setImage]=useState(null);
    const[districts, setSelectedDistrict] = useState('');
    const[electionQuotas, setElectionQuotas] = useState('');
    const navigate= useNavigate();

    function sendData(e) {
        e.preventDefault();
            const newGig = ({
                accId,
                title,
                category,
                subcategory,
                districts,
                electionQuotas,
                description,
                price,
                projectsize,
                rules,
                image,
            })
            axios.put(`http://localhost:10200/gigs/edit/${id}`, newGig)
            .then(()=>{
               navigate(`/workers/viewgig/${id}`);
               alert("Gig is updated");
            })
            .catch((err) => {
                alert("Gig updating failed");
            });
        
    }
    const handleCatChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory );

        const CatMap = {
            "Carpenter": ["Furniture Carpenter", "Construction Carpenter", "Finish Carpenter", "Roofing Carpenter"],
            "Electrician": ["Residential Electrician", "Commercial Electrician", "Industrial Electrician", "Maintenance Electrician"],
            "Solar Panel Installer": ["Residential Solar Panel Installer", "Commercial Solar Panel Installer", "Industrial Solar Panel Installer", "Solar System Maintenance Technician"],
            "CCTV Installer": ["Security System Installer", "Surveillance Camera Installer", "Access Control Installer", "Alarm System Technician"],
            "Plumber": ["Residential Plumber", "Commercial Plumber", "Industrial Plumber", "Drainage Specialist"],
            "Painter": ["Residential Painter", "Commercial Painter", "Industrial Painter", "Decorative Painter"],
            "Mason": ["Brick Mason", "Stone Mason", "Concrete Mason", "Tile Setter"],
            "HVAC Technician": ["Residential HVAC Technician", "Commercial HVAC Technician", "Refrigeration Technician", "Air Quality Technician"],
            "Landscaper": ["Residential Landscaper", "Commercial Landscaper", "Garden Designer", "Lawn Care Specialist"],
            "Welder": ["Arc Welder", "MIG Welder", "TIG Welder", "Structural Welder"],
            "Mechanic": ["Automotive Mechanic", "Diesel Mechanic", "Motorcycle Mechanic", "Aircraft Mechanic"],
            "Roofing Specialist": ["Residential Roofing Specialist", "Commercial Roofing Specialist", "Flat Roofing Specialist", "Metal Roofing Specialist"],
            "Electronic Specialist": ["Consumer Electronics Repair", "Industrial Electronics Repair", "Audio-Visual Technician", "Home Automation Specialist"],
            "Excavator Operator": ["Heavy Equipment Operator", "Site Development Operator", "Earthmoving Equipment Operator", "Construction Equipment Operator"],
        };
        const selectedSub = CatMap[selectedCategory] || '';
        setSub(selectedSub);
    };
   
    const handleDistrictChange = (e) => {
        const selectedDistrictValue = e.target.value;
        setSelectedDistrict(selectedDistrictValue);

        const quotasMap = {
            "Ampara": ["Ampara", "Kalmunai","Addalaichenai","Akkaraipattu","Alayadivembu","Damana","Dehiattakandiya","Irakkamam","Lahugala","Maha Oya","Navithanveli", "Nintavur", "Padiyathalawa", "Pottuvil", "Sainthamarathu", "Samanthurai", "Thirukkovil", "Uhana"],
            "Anuradhapura": ["Anuradhapura", "Bulnewa", "Eppawala", "Galenbindunuwewa", "Galnewa", "Ganewalpola", "Habarana", "Horowupotana", "Kahatagasdigiliya", "Kebitigollawa", "Kekirawa", "Konapathirawa", "Konwewa", "Madatugama", "Mahailuppallama", "Maradankadawala", "Medawachchiya", "Mihintale", "Nochchiyagama", "Nachchaduwa", "Padawiya", "Palugaswewa", "Rambewa", "Seeppukulama", "Talawa", "Tambuttegama", "Thirappane", "Yakalla"],
            "Badulla": ["Badulla","Mahiyanganaya", "Diyatalawa", "Hali-Ela", "Ella", "Haldummulla", "Beragala", "Welimada", "Kandaketiya", "Meegahakivula", "Passara", "Lunugala", "Tennapanguwa", "Kumarapattiya"],
            "Batticaloa": ["Batticaloa","Chenkalady", "Eravur", "Kattankudy", "Kiran", "Kalkudah", "Kaluvanchikudy", "Kathiraveli", "Oddamavadi", "Pasikudah", "Vakarai", "Valaichchenai", "Vavunathivu", "Vellavely"],
            "Colombo": ["Colombo", "Hanwella Ihala", "Homagama", "Kolonnawa", "Kotikawatta", "Maharagama", "Moratuwa", "Mulleriyawa", "Pita Kotte", "Sri Jayewardenepura Kotte", "Dehiwala-Mount Lavinia", "Negombo"],
            "Galle": ["Galle", "Ambalangoda", "Hikkaduwa","Karapitiya", "Unawatuna"],
            "Gampaha": ["Gampaha", "Negombo","Nittambuwa","Katunayake", "Kelaniya", "Kadawatha","Ja-Ela", "Minuwangoda","Wattala"],
            "Hambantota": ["Hambantota","Ambalantota","Beliatta", "Tissamaharama","Tangalle", ],
            "Jaffna": ["Jaffna", "Point Pedro", "Chavakachcheri","Chunnakam", "Nallur", "Kilinochchi","Tellippalai"],
            "Kalutara": ["Kalutara","Beruwala","Bandaragama", "Panadura", "Horana", "Matugama"],
            "Kandy": ["Kandy","Akurana", "Teldeniya", "Wattegama", "Peradeniya", "Pallekele","Nawalapitiya", "Katugastota", "Gampola"],
            "Kegalle": ["Kegalle","Ambepussa", "Aranayaka", "Bulathkohupitiya", "Dehiovita", "Deraniyagala", "Galigamuwa", "Hemmathagama", "Karawanella", "Kitulgala", "Kotiyakumbura", "Mawanella", "Rambukkana", "Ruwanwella", "Thalgaspitiya", "Warakapola", "Yatiyanthota"],
            "Kilinochchi": ["Kilinochchi","Pallai", "Paranthan", "Poonakary", "Tharmapuram", "Thiruvaiyaru"],
            "Kurunegala": ["Kurunegala", "Kuliyapitiya", "Narammala", "Polgahawela","Henegedara", "Medagama", "Mallawapitiya", "Kumbukwewa", "Mawathagama"],
            "Mannar": ["Mannar"],
            "Matale": ["Matale", "Dambulla", "Galewela", "Ambanganga","Ukuwela"],
            "Matara": ["Matara", "Weligama", "Hakmana", "Akuressa"],
            "Monaragala": ["Monaragala", "Badalkumbura", "Bibile", "Wellawaya"],
            "Mullaitivu": ["Mullaitivu"],
            "Nuwara eliya": ["Nuwara Eliya", "Hatton", "Kotmale"],
            "Polonnaruwa": ["Polonnaruwa", "Medirigiriya", "Hingurakgoda"],
            "Puttalam": ["Puttalam", "Chilaw", "Nattandiya", "Wennappuwa"],
            "Ratnapura": ["Ratnapura", "Embilipitiya", "Balangoda", "Kuruwita"],
            "Trincomalee": ["Trincomalee", "Kinniya", "Muttur"],
            "Vavuniya": ["Vavuniya", "Vavuniya South"]
        };
        const selectedQuotas = quotasMap[selectedDistrictValue] || '';
        setElectionQuotas(selectedQuotas);
    };
    return(
        <div className="container" style={{marginTop:"25px", width:"60%"}}>
            <form onSubmit={sendData} encType="multipart/form-data">
            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">Title</label>
                <input type="fname" class="form-control" id="exampleFormControlInput1" placeholder="Amazon electrician for your House  wiring" value={title}
                onChange={(e)=>{
                    setTitle(e.target.value);
                }} />
            </div>
            <div class="mb-3 container">
            <label for="exampleFormControlTextarea1" class="form-label">Category</label>
            <select class="form-select form-control" aria-label="Default select example" style={{height:"40px"}} onChange={handleCatChange}
                        value={category}>
                <option selected value="Carpenter">Carpenter</option>
                <option value="Electrician">Electrician</option>
                <option value="Solar Panel Installer">Solar Panel Installer</option>
                <option value="CCTV Installer">CCTV Installer</option>
                <option value="Plumber">Plumber</option>
                <option value="Mason">Mason</option>
                <option value="HVAC Technician">HVAC Technician</option>
                <option value="Landscaper">Landscaper</option>
                <option value="Welder">Welder</option>
                <option value="Mechanic">Mechanic</option>
                <option value="Roofing Specialist">Roofing Specialist</option>
                <option value="Electronic Specialist">Electronic Specialist</option>
                <option value="Excavator Operator">Excavator Operato</option>
                <option value="Painter">Painter</option>
            </select>
            </div>
            
            <div className="mb-3 container">
                <label htmlFor="electionQuotas" className="form-label">Sub Category for</label>
                <select className="form-select form-control" id="electionQuotas" aria-label="Election Quotas" style={{ height: "40px" }} value={subcategory} onChange={(e) => setSub(e.target.value)}>
                    {subcategory && typeof subcategory !== 'string' ? (
                    subcategory.map((quota, index) => (
                        <option key={index} value={quota}>{quota}</option>
                    ))
                ) : (
                        <option value={subcategory}>{subcategory}</option>
                    )}
                </select>
            </div>

            <div class="mb-3 container">
            <label for="exampleFormControlTextarea1" class="form-label">Distric</label>
            <select class="form-select form-control" aria-label="Default select example" style={{height:"40px"}} onChange={handleDistrictChange}
                        value={districts}>
                <option selected value="Ampara">Ampara</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Badulla">Badulla</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Colombo">Colombo</option>
                <option value="Galle">Galle</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Hambantota">Hambantota</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Kegalle">Kegalle</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Mannar">Mannar</option>
                <option value="Matale">Matale</option>
                <option value="Matara">Matara</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Nuwara eliya">Nuwara eliya</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Ratnapura">Ratnapura</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Vavuniya">Vavuniya</option>
            </select>
            </div>
            
            <div className="mb-3 container">
                <label htmlFor="electionQuotas" className="form-label">Worker Quotas for</label>
                <select className="form-select form-control" id="electionQuotas" aria-label="Election Quotas" style={{ height: "40px" }} value={electionQuotas} onChange={(e) => setElectionQuotas(e.target.value)}>
                    {electionQuotas && typeof electionQuotas !== 'string' ? (
                    electionQuotas.map((quota, index) => (
                        <option key={index} value={quota}>{quota}</option>
                    ))
                ) : (
                        <option value={electionQuotas}>{electionQuotas}</option>
                    )}
                </select>
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">Description</label>
                <textarea type="bname" class="form-control" id="exampleFormControlInput1" placeholder="Description" rows="3" value={description}
                onChange={(e)=>{
                    setDes(e.target.value);
                }}
                />
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">Price</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Rs 1500 per point" value={price}
               onChange={(e)=>{
                setPrice(e.target.value);
                }}
            
                />
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">Rules</label>
                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Your requirnment" value={rules}
                onChange={(e)=>{
                    setSize(e.target.value);
                }}
                />
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlInput1" class="form-label">Project Size</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Medium Scale" value={projectsize}
                onChange={(e)=>{
                    setPrice(e.target.value);
                }}
                />
            </div>
            <div class="mb-3 container">
                <label for="exampleFormControlTextarea1" class="form-label">Gig cover</label>
                <input type="file" class="form-control" id="exampleFormControlTextarea1" rows="3" 
                onChange={(e)=>{
                    setImage(e.target.value);
                }}
                />
            </div>

            <div class="mb-3 container">
                <button style={{backgroundColor:"#67ba6a", border:"#67ba6a", outline:"none",width:"100%", textAlign:"center", padding:"10px", borderRadius:"4px",color:"white"}} ><b>Update and Save</b></button>
            </div>
            </form>
        </div>
    )
}

export default EditGig;

