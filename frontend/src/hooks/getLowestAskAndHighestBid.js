export const getLowestAskAndHighestBid = (product) => {
  let asks = [];
  let bids = [];
  let asksPrices = [];
  let bidsPrices = [];

  for (let i = 0; i < product.asks.length; i++) {
    asks.push(product.asks[i]);
  }

  for (let i = 0; i < product.bids.length; i++) {
    bids.push(product.bids[i]);
  }

  asks.forEach((element) => {
    asksPrices.push(element.price);
  });

  bids.forEach((element) => {
    bidsPrices.push(element.price);
  });
  const lowestAsk = Math.min(...asksPrices);
  const highestBid = Math.max(...bidsPrices);

  console.log(lowestAsk);

  return [lowestAsk, highestBid];
};
