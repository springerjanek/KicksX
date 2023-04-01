interface Product {
  id: number;
  name: string;
  thumbnail: string;
  releasedate: string;
  asks: Array<{ id: string; size: string; price: number }>;
  bids: Array<{ id: string; size: string; price: number }>;
  lastsales: Array<{ id: string; size: string; price: number }>;
  sizes: string[];
}

interface Products extends Array<Product> {}

interface UserData {
  asks: {
    id: string;
    name: string;
    price: number;
    size: string;
    thumbnail: string;
  }[];
  bids: {
    id: string;
    name: string;
    price: number;
    size: string;
    thumbnail: string;
  }[];
  sales: {
    id: string;
    date: string;
    name: string;
    price: number;
    size: string;
    thumbnail: string;
  }[];
  purchases: {
    id: string;
    date: string;
    name: string;
    price: number;
    size: string;
    thumbnail: string;
  }[];
  shipping: {
    name: string;
    surname: string;
    street: string;
    street_number: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
  };
  payout: {
    type: string;
  };
  payment: {
    type: string;
  };
}

interface UserBidA {
  id: string;
  name: string;
  price: number;
  size: string;
  thumbnail: string;
}

interface UserBidsA extends Array<UserBidA> {}

interface UserBidB {
  lowestAsk: number;
  highestBid: number;
  id: string;
  name: string;
  price: number;
  size: string;
  thumbnail: string;
}

interface UserBidsB extends Array<UserBidB> {}

type UserBids = UserBidsA | UserBidsB;

interface QueryBidsData {
  userBids: UserBids;
  userData: UserData;
}

interface UserAskA {
  id: string;
  name: string;
  price: number;
  size: string;
  thumbnail: string;
}

interface UserAsksA extends Array<UserAskA> {}

interface UserAskB {
  lowestAsk: number;
  highestBid: number;
  id: string;
  name: string;
  price: number;
  size: string;
  thumbnail: string;
}

interface UserAsksB extends Array<UserAskB> {}

type UserAsks = UserAsksA | UserAsksB;

interface QueryAsksData {
  userAsks: UserAsks;
  userData: UserData;
}

interface DeleteBid {
  uid: string;
  id: string;
  name: string;
  price: string;
  size: string;
  thumbnail: string;
}

interface DeleteAsk extends DeleteBid {}
