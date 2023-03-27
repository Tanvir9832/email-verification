import React from 'react'
import Navbar from './Navbar';

import {Box} from '@mui/material';
const MainPage = () => {
  //#FCAB10
  //#2B9EB3
  //#DBD5B5
  return (
    <Box>
      <Navbar />
       <Box sx={{height : '200vh' , bgcolor : '#22223b' , display : 'flex' ,flexDirection : 'column' , justifyContent : 'space-between' ,}}>
         <Box sx={{height : '70vh' , bgcolor : '#2a9d8f' , borderRadius : '0px 0px 100px 100px'  }}>

         </Box>

         <Box sx={{height : '70vh' , bgcolor : '#2B9EB3' , borderRadius : '100px 100px 0px 0px' }}>

         </Box>
       </Box>
    </Box>
  )
}

export default MainPage