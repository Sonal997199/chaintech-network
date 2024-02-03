import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Registration = () => {
  const navigate = useNavigate();
  
  const [userDetails,setUserDetails] = useState({
    firstName:'',
    lastName:'',
    userName:'',
    email:'',
    password:'',
    confirmPassword:'',
  });

  // This funtion handle changes in the input fields
  const changeHandler = (e) => {
    const {name,value} = e.target;

    // Update user details based on the changed input
    setUserDetails((prevData) => ({
        ...prevData,[name]:value
    }));
  };
  
  //This function handle submission of details
  const submitHandler = (e) => {
    e.preventDefault();

    //Check if the password and confirmPassword match
    if(userDetails.password===userDetails.confirmPassword){
        //Store user details in local storage
        localStorage.setItem('user',JSON.stringify(userDetails));

        //Navigate to the home page on successful registration
        navigate('/');
    }
    else{
        //Reset user details and naviagate back to the registration page if passwords don't match
        
        setUserDetails({
           firstName:'',
           lastName:'',
           userName:'',
           email:'',
           password:'',
           confirmPassword:'',
        })
        navigate('/register');
    }
  };


  return (
    <div className='registration-page rounded-4 border border-1 bg-body-tertiary mb-4'>
    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
      <li className="nav-item" role="presentation">
          <Link className="nav-link" id="tab-login" data-mdb-toggle="pill" to="/login" role="tab"
          aria-controls="pills-login" aria-selected="false">Login</Link>
      </li>
      <li className="nav-item" role="presentation">
          <Link className="nav-link active" id="tab-register" data-mdb-toggle="pill" to="/register" role="tab"
          aria-controls="pills-register" aria-selected="true">Register</Link>
      </li>
    </ul>
    <div className="tab-pane" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
      <form onSubmit={submitHandler} >
        <div className="form-floating mb-4">
          <input type="text" id="firstName" className="form-control" name='firstName' value={userDetails.firstName} 
          onChange={changeHandler} placeholder='First Name' />
          
        </div>
        <div className="form-floating mb-4">
          <input type="text" id="lastName" className="form-control" name='lastName' value={userDetails.lastName} 
          onChange={changeHandler}
          placeholder='Last Name' />
          
        </div>

        <div className="form-floating mb-4">
          <input type="text" id="registerUsername" className="form-control" name='userName' value={userDetails.userName} 
          onChange={changeHandler}
          placeholder='Username' />
          
        </div>

        <div className="form-floating mb-4">
          <input type="email" id="registerEmail" className="form-control" name='email' value={userDetails.email} 
          onChange={changeHandler}
          placeholder="Your Email"/>
          
        </div>

        <div className="form-floating mb-4">
          <input type="password" id="registerPassword" className="form-control" name='password' value={userDetails.password}
          onChange={changeHandler} placeholder='Password'/>
          
        </div>

        <div className="form-floating mb-4">
          <input type="password" id="registerRepeatPassword" className="form-control" name='confirmPassword' value={userDetails.confirmPassword} 
          onChange={changeHandler}
          placeholder='Confirm Password' />
          
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Registration