import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import axios from '../Services/axiosInterceptor'

const Settings = () => {
  const navigate = useNavigate();
  const [data,setData] =useState({newPass : "" ,confirmPass : ""});
  const {newPass , confirmPass} = data;


  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("changePassword",data,{
        headers : {
          authorization : `Bearer ${localStorage.getItem("token")}`
        }
      });
      alert(res.data.message);
      
    } catch (error) {
      console.log(error);
      console.log(error.response.data.error);
      alert(error.response.data.error);
    }

  }


  const logOut =()=>{
    localStorage.removeItem("token");
    navigate('/login');
  }
  return (
    <Box>
      <Navbar />
      <form onSubmit={handleSubmit}>
      <Box sx={{display : "flex",flexDirection : "column" ,gap : 2, justifyContent : "center" ,alignItems : "center" ,marginTop : "100px"}}>
          <Button sx={{bgcolor : "orange"}} onClick={logOut}> Log Out</Button>
          <Typography variant='h6'> Change Your Password</Typography>
          <TextField type="password" label="New Password" name="newPass" value={newPass} onChange={(e)=>setData({...data,[e.target.name] : e.target.value})} />
          <TextField type="password" label="Confirm Password" name="confirmPass" value={confirmPass} onChange={(e)=>setData({...data,[e.target.name] : e.target.value})} />
          <Button type="submit" variant="contained">Change</Button>
      </Box>
      </form>
    </Box>
  )
}

export default Settings