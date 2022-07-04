import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar/navBar"
import {useNavigate}from "react-router-dom";

import {connect }from "react-redux";
import * as ActionCreators from "../../store/action"
import M from "materialize-css";
import "./hompage.css"
const Home=(props)=>{
    const[me,setMe]=useState();
    const[behaves,setBehaves]=useState();

    const navigate=useNavigate();
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
        // setTimeout(()=>{
        //     console.log(props.behavs);
        //     setBehaves(props.behavs);
        //     setTimeout(()=>{
        //         console.log(behaves);
        //     },"1300")
        // },"1200");
        fetch("/allBehaves",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"

            }
        }).then(resm=>resm.json())
        .then(mbehave=>{
            console.log(mbehave.categs);
            setBehaves(mbehave.categs);
            console.log(behaves);
        })
        
        // props.onFetch();
    },[])
    // const list=[...props.behavs];
    const goto=(sng)=>{
        console.log(sng.behavName);
       if(me){
        navigate(`/mtodo/${sng.behavName}`);
       }else{
        M.toast({html:"You Must Be Login",classes:"#ff1744 red accent-3"})
        navigate(`/account/signIn`);
        }
    }
    return(
        <div>
            <NavBar/>
            <p>{me?me.name?me.name:"amartya":"amartya"}</p>
            {/* <h2>{props.behavs?props.behavs[0].behavName:"hello"}</h2> */}
            {/* <h2>{props.behavs?props.behavs[0].behavName:"hello"}</h2> */}
            {/* <h2>{behaves?behaves[0]?behaves[1].behavName:"kalu":null}</h2>
            <h2>{behaves?behaves[0]?behaves[2].behavName:"kalu":null}</h2>
            <h2>{behaves?behaves[0]?behaves[3].behavName:"kalu":null}</h2>
            <h2>{behaves?behaves[0]?behaves[4].behavName:"kalu":null}</h2> */}
            <div>
                
        <div className="row allHere">{
            behaves?behaves[0]?
            behaves.map(sng=>{
                return(
                    <div className="col s4 m3 maindiv" onClick={()=>goto(sng)}>
                    <div className="card">
                        <div className="card-image">
                        <img className="photoBehav"src={sng.photo}/>
                        <span className="card-title">{sng.behavName}</span>
                        
                        </div>
                        
                    </div>
                    </div>
                )
                
            })

            :<h2>VUL HOE</h2>:null
}
</div>
</div>
        </div>
    )
}
let mapStateToProps=(state)=>{
    return{
        bahavs:state.FetchBehavReducer.allBehaviors
    }
    

}
const mapDispatchToProps=(dispatch)=>{
    return{
        // onFetch:()=>dispatch(ActionCreators.FetchBehav())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);