export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
export const TrendingCoins=(currency)=>
 `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
// `https://api.coingecko.com/api/v3/search/trending`

export const change_24=(id,currency)=>
`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=false`

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

  export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
  