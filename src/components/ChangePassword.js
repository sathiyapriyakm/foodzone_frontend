import {
    Typography,
    Button,
    
  } from '@mui/material'
  
  import React from 'react'
  import { useFormik } from 'formik'
  import * as Yup from "yup";
  
  import TextField from '@mui/material/TextField'
  import { useNavigate } from 'react-router-dom'
  import { API } from '../global';
  import { useState } from 'react';
  import { useParams } from 'react-router-dom';
  import { useEffect } from 'react';
  import {Link} from 'react-router-dom';
  import { ColorButton } from 'components/Login';

import "../App.css";
  
  
  export function ChangePassword() {
    const param = useParams();
    const id = param.id;
    const token = param.token;
    const[message,setMessage]=useState(null);
    // const entry=()=>navigate("/");
    const authDetail={id:id,token:token}
  
    const getApproval=(authDetail)=>{
      fetch(`${API}/user/verifyToken`,{
      method: "POST",
      body: JSON.stringify(authDetail),
      headers: {
        "Content-Type" : "application/json",
  
      },
    }).then((data)=>data.json())
    .then((data1)=>{
        if(data1.message==="Changing Password Approved"){
          setMessage("Approved");}
        else {
          setMessage(data1.message);
        }
    });}
    useEffect(()=>getApproval(authDetail),[]);
  
    return (message?((message==="Approved")?<SetNewPassword id={id}/>:<div style={{textAlign:"center",fontSize:"50px"}}>{`${message}`}</div>):<div><h1 style={{textAlign:"center",fontSize:"50px"}}>Loading....</h1></div>);
  }
  
  function SetNewPassword({id}){
  
    const navigate=useNavigate();
    const[errorMsg,setErrorMsg]=useState("");
  
    const changePassword =(newPassword) => {
      const newData={Password:newPassword.Password,id:id}
      fetch(`${API}/user/changePassword`,{
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type" : "application/json",
  
      },
    }).then((data)=>data.json())
    .then((data1)=>{
        if(data1.message==="Password updated successfully"){
          navigate("/")
        }else {
            setErrorMsg(data1.message);
        }
    });
    
  
    };
    const initialValues = {
      Password: '', 
      Password2:'' 
    }
    const userValidationSchema = Yup.object({
      Password: Yup.string().min(8),
      Password2: Yup.string().min(8).oneOf([Yup.ref('Password'), null], 'Passwords must match')
    })
    
    const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
      initialValues:initialValues,
      validationSchema:userValidationSchema ,
      onSubmit:(newPassword)=>{
        changePassword(newPassword);
      },
    });
    
    return (<div className="add-user-container" >
    <div className="wrapper" style={{
position: "relative",
textAlign: "center",
display: "inline-block"}}>
    <form  
    onSubmit={handleSubmit}
    className="add-user-form" >
      <Typography variant="h4" pb={2}
    sx={{
      textAlign: 'center',
    }}>
     <img 
          src="https://img.freepik.com/premium-vector/smiling-chef-cartoon-character_8250-10.jpg?w=740"
          style={{height:"80px",width:"80px", border:"1px solid black",borderRadius:"50%"}}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Hope Sans',
              fontWeight: 700,
              color: 'lightseagreen',
              textDecoration: 'none',
            }}
          >
            FoodZone
          </Typography>
    </Typography>
      
    <TextField
      className="add-user-name"
      label="New Password"
      type="password"
      value={values.Password} 
      name="Password"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.Password&&errors.Password?true:false}
      helperText={touched.Password&&errors.Password?errors.Password:""}
      />
      <TextField
      className="add-user-name"
      label="Confirm Password"
      type="password"
      value={values.Password2} 
      name="Password2"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.Password2&&errors.Password2?true:false}
      helperText={touched.Password2&&errors.Password2?errors.Password2:""}
      />
       <ColorButton className="add-user-btn" 
      type="submit"
      variant="contained">Change Password</ColorButton>
      <div className="text-center" style={{color:"red"}}>
    {errorMsg}
    </div>
      <div className="text-center" style={{color:"blue"}}>
      <Link to="/Register">Create  Account!</Link>
      <br/>
      <br/>
     <Link to="/Login">Login to your Account!</Link>
    </div>
   </form> 
   </div>
  </div>);
  }