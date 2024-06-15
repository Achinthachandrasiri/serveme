import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Banner from './component/Banner';
import AddReview from './component/AddReview';
import ProfileUserView from './component/ProfileUserView';
import GigListUserView from './component/GigListUserView';
import MyRequestLink from './component/MyRequestLink';
import ViewGigDetails from './component/ViewGigDetails';
import ForgetPassword from './component/ForgetPassword';

// Component Definitions
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
    <MyRequestLink/>
    <CreateGigButton/>
    <Profile/>
    <Gig/>
    <Review/>
  </div>
);

const Menu = () => (
  <div>
    <Header />
    <Home/>
    <Banner/>
    <SlideShow/>
    <Footer/>
  </div>
);

const EditProfilePage = () => (
  <div>
    <Header />
    <EditProfile/>
  </div>
);

const EditGigPage = () => (
  <div>
    <Header/>
    <EditGig/>
  </div>
);

const ViewNewReq = () => (
  <div>
    <Header />
    <ViewRequest/>
  </div>
);

const UserView = () => (
  <div>
    <Header />
    <ProfileUserView/>
    <GigListUserView/>
    <Review/>
  </div>
);

const UserViewNewGig = () => (
  <div>
    <Header />
    <ViewGigDetails/>
    <Review/>
  </div>
);

const ReviewsFromMobile = () => (
  <div>
    <Header />
    <Review/>
  </div>
);

// Root Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router basename="/serveme">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Menu />} />
        <Route path="/creategig/:id" element={<CreateNewGig />} />
        <Route path='/register' element={<RegisterWithHeader />} />
        <Route path="/profile" element={<ProfileDiv />} />
        <Route path="workers/checkprofile/:id" element={<UserView />} />
        <Route path="/workers/viewgig/:id" element={<ViewNewGig />} />
        <Route path="/workers/viewgigAsUser/:id" element={<UserViewNewGig />} />
        <Route path="/login" element={<Home />} />
        <Route path="/workers/editprofile/:id" element={<EditProfilePage />} />
        <Route path="/EditGig/:id" element={<EditGigPage />} />
        <Route path="/newRequest/:id" element={<ViewNewReq />} />
        <Route path="/addreview/" element={<AddReview />} />
        <Route path="/resetPassword" element={<ForgetPassword />} />
        <Route path="/reviewsFromMobile/" element={<ReviewsFromMobile />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
