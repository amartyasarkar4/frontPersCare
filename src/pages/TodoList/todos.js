import React, { useEffect,useState } from "react";
import {useParams,useNavigate}from "react-router-dom";
import NavBar from "../components/navbar/navBar";
import Backdrop from "./modal/backdrop";
import CreateTodo from "./todoCreate";
import UpdateTodo from "./editDelete/editList";
import DeleteTodo from "./editDelete/deleteList";
import "./todos.css";
import M from "materialize-css";

const MTodo=()=>{
    const {todoBehavName}=useParams(); 
    const [createOpen,setCreateOpen]=useState(false);

    const [updateOpen,setUpdateOpen]=useState(false);
    const [updateTdId,setUpdateTdId]=useState();

    const [deleteOpen,setDeleteOpen]=useState(false);
    const [deleteTdId,setDeleteTdId]=useState();
    
    const [mTodos,setMTodos]=useState();
    useEffect(()=>{
        console.log(todoBehavName);
        fetch("/fetchtodos",{
            method:"POST",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                behavName:todoBehavName
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result);
            setMTodos(result)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    const openModali=()=>{
        setCreateOpen(!createOpen);
    }
    const reallyDel=(snTdid)=>{
        setDeleteTdId(snTdid);
        setDeleteOpen(!deleteOpen);
        
    }
    const SureDelete=()=>{
        console.log("sure delete button");
        console.log(deleteTdId);
        fetch("/deletetodos",{
            method:"POST",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                tdid:deleteTdId
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
    const openUpdali=(udTdId)=>{
        setUpdateTdId(udTdId);
        setUpdateOpen(!updateOpen);
    }
    return(
        <div>
             <NavBar/>
        <div className="Structure">
           
          <h2>{todoBehavName}</h2>
            <h5>Create New</h5>
            <a onClick={()=>openModali()}className="btn-floating btn-large waves-effect waves-light blue"><i className="material-icons">add</i></a>
          
            {createOpen?<div className="gg">
                    <Backdrop clickH={()=>openModali()}/>
                    <div className="oopn">
                        <CreateTodo/>
                    </div>
                </div>
                :null}
                {
                    deleteOpen?<div className="gg">
                    <Backdrop clickH={()=>reallyDel(0)}/>
                    <div className="oopn">
                        <DeleteTodo CancelD={()=>reallyDel(0)}SureD={()=>SureDelete()}/>
                    </div>
                </div>
                :null
                }

                {updateOpen?<div className="gg">
                    <Backdrop clickH={()=>openUpdali(0)}/>
                    <div className="oopn">
                        <UpdateTodo tdId={updateTdId}/>
                    </div>
                </div>
                :null}

                <div>
                    {mTodos?<div className="bandho">
                        <ul className="collection">
                        {mTodos.map(snTd=>{
                            return(
                            // <h2>{snTd.title}</h2><div class="row">
                            <li className="collection-item avatar">
                                <i className="material-icons circle green">insert_chart</i>
                                <span className="title">{snTd.title}</span>
                                <p>
                                    {snTd.Desc}
                                </p>
                                <a href="#!" className="secondary-content firstOn"onClick={()=>openUpdali(snTd._id)}><i className="material-icons yel">edit</i></a>
                                <a href="#!" className="secondary-content"onClick={()=>reallyDel(snTd._id)}><i className="material-icons del">delete_forever</i></a>
                            </li>
                            )
                        })}
                        </ul>
                    </div>:null}
                </div>
        </div>
        </div>
    )
}

export default MTodo;