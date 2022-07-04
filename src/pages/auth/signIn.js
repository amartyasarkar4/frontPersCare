import React from "react";
import LoginFrom from "../components/loginForm/LoginForm";
import NavBar from "../components/navbar/navBar"
const SignIn=()=>{
    return(
       <div className="mainStructure row">
          <div className="dynamic">
            <NavBar/>
          </div>
          <div className="static">
            <LoginFrom/>
          </div>
        </div>
    )
}

export default SignIn;