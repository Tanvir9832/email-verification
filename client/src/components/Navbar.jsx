import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material'
import {Link} from "react-router-dom"
import React from 'react'

const Navbar = () => {
  return (
    <AppBar position='sticky' sx={{bgcolor : '#ee6c4d' ,p : 2}}>
        <Toolbar sx={{display : "flex" ,justifyContent : "space-between"}}>
            <Stack to="/" sx={{textDecoration : "none", color :"white",fontSize : 30}} component={Link}>
                PSYCHOSOCIAL
            </Stack>
            <Box sx={{display : "flex" ,gap : 3, }}>
                <Typography sx={{textDecoration :"none" , color : "white"}} to="/profile" component={Link}>Profile</Typography>
                <Typography sx={{textDecoration :"none" , color : "white"}} to="/post" component={Link}>Post</Typography>
                <Typography sx={{textDecoration :"none" , color : "white"}} to="/setting" component={Link}>Setting</Typography>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar