import React, { useEffect, useState } from 'react'
import { CryptoState } from './CryptoContext';
import axios from 'axios';
import { HistoricalChart } from './api';
import { borderColor, createTheme,ThemeProvider } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { CircularProgress } from '@mui/material';
import {Line} from 'react-chartjs-2'
import "chart.js/auto";
import { chartDays } from './ChartDays';
import SelectButton from './SelectButton';
const useStyles=makeStyles(()=>({
    container:{
    width:'90%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    marginTop:25,
    padding:40,
    marginLeft:'auto',
    marginRight:'auto',
    //  marginLeft:50,
    //  marginRight:50,


    
    
    }
    
    }))


function CoinInfo({coin}) {

const [historicalData,setHistoricalData]=useState();
const [days,setDays]=useState(1);

const {currency}=CryptoState();

const fetchHistoricalData=async ()=>{

    const {data} = await axios.get(HistoricalChart(coin.id,days,currency))

    setHistoricalData(data.prices);
}
console.log(historicalData);

useEffect(()=>{
fetchHistoricalData();
},[currency,days])

const darkTheme=createTheme({
    palette:{
        primary:{
            main:"#fff",
        },
        type:"dark",
    },
});


const classes=useStyles();
  return (
    
    <ThemeProvider theme={darkTheme}>
<div className={classes.container}>

    {
       !historicalData ? (
        <CircularProgress
        style={{color:'gold'}}
        size={250}
        thickness={1}
        >

        </CircularProgress>
       ):(<>
       <Line 
       data={{
        labels:historicalData.map((coin)=>{
            let date=new Date(coin[0]);
            let time=
            date.getHours() > 12
            ? `${date.getHours()-12}:${date.getMinutes()}PM`:
            `${date.getHours()}:${date.getMinutes()}AM`;

            return days=== 1 ? time : date.toLocaleDateString();

        }),
        datasets:[
           { data:historicalData.map((coin)=>{
                return (coin[1])
            }),
            label:`Price (past ${days}Days) in ${currency}`,
            borderColor:'#EEBC1D',
        }
        ]
       }}
       options={{
        elements:{
            point:{
                radius:1,
            }
        }
       }}
       />
       {/* <div
       style={{
        display:"flex",
        marginTop:20,
        justifyContent:"space-around",
        width:'100%'
       }}
       > */}
        {/* {chartDays.map(day=>(
            <SelectButton
            key={day.value}
            onClick={()=>setDays(day.value)}
            selected={day.value==days}
            >
                
                {day.label}
            </SelectButton>
        ))} */}
       {/* </div> */}
       </>)


    }

</div>

    </ThemeProvider>

  )
}

export default CoinInfo