import React from 'react'
import Box from '@mui/material/Box'
import { Button,TextField, Typography } from '@mui/material'
import{ Link, useNavigate} from "react-router-dom"
import { useState } from 'react'

import axios from '../Services/axiosInterceptor'

const SignUp = () => {
  const [data,setData] =useState({email : "",password : ""});
  const {email,password} = data;
  const navigate = useNavigate();

  
  const handleSubmit =async(e)=>{
      e.preventDefault();

      try {
        const res = await axios.post("login",data);
        console.log(res);
        alert(res.data.message);
        localStorage.setItem("token",res.data.token);
        navigate("/");
      } catch (error) {
        console.log(error);
        alert(error.response.data.error);
      }
  }
  return (
    <Box sx={{ width : "40vh", display : "flex", gap :2, borderRadius :2, flexDirection: "column", alignItems : "center", justifyContent : "center" , bgcolor : "#ccc", boxShadow :"10px 10px 10px #ccc", margin : "0px auto" , marginTop : "100px" , padding : 3}}>
        <Typography variant="h4">Log In</Typography>
        <form onSubmit={handleSubmit}>
        <Box sx={{display : "flex" ,flexDirection: "column",gap : 2 ,alignItems : "center",justifyContent : "center" ,margin : "auto 0"}}>
        
        <TextField name="email" value={email} onChange={(e)=>setData({...data , [e.target.name] : e.target.value})} sx={{bgcolor : "#fff"}} label="Email" type="email"/>
        <TextField name='password' value={password} onChange={(e)=>setData({...data , [e.target.name] : e.target.value})} sx={{bgcolor : "#fff"}} label="Password" type="password" />
        <Button variant="contained" sx={{fontSize : "1.1rem"}} type="submit">Log In</Button>

        </Box>
        </form>
        <Typography sx={{fontSize : "17px" ,textDecoration : "none"}} variant='p' to="/forgetPassword" component={Link}> Forgotten Password? </Typography>
        <Typography sx={{fontSize : "17px"}} variant='p'>Create an account , If you have not <Link style={{textDecoration : "none" ,color : "blue"}} to="/signin">Sign In</Link></Typography>
    </Box>
  )
}

export default SignUp