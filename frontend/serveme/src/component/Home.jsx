import React,{useState, useEffect} from "react";
import { Link} from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
function Home(){
    const[districts, setSelectedDistrict] = useState('');
    const[electionQuotas, setElectionQuotas] = useState('');
    const[category, setCategory]=useState("");
    const[subcategory, setSub]=useState("");
    const [gigs, setGigs] = useState([]);

    const handleDistrictChange = (e) => {
        const selectedDistrictValue = e.target.value;
        setSelectedDistrict(selectedDistrictValue);
    
//map of cities.........................................................................................................................
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
    const handleCatChange = (e) => {
        const selectedCatValue = e.target.value;
        setCategory(selectedCatValue );
    
//map of sub category...................................................................................................................
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
        const selectedSub = CatMap[selectedCatValue] || '';
        setSub(selectedSub);
    };

//getting data for input keywords.......................................................................................................
    async function fetchData(e) {
        if (e) {
            e.preventDefault();
        }
           try {
            const response = await axios.get(`http://localhost:10200/gigs/findWorkers/?category=${category}&subcategory=${subcategory}&districts=${districts}&electionQuotas=${electionQuotas}`)
                console.log(response.data);
                setGigs(response.data);
        
           } catch (error) {
                console.log(error);
        }
    }
    useEffect(() => {
        fetchData();  
    }, [category, subcategory,districts,electionQuotas]);

    useEffect(()=>{
        AOS.init({duration:2000});
    },[]);

    return(
        <div className="mb-3 container">
            <form onSubmit={(e) => fetchData(e)} style={{marginTop:"20px"}}>
            <div  style={{display:"flex"}}>
            <div class="mb-3 container" style={{width:"20%"}}>
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
            
            <div className="mb-3 container" style={{width:"20%"}}>
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
              
            <div class="mb-3 container" style={{width:"20%"}}>
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
            
            <div className="mb-3 container" style={{width:"20%"}}>
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
            <div className="mb-3 container" style={{width:"20%"}}>
                <p htmlFor="electionQuotas" className="form-label"></p>
                <button style={{backgroundColor:"#67ba6a",width:"100%",marginTop:"24px", border:"#67ba6a", outline:"none", textAlign:"center", padding:"7px",fontWeight:"bold", borderRadius:"4px",color:"white"}} >Go</button>
            </div>
        </div>
    </form>
{/*gig results........................................................................................................................*/}
    <div className="gig-list, mb-3 container" style={{display:"flex",flexWrap: "wrap",gap: "13px",justifyContent: "flexStart" , marginTop:"20px"}}>
        {gigs.map((gig, index) => (
        <div data-aos="zoom-in" key={index} className="gig-card"  style={{border: '1px solid #e0e0e0',height:"270px",borderRadius: '8px',padding: '0px',width: 'calc(24% - 5px)',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',transition: 'transform 0.3s ease-in-out',boxSizing: 'border-box',}}>
                <div  style={{width:"100%",height:"190px"}}>
                    <img style={{width:"100%",height:"170px",borderRadius:"8px 8px 0px 0px"}} src={`http://localhost:10200/${gig.file}`} alt="gigImage" />
                </div>
                <div style={{margin:"10px"}}>
                    <h5 style={{textAlign:"center"}}><Link style={{textDecoration:"none", color:"black"}} to={`/workers/checkprofile/${gig.accId}`}>{gig.title}</Link></h5>
                    <p style={{textAlign:"center",marginBottom:"25px",color:"#67ba6a"}}><b>Price : {gig.price}</b></p>
                </div>
            </div>
        ))}
    </div>
</div>
    )
}
export default Home;