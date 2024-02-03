import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const User = ({editable}) => {

  // Initialize the navigate function from React Router
  const navigate = useNavigate();

  // Getting user details from local storage
  const storedDetails = localStorage.getItem('user');

  // Using state to hold user details with initial values
  const [userDetails,setUserDetails] = useState({
    firstName:'',
    lastName:'',
    userName:'',
    email:'',
    password:'',
    confirmPassword:'',
  });

  useEffect(()=>{
    if(storedDetails!==null){
        setUserDetails(JSON.parse(storedDetails));
    }
    else{
        navigate('/register');
    }
  },[storedDetails,navigate]);

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

        //Navigate to the home page
        navigate('/');
    }
    else{
        //If the passwords do not match, it navigate to the edit details page
        navigate('/edit');
    }
  };

  return (
    <div className='registration-page rounded-4 border border-2 bg-body-tertiary w-75 mx-auto px-5 my-4 py-3'>
        {editable ? <h2 className='mb-4 text-center'>Edit Profile</h2> : <h2 className='mb-4 text-center'>Profile</h2>}
        <div className="tab-pane" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
        <form onSubmit={submitHandler}>
            <div className="form-floating mb-4">
            <input readOnly={!editable} type="text" id="firstName" className="form-control" placeholder='First Name' name='firstName' onChange={changeHandler} value={userDetails.firstName} />
            
            </div>
            <div className="form-floating mb-4">
            <input readOnly={!editable} type="text" id="lastName" className="form-control" placeholder='Last Name' name='lastName' onChange={changeHandler} value={userDetails.lastName} />
            
            </div>

            <div className="form-floating mb-4">
            <input readOnly={!editable} type="text" id="registerUsername" className="form-control" name='userName' placeholder='Username' 
            onChange={changeHandler} value={userDetails.userName} />
            
            </div>

            <div className="form-floating mb-4">
            <input readOnly={!editable} type="email" id="registerEmail" className="form-control" name='email' onChange={changeHandler} value={userDetails.email} placeholder="Your Email"/>
            
            </div>


            <div className="form-floating mb-4">
            <input readOnly={!editable} type="password" id="registerPassword" className="form-control" name='password' onChange={changeHandler} value={userDetails.password} placeholder='Password'/>
            
            </div>

            {editable && 
            <div className="form-floating mb-4">
              <input readOnly={!editable} type="password" id="registerRepeatPassword" className="form-control" onChange={changeHandler} value={userDetails.confirmPassword} name='confirmPassword' placeholder='Confirm Password' />
            </div>}
            <div className="text-center">
            {editable ? <button type="submit" className="btn btn-primary btn-block mb-4">Save</button> :
                        <Link to={'/edit'} className="btn btn-primary btn-block mb-4">Update</Link>
            }
            </div>
        </form>
        </div>
    </div>
  )
}

export default User