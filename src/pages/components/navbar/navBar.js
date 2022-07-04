import React, { useEffect, useState,useContext } from "react";
import "./navbar.css";
import {Usercontext}from "../../../App";
import {Link, useNavigate}from "react-router-dom"
const NavBar=()=>{
    const{state,dispatch}=useContext(Usercontext);
    const navigate=useNavigate();

    const[me,setMe]=useState();

    useEffect(()=>{
        fetch("/profile",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            setMe(result[0]);
            console.log(me);
        })
    },[])


    const RenderList=()=>{
        if(state && me){
            return[
                <li key="1">WelCome , {me.name?me.name:"pratik"}</li>,
                // <li key="2"><Link to="/profile/me">Profile</Link></li>,
                <li key="3"><button  className="logout-btn"onClick={()=>Logout()}>Log Out</button></li>
            ]
        }else{
            return[
                <li key="4"><Link to="/account/signIn">Log In</Link></li>,
                <li key="5"><Link to="/account/register">Register</Link></li>
            ]
        }
    }
    const Logout=()=>{
        localStorage.removeItem("jwt");
        localStorage.removeItem("userId");
        navigate("/account/signIn");
        dispatch({type:""});
       
    }
    return(
        <nav>
            <div className="nav-wrapper">
                <Link to={state?"/":"/account/signIn"}className="Left brand-logo">PersCare</Link>
                <ul id="nav-mobile" className="right">
                    {RenderList()}
             
                </ul>
            </div>
            
        </nav>
    )
}

export default NavBar;