import React,{useState,useContext} from "react";
import {Link,useNavigate}from "react-router-dom";

import {Usercontext}from "../../../App";
import "./loginForm.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const LoginForm=(props)=>{
    const{state,dispatch}=useContext(Usercontext);

    const [styleInput,setStyleInput]=useState("styleInput");
    const [typePassWord,setTypePassword]=useState(true);
    const [passType,setpassType]=useState("password")
    // const history=useHistory();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const [open, setOpen] = React.useState(false);
    const [msg, setMessage] = React.useState("");
    const [mseverity,setSeverity]=useState("error");

    const navigate=useNavigate();
    const signInData=()=>{
        console.log("enter");
        console.log(email);
        
        console.log(password);
        fetch("/psignIn",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"

            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                console.log(data.error);
                // <Snackbar
                //     open
                //     autoHideDuration={6000}
                //     message={data.error}
                //     action={
                //         <Button color="inherit" size="small">
                //         Undo
                //         </Button>
                //     }
                //     sx={{ bottom: { xs: 90, sm: 0 } }}
                // />
                setOpen(true);
                setMessage(data.error);
                setSeverity("error");
                // M.toast({html:data.error,classes:"#ff1744 red accent-3"})
            }else{
                // M.toast({html:data.message,classes:"#76ff03 light-green accent-3"});
                // console.log(data.user);
                // console.log(data.user._id);
                // console.log(data.token);
                
                console.log(data);
                setOpen(true);
                setMessage(data.message);
                setSeverity("success");
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("userId",data.user._id);
                dispatch({type:"USER",payload:data.user._id});
                navigate("/");
            }
        })
    }
    const focusInput=()=>{
        setStyleInput("styleFocus2")
    }
    const changeToseen=()=>{
        setTypePassword(!typePassWord);
        if(typePassWord){
            setpassType("text")
        }else{
            setpassType("password")
        }
    }

    const handleCloseErr = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    return(
        
          <div className="fullform">
           <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseErr}>
                <Alert onClose={handleCloseErr} severity={mseverity} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
           <div className="andar">
               <Card className="main"sx={{ maxWidth: 545}}>
                    <CardHeader
                        title="Login"
                        subheader="Get access to your Orders, Wishlist and Recommendations"
                    />
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AlternateEmailOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="input-with-sx"
                                label="Enter Your Email"
                                variant="standard"
                                onChange={(text)=>setEmail(text.target.value)}
                            />
                        </Box>
                        <br/>  
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <PasswordOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="input-with-sx"
                                label="Enter Your Password"
                                type={passType}
                                variant="standard"
                                onChange={(text)=>setPassword(text.target.value)}
                                InputProps={{
                                    endAdornment:(
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        // onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        >
                                        {typePassWord?< VisibilityOffOutlinedIcon onClick={()=>changeToseen()}/>:<VisibilityOutlinedIcon onClick={()=>changeToseen()} />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}    
                            />
                        </Box>
                        <br/>
                        <br/>
                        <Button variant="contained" color="success"onClick={()=>signInData()}>
                            LOGIN
                        </Button>
                    </CardContent>
                    <div>
                        <h6>OR</h6>
                   </div>
               
          
                   <div className="registerlink">
                        <Link to="/account/register"><h6>New to PersCare? Create an account</h6></Link>
                   </div>
                </Card>

                
            </div>

                   



            </div>
          
    )
}

export default LoginForm;