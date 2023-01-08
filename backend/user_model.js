const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

var serviceAccount = require("./firebase.json");

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  port: process.env.POSTGRES_DB_PORT,
});

const createUserData = (uid) => {
  return new Promise(function (resolve, reject) {
    db.collection("users")
      .doc(uid)
      .set({
        asks: FieldValue.arrayUnion({
          id: "",
          name: "",
          price: null,
          size: "",
        }),
        bids: FieldValue.arrayUnion({
          id: "",
          name: "",
          price: null,
          size: "",
        }),
        sales: FieldValue.arrayUnion({
          id: "",
          name: "",
          price: null,
          size: "",
        }),
        purchases: FieldValue.arrayUnion({
          id: "",
          name: "",
          price: null,
          size: "",
        }),
        shipping: {
          name: "",
          surname: "",
          street: "",
          street_number: "",
          city: "",
          zip: "",
          country: "",
          phone: "",
        },
        payout: {
          type: "",
        },
        payment: {
          type: "",
        },
      })

      .then(() => {
        resolve("Successfully set user Data!");
      })
      .catch((error) => {
        reject("Error setting user data: ", error);
      });
  });
};

const setUserAsk = (payload) => {
  return new Promise(function (resolve, reject) {
    db.collection("users")
      .doc(payload.uid)
      .update({
        asks: FieldValue.arrayUnion({
          id: payload.id,
          name: payload.name,
          price: payload.price,
          size: payload.size,
        }),
      });
    pool
      .query(
        `UPDATE shoes SET asks = asks || '{"id": "${payload.id}", "size": "${payload.size}", "price": ${payload.price}}' ::jsonb WHERE name='${payload.name}'`
      )
      .then(() => {
        resolve("Successfully set ask!");
      })
      .catch((error) => {
        reject("Error setting ask: ", error);
        console.log(error);
      });
  });
};

const setUserBid = (payload) => {
  return new Promise(function (resolve, reject) {
    db.collection("users")
      .doc(payload.uid)
      .update({
        bids: FieldValue.arrayUnion({
          id: payload.id,
          name: payload.name,
          price: payload.price,
          size: payload.size,
        }),
      });
    pool
      .query(
        `UPDATE shoes SET bids = bids || '{"id": "${payload.id}", "size": "${payload.size}", "price": ${payload.price}}' ::jsonb WHERE name='${payload.name}'`
      )
      .then(() => {
        resolve("Successfully set bid!");
      })
      .catch((error) => {
        reject("Error setting bid: ", error);
      });
  });
};

const setUserPurchases = (payload) => {
  return new Promise(function (resolve, reject) {
    db.collection("users")
      .doc(payload.uid)
      .update({
        purchases: FieldValue.arrayUnion({
          id: payload.id,
          name: payload.name,
          price: payload.price,
          size: payload.size,
        }),
      });
    pool.query(
      `UPDATE shoes SET asks = asks - Cast((SELECT position - 1 FROM shoes, jsonb_array_elements(asks) with ordinality arr(item_object, position) WHERE name='${payload.name}' and item_object->>'price' = '${payload.price}') as int) WHERE name='${payload.name}'`
    );
    pool
      .query(
        `UPDATE shoes SET lastsales = lastsales || '{"id": "${payload.id}", "size": "${payload.size}", "price": ${payload.price}}' ::jsonb WHERE name='${payload.name}'`
      )
      .then(() => {
        resolve("Successfull Buy!");
      })
      .catch((error) => {
        reject("Error Buying: ", error);
      });
  });
};

const setUserSales = (payload) => {
  return new Promise(function (resolve, reject) {
    db.collection("users")
      .doc(payload.uid)
      .update({
        sales: FieldValue.arrayUnion({
          id: payload.id,
          name: payload.name,
          price: payload.price,
          size: payload.size,
        }),
      });
    pool.query(
      `UPDATE shoes SET bids = bids - Cast((SELECT position - 1 FROM shoes, jsonb_array_elements(bids) with ordinality arr(item_object, position) WHERE name='${payload.name}' and item_object->>'price' = '${payload.price}') as int) WHERE name='${payload.name}'`
    );
    //add to last sales
    pool
      .query(
        `UPDATE shoes SET lastsales = lastsales || '{"id": "${payload.id}", "size": "${payload.size}", "price": ${payload.price}}' ::jsonb WHERE name='${payload.name}'`
      )
      .then(() => {
        resolve("Successfully SOLD!");
      })
      .catch((error) => {
        reject("Error selling: ", error);
        console.log(error);
      });
  });
};

const setUserShipping = (payload) => {
  return new Promise(function (resolve, reject) {
    db.collection("users")
      .doc(payload.uid)
      .update({
        shipping: {
          name: payload.name,
          surname: payload.surname,
          street: payload.street,
          street_number: payload.street_number,
          city: payload.city,
          zip: payload.zip,
          country: payload.country,
          phone: payload.phone,
        },
      })
      .then(() => {
        resolve("Successfully set shipping!");
      })
      .catch((error) => {
        console.log(error);
        reject("Error setting shipping: ", error);
      });
  });
};

const setUserPayout = (payload) => {
  return new Promise(function (resolve, reject) {
    db.collection("users")
      .doc(payload.uid)
      .update({
        payout: {
          type: payload.payout,
        },
      })
      .then(() => {
        resolve("Successfully set payout!");
      })
      .catch((error) => {
        reject("Error setting payout: ", error);
      });
  });
};

const setUserPayment = (payload) => {
  return new Promise(function (resolve, reject) {
    db.collection("users")
      .doc(payload.uid)
      .update({
        payment: {
          type: payload.payment,
        },
      })
      .then(() => {
        resolve("Successfully set payout!");
      })
      .catch((error) => {
        reject("Error setting payout: ", error);
      });
  });
};

const getUserData = (params) => {
  return new Promise(function (resolve, reject) {
    db.collection("users")
      .doc(params)
      .get()
      .then((doc) => {
        resolve(doc.data());
      })
      .catch((error) => {
        reject("Error getting user data: ", error);
      });
  });
};

module.exports = {
  createUserData,
  setUserAsk,
  setUserBid,
  setUserPurchases,
  setUserSales,
  setUserShipping,
  setUserPayout,
  setUserPayment,
  getUserData,
};
