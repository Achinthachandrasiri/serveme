
import React, {  useEffect} from "react";
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-multi-carousel/lib/styles.css';
import Mason from '../Img/Brick-Wall-web.jpg';
import Electrician from '../Img/Electrician-Featured.jpg';
import Sola from '../Img/solar-panel-contractor-quotes-installation-1024x683.jpg';
import Camera from '../Img/welder.jpg'
import Hvac from '../Img/hvac.jpg';

function SlideShow() {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    useEffect(()=>{
        AOS.init({duration:2000});
    },[]);
    return (
        <div style={{width:"85%",position:"absolute",left:"8.5%", marginTop: "60px", position: "relative" }}>
            <h1 style={{textAlign:"center",marginBottom:"60px"}}>Top Technician in this week</h1>
            <Carousel responsive={responsive}>
            <div data-aos="fade-up" style={{width:"280px",height:"350px",boxShadow:" 5px 5px 12px rgba(0, 0, 0, 0.1)", borderRadius:"8px", background:"#f8f9fa",}}>
                <img  style={{width:"280px",height:"200px",borderRadius:"5px 5px 0px 0px "}} src={Electrician} alt="technician"/>
                <h3 style={{textAlign:"center",marginTop:"10px"}}>Electrician</h3>
                <p style={{textAlign:"center"}}>from matale</p>
                <Link style={{textAlign:"center", color:"#67ba6a", padding:"5px", border:"solid 1px #67ba6a", borderRadius:"30px",position:"relative", width:"50%", left:"25%"}} className="nav-link" to={'/'} >Go to Profile</Link>
            </div>
            <div data-aos="fade-down" style={{width:"280px",height:"350px",boxShadow:" 5px 5px 12px rgba(0, 0, 0, 0.1)", borderRadius:"8px", background:"#f8f9fa",}}>
                <img  style={{width:"280px",height:"200px",borderRadius:"5px 5px 0px 0px "}} src={Camera} alt="technician"/>
                <h3 style={{textAlign:"center",marginTop:"10px"}}>Welder</h3>
                <p style={{textAlign:"center"}}>from Kandy</p>
                <Link style={{textAlign:"center", color:"#67ba6a", padding:"5px", border:"solid 1px #67ba6a", borderRadius:"30px",position:"relative", width:"50%", left:"25%"}} className="nav-link" to={'/'} >Go to Profile</Link>
            </div>
            <div data-aos="fade-up" style={{width:"280px",height:"350px",boxShadow:" 5px 5px 12px rgba(0, 0, 0, 0.1)", borderRadius:"8px", background:"#f8f9fa",}}>
                <img  style={{width:"280px",height:"200px",borderRadius:"5px 5px 0px 0px "}} src={Hvac} alt="technician"/>
                <h3 style={{textAlign:"center",marginTop:"10px"}}>HVAC tech</h3>
                <p style={{textAlign:"center"}}>from colombo</p>
                <Link style={{textAlign:"center", color:"#67ba6a", padding:"5px", border:"solid 1px #67ba6a", borderRadius:"30px",position:"relative", width:"50%", left:"25%"}} className="nav-link" to={'/'} >Go to Profile</Link>
            </div>
            <div data-aos="fade-down" style={{width:"280px",height:"350px",boxShadow:" 5px 5px 12px rgba(0, 0, 0, 0.1)", borderRadius:"8px", background:"#f8f9fa",}}>
                <img  style={{width:"280px",height:"200px",borderRadius:"5px 5px 0px 0px "}} src={Sola} alt="technician"/>
                <h3 style={{textAlign:"center",marginTop:"10px"}}>Sola Tech</h3>
                <p style={{textAlign:"center"}}>from Kurunagala</p>
                <Link style={{textAlign:"center", color:"#67ba6a", padding:"5px", border:"solid 1px #67ba6a", borderRadius:"30px",position:"relative", width:"50%", left:"25%"}} className="nav-link" to={'/'} >Go to Profile</Link>
            </div>
            
      </Carousel>
        </div>
    );
}

export default SlideShow;
