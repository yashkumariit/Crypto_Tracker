import { makeStyles } from '@mui/styles'
import { display, height } from '@mui/system'
import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { CryptoState } from './CryptoContext' 
import { TrendingCoins } from './api'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom'
import { change_24 } from './api'
const useStyles=makeStyles(()=>({
carousel:{
    height:"50%",
    display:"flex",
    alignItems:"center",
    
},
carouselItem:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
}

}))

function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,"," );
}

function Carousel() {
    const classes=useStyles();

    const {currency,symbol,setCurrency}=CryptoState();
  const [trending,setTrending]=useState([]);
  const [displayData,setDisplayData]=useState({});

  const responsive={
    0:{
        items:2,
    },
    512:{
        items:4,
    }
  }

    const fetchTrendingCoins=async ()=>{
      
       const {data}= await axios.get(TrendingCoins(currency));
   

       

        setTrending(data);
    }
console.log(trending);



    useEffect(()=>{
      fetchTrendingCoins();

    },[currency])

    const items=trending.map((coin)=>{
 let profit=coin.price_change_percentage_24h_in_currency >=0 ;
        return (
            <Link
            className={classes.carouselItem} to={`/coins/${coin.id}`}
   style={{textDecoration:"none"}}
            >
                <img
                src={coin.image}
                alt={coin.name}
                height="80"
                style={{marginBottom:10}}
                >
                </img>
                <span style={{textDecoration:'none',textDecorationStyle:'none'}}>
                    {coin.symbol}
                    &nbsp; 
                    <span 
                    style={{
                        color:profit > 0 ? "rgb(14,203,129)":"red",
                        fontWeight:500,
                    }}
                    >
                    { profit && '+'} {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                    
                    {/* <span>

                    </span> */}
                </span>
                <span>{symbol} {numberWithCommas(coin.current_price.toFixed(2))}</span>
               
            
            </Link>
        )
    })

  return (
    <div className={classes.carousel}>
       <AliceCarousel
       mouseTracking
       infinite
       autoPlayInterval={1000}
       animationDuration={1500}
       disableDotsControls
       disableButtonsControls
       responsive={responsive}
       items={items}
       autoPlay


       />
        </div>
  )
}

export default Carousel