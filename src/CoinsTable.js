import React, { useEffect, useState } from 'react'
import { CoinList } from './api';
import axios from 'axios';
import { CryptoState } from './CryptoContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Container} from '@mui/system';
import {  LinearProgress, Pagination, TableBody, TableCell, TableContainer, TableHead, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import {Table,TableRow} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles=makeStyles(()=>({

row:{
    backgroundColor:'#16171a',
    cursor:'pointer',
    fontFamily:'Montserrat',
    "&:hover":{
        backgroundColor:"#131111"
    },
},
pagination:{
"& .MuiPaginationItem-root":{
    color:'gold'
}
}


}))


function CoinsTable() {
    const navigate=useNavigate();
const {currency,symbol}=CryptoState();
function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,"," );
}
    const [coins,setCoins]=useState([]);
    const [loading,setLoading]=useState(false);
    const [search,setSearch]=useState("");
    const [page,setPage]=useState(1);

    const fetchCoins=async (currency)=>{
        setLoading(true);
const {data}=await axios.get(CoinList(currency));

setCoins(data);
setLoading(false);
    }

  const handleSearch=()=>{
    return coins.filter((coin=>
      coin.name.toLowerCase().includes(search) ||
      coin.name.toLowerCase().includes(search)  
        ))
  }
  const classes=useStyles();


    useEffect(()=>{
     fetchCoins(currency);
    },[currency]);

const darkTheme=createTheme({
    palette:{
        primary:{
            main:'#fff',
        },
        type:"dark",
    },
});


  return (
   <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign:"center"}}>
  {/* <Typography 
  variant="h5"
  style={{margin:18 , fontFamily:"Montserrat"}}
  >
Cryptocurrency Prices by Market Cap
  </Typography> */}

  <TextField label="Search For a Crypto Currency.." 
  variant="filled"
  style={{
    marginBottom:20,
    marginTop:10,
    width:"100%",
    background:'white',
    borderRadius:10,
    outline:"black",border:"white",
    color:'black',
    "&::placeholder":{
        color:'black',
    }
    
 }}
  onChange={(e)=>setSearch(e.target.value)}
  ></TextField>

  <TableContainer>
{
 loading ?    
 (<LinearProgress style={{backgroundColor:"gold"}}></LinearProgress>):(
<Table>
    <TableHead style={{backgroundColor:'#EEBC1D',color:'white'}}>
<TableRow>
{["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
   
</TableRow>

    </TableHead>
    <TableBody>
{
    handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
        const profit=row.price_change_percentage_24h > 0 ;

        return (
            <TableRow 
            onClick={()=>navigate(`/coins/${row.id}`)}
            key={row.name}
            className={classes.row}
            >
                <TableCell
                component='th'
                scope='row'
                styles={{
                    display:'flex',
                    gap:15,
                }}
                >
                    <img
                    src={row.image}
                    alt={row.name}
                    height='50'
                    style={{marginBottom:10}}
                    >
                    </img>
                    <div 
                    style={{display:'flex',flexDirection:'column'}}
                    >
                        <span
                        style={{textTransform:'uppercase',
                        fontSize:22,
                        color:'white'
                    }}
                        >{row.symbol}</span>
                        <span
                        style={{color:'darkgrey'}}
                        >
                            {row.name}
                        </span>
                    </div>

                </TableCell>

<TableCell 
style={{
    color:'white',
   
}}
align='right'
>
    {symbol}{" "}
    {numberWithCommas(row.current_price.toFixed(2))}
</TableCell>

                <TableCell align='right'
                style={{
                    color:profit > 0 ? "rgb(14,203,129)":"red",
                    fontWeight:500,
                }}
                >
                    {profit && "+"}
                    {row.price_change_percentage_24h.toFixed(2)}%

                </TableCell>
                <TableCell
                style={{
                    color:'white'
                }}
                align='right'
                >
               {symbol}{" "}
                {numberWithCommas(row.market_cap.toString().slice(0,-6))}
           M
                </TableCell>


            </TableRow>
        )
    })
}
    </TableBody>
</Table>

 )
}

  </TableContainer>
 
 <Pagination
 count={((handleSearch().length)/10).toFixed(0)}
 style={{
    padding:20,
    width:'100%',
    display:'flex',
    justifyContent:'center',
 }}
 classes={{ul:classes.pagination}}
 onChange={(_,value)=>{
setPage(value)
window.scroll(0,350)

 }}
 >

 </Pagination>

    </Container>

   </ThemeProvider>
  )
}

export default CoinsTable