
import React, { useEffect } from "react";
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
import Slide from '../css/Slides.css';

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

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="SlideMainDiv">
      <h1 className="Heading">Top Technician in this week</h1>
      <Carousel responsive={responsive}>
        <div data-aos="fade-up" className="cardDiv">
          <img className="cardImg" src={Electrician} alt="technician" />
          <h3 className="cardTitle">Electrician</h3>
          <p>from matale</p>
          <Link className="card-link nav-link" to={'/'} >Go to Profile</Link>
        </div>
        <div data-aos="fade-down" className="cardDiv">
          <img className="cardImg" src={Camera} alt="technician" />
          <h3 className="cardTitle">Welder</h3>
          <p>from Kandy</p>
          <Link className="card-link nav-link" to={'/'} >Go to Profile</Link>
        </div>
        <div data-aos="fade-up" className="cardDiv">
          <img className="cardImg" src={Hvac} alt="technician" />
          <h3 className="cardTitle">HVAC tech</h3>
          <p>from colombo</p>
          <Link className="card-link nav-link" to={'/'} >Go to Profile</Link>
        </div>
        <div data-aos="fade-down" className="cardDiv">
          <img className="cardImg" src={Sola} alt="technician" />
          <h3 className="cardTitle">Sola Tech</h3>
          <p>from Kurunagala</p>
          <Link className="card-link nav-link" to={'/'} >Go to Profile</Link>
        </div>

      </Carousel>
    </div>
  );
}

export default SlideShow;
