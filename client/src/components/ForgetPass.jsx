import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axios from '../Services/axiosInterceptor'

const ForgetPass = () => {
    const [data,setData] =useState('');

    const handleSubmit =async(e)=>{
      e.preventDefault();
      const emailData = {
        email : data
      }
      console.log(emailData);
        try {
          const res = await axios.post("/forgetPassword",emailData);
          console.log(res.data.message);
          alert(res.data.message);
        } catch (error) {
          console.log(error);
          alert(error.response.data.error);
        }
    }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
      <Box sx={{display : "flex",flexDirection : "column" ,gap : 2, justifyContent : "center" ,alignItems : "center" ,marginTop : "200px" }}>
          <Typography variant='h6'>Forget Password</Typography>
          <Typography variant='p'>Enter Your Email </Typography>
          <TextField label="Enter Email" type="email" name="email" onChange={(e)=>setData(e.target.value)} />
          <Button type="submit" variant="contained">Send Email</Button>
      </Box>
      </form>
    </Box>
  )
}

export default ForgetPass