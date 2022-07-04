import React, { useEffect, useState } from "react";
import {useParams,useNavigate}from "react-router-dom";
import "./edidl.css";
import M from "materialize-css";
const DeleteTodo=(coop)=>{
    const {todoBehavName}=useParams(); 

    
    return(
        <div className="mainStr">
            <h4>{todoBehavName}</h4>
            <h5>Do You really want to Delete</h5>
          
            <button className="btn waves-effect waves-light cancB" type="submit" name="action" 
                onClick={coop.CancelD}
                >Cancel
                <i className="material-icons right">cancel</i>
            </button>
            <button className="btn waves-effect waves-light delB" type="submit" name="action"
                onClick={coop.SureD}
                >Sure
                <i className="material-icons right">delete</i>
            </button>
        </div>
        
    )
}

export default DeleteTodo;