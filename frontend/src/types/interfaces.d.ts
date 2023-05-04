interface Product {
  id: number;
  name: string;
  thumbnail: string;
  releasedate: string;
  asks: { id: string; size: string; price: number }[];
  bids: { id: string; size: string; price: number }[];
  lastsales: { id: string; size: string; price: number; date: string }[];
  sizes: string[];
}

interface Products extends Array<Product> {}

interface ModifiedProductData {
  asksBySize: {
    size: string;
    asks: number[];
  }[];
  bidsBySize: {
    size: string;
    bids: number[];
  }[];
  lowestAsk: number;
  highestBid: number;
}

interface ProductData extends ModifiedProductData {}

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

interface SettingsData {
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

interface AuthForm {
  email: string;
  password: string;
  remember?: boolean;
}

interface PasswordActionsForm {
  password?: string;
  code?: string;
  email?: string;
}

interface EditShippingForm {
  name: string;
  surname: string;
  address: string;
  streetNumber: string;
  city: string;
  zipcode: string;
  country: { label: string };
  phone: string;
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

interface QueryAsksData {
  userAsks: UserAsks;
  userData: UserData;
}

interface DeleteBid {
  uid: string;
  id: string;
  name: string;
  price: number;
  size: string;
  thumbnail: string;
}

interface DeleteAsk extends DeleteBid {}

interface LocationState {
  bid?: boolean;
  size?: string;
  lowestAsk?: number;
  bids?: { size: string; bids: number[] }[];
}
