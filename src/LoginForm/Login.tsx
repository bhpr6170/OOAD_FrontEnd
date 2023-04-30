import { render } from '@testing-library/react';
import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import NavBar from '../NavBar/NavBar';

// https://hirukarunathilaka.medium.com/signup-form-with-real-time-validation-using-react-typescript-6a7dfb3122b5

export const Login  = (props:any) =>{
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
    console.log(JSON.stringify(resData)) ;
    let reqBody: any = resData;
 
    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(resData),
      mode: 'cors'
  });

  
    if(response.ok){
      if (await response.text() == "\"SUCCESS\"")
      {
        console.log("Login Successful");
        alert("Login Successful!");
        navigate('/searchAvailableRooms');
      }
      else{
        console.log("Login Failure");
        alert("Username or Password didn't match! Please try again");
        navigate('/');
      }
    } else {
      console.log("Login API call failed" + response.statusText);
      alert("Unable to fetch login Data /n Please try again later.");
      navigate('/');
    }  
  }

  return (
   
      <div className='wrapper'>
        <div className='form-wrapper'>
           <h2>Login</h2>
           
           <form onSubmit={handleSubmit} noValidate >
              <div className='email'>
                 <label htmlFor="email">Email</label>
                 <input type='email' name='email' onBlur={handleChange}/>
              </div>
              <div className='password'>
                 <label htmlFor="password">Password</label>
                 <input type='password' name='password' onBlur={handleChange}/>
              </div>              
              <div className='submit'>
                 <button>Login</button>
              </div>
              
         </form>
         <div className='newUser'>
                  <button color="secondary" onClick={event => window.location.href = '/signin'} >New User?</button>
        </div>
     </div>
     
  </div>
  );
}


export default Login;

