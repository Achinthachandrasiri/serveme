import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './component/Header';
import Register from './component/Register';
import Profile from './component/Profile';
import Review from './component/Review';
import Gig from './component/Gig';
import Login from './component/Login';
import Home from './component/Home';
import CreateGig from './component/Creategig';
import CreateGigButton from './component/CreateGigButton';
import ViewGig from './component/ViewGig';
import EditProfile from './component/EditProfile';
import EditGig from './component/EditGig';
import ViewRequest from './component/ViewRequest';
import Footer from './component/Footer';
import SlideShow from './component/SlideShow';
import HomeTextFeild from './component/HomeTextFeild';
import Banner from './component/Banner';
import AddReview from './component/AddReview';
const RegisterWithHeader = () => (
  <div>
    <Header />
    <Register />
    <Footer/>
  </div>
);
const CreateNewGig = () => (
  <div>
    <Header />
    <CreateGig/>
  </div>
);
const ViewNewGig = () => (
  <div>
    <Header />
    <CreateGigButton/>
    <Profile/>
    <ViewGig/>
    <Review/>
  </div>
);
const ProfileDiv = () => (
  <div>
    <Header />
    <CreateGigButton/>
    <Profile/>
    <Gig/>
    <Review/>
  </div>
);
const Menu = () =>(
  <div>
    <Header />
    <Home/>
    <Banner/>
    <SlideShow/>
    <Footer/>
  </div>
);
const EditProfilePage = () =>(
  <div>
    <Header />
    <EditProfile/>
  </div>
);
const EditGigPage= ()=>(
  <div>
    <Header/>
    <EditGig/>
  </div>
)
const ViewNewReq= ()=>(
  <div>
     <Header />
     <CreateGigButton/>
     <Profile/>
     <Gig/>
     <ViewRequest/>
  </div>
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Menu/>} />
          <Route path="/creategig/:id" element={<CreateNewGig/>} />
          <Route path='/register' element={<RegisterWithHeader/>}/>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<ProfileDiv/>}/>
          <Route path="workers/checkprofile/:id" element={<ProfileDiv/>}/>
          <Route path="/workers/viewgig/:id" element={< ViewNewGig/>}/>
          <Route path="/login" element={<Home/>}/>
          <Route path="/workers/editprofile/:id" element={<EditProfilePage/>}/>
          <Route path="/EditGig/:id" element={<EditGigPage/>}/>
          <Route path="/newRequest/:id" element={<ViewNewReq/>}/>
          <Route path="/addreview/" element={<AddReview/>}/>
        </Routes>
    </Router>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();