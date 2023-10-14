import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { Container, textTransform } from '@mui/system';
import React from 'react'
import Carousel from './Carousel';
import Image from './crypto_logo.jpg';

const useStyles=makeStyles(()=>({
banner:{
    backgroundImage:`url(${Image})`
},
bannerContent:{
    height:350,
    display:"flex",
    flexDirection:"column",
    paddingTop:25,
    justifyContent:"space-around",
},
tagline:{
   display:"flex",
   height:'35%',
   flexDirection:"column",
   justifyContent:'center',
   textAlign:'center', 
}

}))

function Banner() {

    const classes=useStyles();

  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
    <div className={classes.tagline}>
        <Typography variant="h2"
        style={{
            color:"darkgray",
            textTransform:"capitalize",
            fontFamily:"Montserrat",
        }}
        >
      Crypto Hunter
        </Typography>
        <Typography 
        variant='subtitle2'
        style={{
            color:'darkgray',
            textTransform:'capitalize',
            fontFamily:'Montserrat',
        }}
        >
            Get all the Info regarding your favorite Crypto Currency
        </Typography>
    </div>
    <Carousel/>
        </Container>
    </div>
  )
}

export default Banner