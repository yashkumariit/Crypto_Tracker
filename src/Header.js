import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Container } from '@mui/system';
// import MenuIcon from '@mui/icons-material/Menu';
import Select from '@mui/material/Select';
import {  createTheme, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CryptoState } from './CryptoContext';

const useStyles=makeStyles((theme)=>({
    title:{
        flex:1,
        color:"gold",
        fontFamily:"Montserrat",
        fontWeight:"bold",
        cursor:"pointer",
    },
   
}))

function Header() {
    const {currency,symbol,setCurrency}=CryptoState();
    const navigate=useNavigate();
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        }
    });

const classes=useStyles()
    
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position="static" >
 <Container>
<Toolbar>
    <Typography className={classes.title} onClick={()=>navigate('/')} 
                 variant="h5"    
>
        Crypto Hunter
    </Typography>
    <Select 
    variant='outlined'
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={currency}
    onChange={(e)=>setCurrency(e.target.value)}
style={{width:100,
        height:40,
        marginRight:15,
        color:'white',
        backgroundColor:'gold',
        fontWeight:"bold"
}}
className={classes.select}

>
<MenuItem value={"USD"} >USD</MenuItem>
<MenuItem value={"INR"}>INR</MenuItem>
</Select>
</Toolbar>

 </Container>


    </AppBar>
    </ThemeProvider>
  )
}

export default Header