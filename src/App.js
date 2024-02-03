import Navbar from "./components/Navbar";
import React from "react";
import Login from "./components/Login";
import Registration from "./components/Registration";
import User from "./components/User";
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import './App.css';

function Root(props){
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Root />,
      children:[
        {
          path:'/',
          element:<User key={"home"} editable={false} />
        },
        {
          path:'/edit',
          element:<User key={"edit"} editable={true} />
        }
      ]
    },
    {
      path:'/login',
      element:<Login key={"login"} />
    },
    {
      path:'/register',
      element:<Registration key={"registration"} />
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
