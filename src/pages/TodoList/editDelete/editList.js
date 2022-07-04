import React, { useEffect, useState } from "react";
import {useParams,useNavigate}from "react-router-dom";
import "./edidl.css";
import M from "materialize-css";
const UpdateTodo=(coop)=>{
    const {todoBehavName}=useParams(); 

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");

    const [fbhid,setFbhid]=useState();
    useEffect(()=>{
        console.log(todoBehavName);
        fetch("/fetchTDbyId",{
            method:"POST",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                tdid:coop.tdId
            })
        }).then(res=>res.json())
        .then(resu=>{
            console.log(resu);
            setFbhid(resu.ftd._id);
            setTitle(resu.ftd.title);
            setDescription(resu.ftd.Desc);
        })
    },[])
    const subMitUpdtSkl=()=>{
        console.log("Updating id:");
        console.log(coop.tdId);
        fetch("/updatetodos",{
            method:"POST",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"

            },
            body:JSON.stringify({
                tdid:coop.tdId,
                title,
                description,       
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            if(result.error){
              M.toast({html:result.error,classes:"#ff1744 red accent-3"})
            }else{
              M.toast({html:result.success,classes:"#ff1744 green accent-3"})
            }
            window.location.reload();
        })
    }
    return(
        <div className="mainStr">
            <h4>{todoBehavName}</h4>
          <h5>Update Your Skill or Performance</h5>
          <div className="row">
          <div className="input-field col s11">
            {/* <i className="material-icons prefix">account_circle</i> */}
            <input id="icon_prefix" type="text" className="validate"onChange={(e)=>setTitle(e.target.value)}value={title}/>
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
          <textarea id="textarea1" class="materialize-textarea"onChange={(e)=>setDescription(e.target.value)}value={description}></textarea>
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
       <button className="btn waves-effect waves-light orange" type="submit" name="action" onClick={()=>subMitUpdtSkl()}>Update
            <i className="material-icons right">update</i>
        </button>
          </div>
        
    )
}

export default UpdateTodo;