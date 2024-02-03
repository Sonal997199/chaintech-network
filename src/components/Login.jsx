import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

  const storedDetails = localStorage.getItem('user');

  useEffect(()=>{
    if(storedDetails === null){
        navigate('/register')
    }
  },[navigate,storedDetails]);

  const {email:storedEmail, password:storedPassword} = JSON.parse(storedDetails || '{}');

  const [checkDetails, setCheckDetails] = useState({email:'',password:''});

  // This funtion handle changes in the input fields
  const changeHandler = (e) => {
    const {name,value} = e.target;

    // Check user details based on the changed input
    setCheckDetails((prevData) => ({
        ...prevData,[name]:value
    }));
  };

  //This function handle submission of details
  const submitHandler = (e) => {
    e.preventDefault();

    //Check if the password and confirmPassword match
    if(storedEmail===checkDetails.email && storedPassword===checkDetails.password){

        //If match, navigate to the home page
        navigate('/');
    }
    else{
        //If not, reset input fields and navigate to login page
        navigate('/login');
    }
  };

  return (
    <div className='login-page rounded-4 border border-1 bg-body-tertiary mb-4'>
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
                <Link className="nav-link active" id="tab-login" data-mdb-toggle="pill" to="/login" role="tab"
                aria-controls="pills-login" aria-selected="true">Login</Link>
            </li>
            <li className="nav-item" role="presentation">
                <Link className="nav-link" id="tab-register" data-mdb-toggle="pill" to="/register" role="tab"
                aria-controls="pills-register" aria-selected="false">Register</Link>
            </li>
            </ul>

            <div className="tab-content">
            <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form onSubmit={submitHandler}>
                <div className="form-floating mb-4">
                    <input type="email" id="loginName" className="form-control" name="email" value={checkDetails.email} onChange={changeHandler} placeholder='Your Email' />
                    
                </div>

                <div className="form-floating mb-4">
                    <input type="password" id="loginPassword" className="form-control" name="password" value={checkDetails.password} onChange={changeHandler} placeholder='Password'/>
                    
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                </div>
                <div className="text-center">
                    <p>Not a member? <Link to="/register">Register</Link></p>
                </div>
                </form>
            </div>
            </div>
        </div>
  )
}

export default Login