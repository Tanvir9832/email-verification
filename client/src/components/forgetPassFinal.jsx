import { Box, Button, TextField, Typography } from '@mui/material'
import React,{useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../Services/axiosInterceptor'

const ForgetPassFinal = () => {
  const navigate = useNavigate();
  const {id , token} =useParams();

    const [data,setData] = useState({newPassword : "" ,confirmPassword : "" });
    const {newPassword,confirmPassword} = data;

    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
          const res = await axios.post(`/forgetPassword/${id}/${token}`,data);
          alert(res.data.message);
          navigate('/login');
        } catch (error) {
          alert(error.response.data.error);
        }
        
    }
  return (
    <form onSubmit={handleSubmit}>
        <Box sx={{display : 'flex', flexDirection : "column" , justifyContent : 'center' ,alignItems : 'center' ,gap : 3}}>
        <Typography variant='h4'>Put New Password</Typography>
        <TextField type="password" label='New Password' name='newPassword' value={newPassword} onChange={(e)=>setData({...data ,[e.target.name] : e.target.value})} />
        <TextField type="password" label='Confirm Password' name='confirmPassword' value={confirmPassword} onChange={(e)=>setData({...data , [e.target.name] : e.target.value})} />
        <Button type="submit">Update</Button>
        </Box>
    </form>
  )
}

export default ForgetPassFinal