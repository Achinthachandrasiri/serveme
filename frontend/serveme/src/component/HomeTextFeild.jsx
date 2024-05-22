
import React, {  useEffect} from "react";
import Carousel from 'react-multi-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-multi-carousel/lib/styles.css';

function HomeTextFeild() {
    useEffect(()=>{
        AOS.init({duration:2000});
    },[]);
    return (
        <div className="mb-3 container" style={{display:"flex",position:"relative", left:"0%", marginTop: "60px",width:"80%",marginBottom:"60px"}}>
            <div data-aos="fade-right"  style={{ borderRight:"solid 0px gray", }}>
                <p style={{textAlign:"right",margin:"20px"}}>Welcome to ServeMe, your one-stop destination for finding skilled technicians right in your neighborhood. Whether you're facing a plumbing emergency, electrical issues, appliance repairs, or any other home service needs, ServeMe has got you covered.
                Gone are the days of frantically searching through directories or asking for recommendations from friends and family. With ServeMe, you can easily locate qualified technicians in just a few clicks. Our platform connects you with experienced professionals who are ready to serve you promptly and efficiently.</p>
            </div>
            <div data-aos="fade-left" style={{}}>
                <p style={{textAlign:"left",margin:"20px"}}> At ServeMe, we prioritize your convenience, ensuring you can say goodbye to endless phone calls and inquiries. With all the information you need at your fingertips, finding the right technician for your needs has never been easier. We uphold high standards of expertise and professionalism by vetting all our technicians, guaranteeing you quality service every time. Time is crucial when dealing with home repair issues, which is why ServeMe prioritizes quick response times, connecting you with technicians who can promptly address your needs. Additionally, with transparent pricing upfront, you'll never encounter surprises when it comes to costs, allowing you to book with confidence and peace of mind.</p>
            </div>
        </div>
    );
}

export default HomeTextFeild;
