import React from 'react';
import './App.css';
import { Route, Router, Routes } from "react-router-dom";
import LoginForm from './LoginForm/Login';
import SignIn from './SigninForm/Signin';
import AddRoom from './AddRoom/AddRoom';
import BookRoom from './BookRoom/BookRoom';
import GiveFeedback from './GiveFeedback/GiveFeedback';
import ViewFeedbacks from './ViewFeedbacks/ViewFeedbacks';
import ViewMeetings from './ViewMeetings/ViewMeetings';
import SearchAvailableRooms from './SearchAvailableRooms/SearchAvailableRooms';
import axios from 'axios';
function App() {
  axios.defaults.baseURL = "http://localhost:8080/api"
  return (
  
      <Routes>
        <Route path="/" element={<LoginForm></LoginForm>} />
        <Route path="/login" element={<LoginForm></LoginForm>} />
        <Route path="/signin" element={<SignIn ></SignIn>} />
        <Route path="/addRoom" element={<AddRoom></AddRoom>} />
        <Route path="/bookRoom" element={<BookRoom></BookRoom>} />
        <Route path="/giveFeedback" element={<GiveFeedback></GiveFeedback>} />
        <Route path="/viewFeedbacks" element={<ViewFeedbacks></ViewFeedbacks>} />
        <Route path="/viewMeetings" element={<ViewMeetings></ViewMeetings>} />
        <Route path="/searchAvailableRooms" element={<SearchAvailableRooms></SearchAvailableRooms>} />
      </Routes>

    
);
}

export default App;
