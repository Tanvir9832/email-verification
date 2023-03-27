import React,{useState} from 'react'
import Box from '@mui/material/Box'
import { Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import axios from '../Services/axiosInterceptor'

const SignIn = () => {
  const [data,setData] =useState({userName : "",email : "" ,password : ""});
  const {userName,email,password} = data;
  const navigate = useNavigate();
  const handleData =async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("signup",data);
      console.log(res);
      alert(res.data.message);
      navigate('/login');
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  return (
    <Box sx={{gap : 2, width : "40vh", display : "flex" ,borderRadius :2, flexDirection: "column", alignItems : "center", justifyContent : "center" , bgcolor : "#ccc", boxShadow :"10px 10px 10px #ccc",margin : "0px auto" ,marginTop : "100px" ,padding : 3}}>
        <Typography variant="h4">Sign In</Typography>

        <form onSubmit={handleData}>
          <Box sx={{display : "flex" ,flexDirection: "column",gap : 2 ,alignItems : "center",justifyContent : "center" ,margin : "auto 0"}}>
            <TextField onChange={(e)=>setData({...data , [e.target.name] : e.target.value})} value={userName} name="userName" sx={{bgcolor : "#fff"}} label="Username" type="text" />
            <TextField onChange={(e)=>setData({...data , [e.target.name] : e.target.value})} value={email} name="email" sx={{bgcolor : "#fff"}} label="Email" type="email"/>
            <TextField onChange={(e)=>setData({...data , [e.target.name] : e.target.value})} value={password} name="password" sx={{bgcolor : "#fff"}} label="Password" type="password" />
            <Button type="submit" variant="contained" sx={{fontSize : "1.1rem"}}>Sign In</Button>
          </Box>
        </form>
        
        
    </Box>
  )
}

export default SignIn