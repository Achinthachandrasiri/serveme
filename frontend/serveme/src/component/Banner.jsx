
import React, {  useEffect, useState} from "react";
import Carousel from 'react-multi-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-multi-carousel/lib/styles.css';
import Electrician from '../Img/Electrician-Featured.jpg';
import Carpenter from '../Img/welder.jpg';
import Point from '../Img/point.png';
import Welder from '../Img/jimmy-nilsson-masth-UovTD1dG-lA-unsplash.jpg';
import { Link } from 'react-router-dom';

function Banner() {
    useEffect(()=>{
        AOS.init({duration:2000});
    },[]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [Welder,Electrician, Carpenter];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, [images.length]);
    return (
        <div>
            <div className="mb-3 container" style={{display:"flex", marginTop:"40px"}}>
            <div  style={{width:"50%", }} >
                <img style={{ width: "100%", borderRadius: "6px",transition: 'opacity 1s ease-in-out' }} src={images[currentImageIndex]} alt="banner" />
            </div>
            <div style={{width:"50%", padding:"20px"}}>
                <h1 style={{color:"#67ba6a"}} data-aos="fade-up">Welcome to the Serve Me for best Service</h1>
                <p data-aos="fade-down">Are you in need of a skilled technician for your home repairs or projects? Look no further! [Your App Name] is here to connect you with qualified technicians right in your neighborhood. Whether it's electrical work, plumbing, carpentry, or any other specialized service, we've got you covered.</p>
                <Link style={{padding:"5px 10px 5px 10px", border:"solid 1px gray", borderRadius:"3px", width:"150px"}} className="nav-link" to={'/about'}>Read more<img src={Point} alt="read me" style={{width:"34px", height:"27px",paddingLeft:"10px", marginBottom:"2px"}}/></Link>
            </div>
        </div>

    <div className="mb-3 container" style={{ marginTop:"60px"}}>
        <div style={{width:"100%", }}>
            <h1 style={{}}>How it Works:</h1>
        <div style={{display:""}}>
            <h4 style={{color:"#67ba6a"}} data-aos="fade-left">"ServeMe: Your Trusted Source for Nearby Technicians</h4>
            <p data-aos="fade-right">
            Welcome to ServeMe, your one-stop destination for finding skilled technicians right in your neighborhood. Whether you're facing a plumbing emergency, electrical issues, appliance repairs, or any other home service needs, ServeMe has got you covered.
            Gone are the days of frantically searching through directories or asking for recommendations from friends and family. With ServeMe, you can easily locate qualified technicians in just a few clicks. Our platform connects you with experienced professionals who are ready to serve you promptly and efficiently.
            </p>
            <p data-aos="fade-left">
            <h4 style={{ marginTop:"40px"}}  data-aos="fade-right">Why Choose ServeMe?</h4>
            At ServeMe, we prioritize your convenience, ensuring you can say goodbye to endless phone calls and inquiries. With all the information you need at your fingertips, finding the right technician for your needs has never been easier. We uphold high standards of expertise and professionalism by vetting all our technicians, guaranteeing you quality service every time. Time is crucial when dealing with home repair issues, which is why ServeMe prioritizes quick response times, connecting you with technicians who can promptly address your needs. Additionally, with transparent pricing upfront, you'll never encounter surprises when it comes to costs, allowing you to book with confidence and peace of mind.
            </p>
            </div>  
        </div>
     </div>
</div>
);
}


export default Banner;
