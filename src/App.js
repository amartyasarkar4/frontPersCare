import React,{useContext,createContext,useEffect,useReducer}from "react";
import {BrowserRouter,Route,Routes}from 'react-router-dom';
import {reducer,initialState}from "./reducer/userReducer";

import {connect }from "react-redux";

import Home from "./pages/home/homePage";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";

import NavBar from "./pages/components/navbar/navBar"

import MTodo from "./pages/TodoList/todos";
import CreateTodo from "./pages/TodoList/todoCreate";

import './App.css';
import * as ActionCreators from "./store/action"


export const Usercontext=createContext();
var Routing=()=>{
  const{state,dispatch}=useContext(Usercontext);
  useEffect(()=>{
    const userId=localStorage.getItem("userId");
    if(userId){
      dispatch({type:"USER",payload:userId})
    }
  },[])
  return(
    <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path="/account/signIn"element={<SignIn/>}/>
        <Route path="/account/register"element={<SignUp/>}/>
        <Route path="/mtodo/:todoBehavName"element={<MTodo/>}/>
       
      </Routes>
  )
}

function App(props) {
  const [state,dispatch]=useReducer(reducer,initialState)
  useEffect(()=>{
    props.onFetch();
  },[]);
  return (
    <Usercontext.Provider value={{state,dispatch}}>
         <div className="App">
          {/* <NavBar/> */}
        <BrowserRouter>
            <Routing/>
        </BrowserRouter>
        </div>
    </Usercontext.Provider>
    
  );
}
const mapStateToProps=(state)=>{
  return{
    user:state.FetchBehavReducer
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onFetch:()=>dispatch(ActionCreators.FetchBehav())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
