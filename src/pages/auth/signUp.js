import React from "react";
import RegisterForm from "../components/registerForm/registerForm";
import NavBar from "../components/navbar/navBar"
const SignUp=()=>{
    return(
        <div className="mainStructure row">
          <div className="dynamic">
            <NavBar/>
          </div>
          <div className="static">
            <RegisterForm/>
          </div>
        </div>
    )
}

export default SignUp;