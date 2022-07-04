import React, { useEffect, useState } from "react";
import {useParams,useNavigate}from "react-router-dom";
import "./todoCreate.css";
import M from "materialize-css";
const CreateTodo=(coop)=>{
    const {todoBehavName}=useParams(); 

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");

    const [fbhid,setFbhid]=useState();
    useEffect(()=>{
        console.log(todoBehavName);
        fetch("/getBhaveId",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                bhave:todoBehavName
            })
        }).then(res=>res.json())
        .then(resu=>{
            console.log(resu);
            setFbhid(resu.result._id);
        })
    },[])
    const subMitSkl=()=>{
        fetch("/createtodos",{
            method:"POST",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"

            },
            body:JSON.stringify({
                title,
                description,
                behavName:todoBehavName,
                bhid:fbhid
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            if(result.err){
              M.toast({html:"Some Error occured",classes:"#ff1744 red accent-3"})
            }else{
              M.toast({html:"Created Successfully",classes:"#ff1744 green accent-3"})
            }
            window.location.reload();
        })
    }
    return(
        <div className="mainStr">
            <h4>{todoBehavName}</h4>
          <h5>Add Your Skill or Performance</h5>
          <div className="row">
          <div className="input-field col s11">
            {/* <i className="material-icons prefix">account_circle</i> */}
            <input id="icon_prefix" type="text" className="validate"onChange={(e)=>setTitle(e.target.value)}/>
            <label for="icon_prefix">Title</label>
           </div>
           </div>
           {/* <div class="row">
           <div className="input-field col s11">
            <i className="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" className="validate"/>
            <label for="icon_prefix">Description</label>
           </div>
           </div> */}

        <div class="row">
    {/* <form class="col s12"> */}
      <div class="row">
        <div class="input-field col s12">
          <textarea id="textarea1" class="materialize-textarea"onChange={(e)=>setDescription(e.target.value)}></textarea>
          <label for="textarea1">Description</label>
        </div>
      </div>
    {/* </form> */}
  </div>
  {/* <div class="row">
        <div class="input-field col s12">
          <textarea id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">Description</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">Description</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">Description</label>
        </div>
      </div> */}
       <button className="btn waves-effect waves-light" type="submit" name="action" onClick={()=>subMitSkl()}>Submit
            <i className="material-icons right">send</i>
        </button>
          </div>
        
    )
}

export default CreateTodo;