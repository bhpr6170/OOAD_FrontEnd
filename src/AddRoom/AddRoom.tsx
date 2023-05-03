import { render } from '@testing-library/react';
import React, { useState } from 'react';
import './AddRoom.css';
import { useNavigate } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import { Rating, Typography } from '@mui/material';

// https://hirukarunathilaka.medium.com/signup-form-with-real-time-validation-using-react-typescript-6a7dfb3122b5

export const AddRoom  = (props:any) =>{
const [resData, setResData] = useState({});
const navigate = useNavigate();


  let handleChange = (event : any) => {
    event.preventDefault();
    let obj: any = {};
    obj[event.target.name] = event.target.value;
    setResData((prevState)=>{return {...prevState, ...obj}})
    
  }

  let handleSubmit = async (event : any) => {
    event.preventDefault();
    // console.log(resData);
    // console.log(JSON.stringify(resData)) ;
    let reqBody: any = resData;
 
    const response = await fetch('http://127.0.0.1:8080/api/feedbacks', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(resData),
      mode: 'cors'
  });

  if(response.ok){
    console.log(await response.text());
    alert("Feedback submitted Successfully");
  }
  else{
    alert("API call failed. Please try again later");
  }
 
  }

  return (
    <div>
            < NavBar />
      <div className='wrapper'>
              
        <div className='form-wrapper-feedback'>
           <h2>Add Room</h2>
           
           <form onSubmit={handleSubmit} noValidate >
              <div className='meeting_id'>
                 <label htmlFor="meeting_id">Meeting Number</label>
                 <input type='number' name='meeting_id' onBlur={handleChange}/>
              </div>
              <div className='rating'>
                 <label htmlFor="rating">Rating</label>
                 <Rating name="rating" size = "large" defaultValue={0} max={5} onBlur={handleChange}/>
              </div>  
              
              <div className='feedback'>
                 <label htmlFor="feedback">Feedback Comments</label>
                 <textarea name='feedback' rows={5} onBlur={handleChange}/>
              </div>  

              <div className='submit'>
                 <button>Submit Feedback</button>
              </div>
              
         </form>
        
     </div>
     
  </div>
 
  </div>
  );
}


export default AddRoom;

