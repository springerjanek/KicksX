import { useState } from "react";
import { useSelector } from "react-redux";
import { useDeleteBid, useEditBid } from "../../api/dashboard";
import { useFetch2 } from "../../hooks/useQuery";
import { PencilSquareIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import Navbar from "./Navbar";

const Buying = () => {
  const [showEditInput, setShowEditInput] = useState(false);
  const [editedPrice, setEditedPrice] = useState(150);
  const [showHistory, setShowHistory] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const uid = user.id;

  const { isLoading, data } = useFetch2(
    `http://localhost:3001/getUserData/${uid}`
  );

  const { mutate: editBid } = useEditBid();
  const { mutate: deleteBid } = useDeleteBid();

  const editHandler = (editPayload) => {
    editBid(editPayload);
    setShowEditInput(false);
  };

  return (
    <>
      <div className="ml-96">
        <div className="flex gap-20 text-xl mt-20 mb-5">
          <button onClick={() => setShowHistory(false)}>Bids</button>
          <button onClick={() => setShowHistory(true)}>History</button>
        </div>
        <div className="flex gap-10 text-xl mb-2">
          <p>Item</p>
          <p> Ask </p>
          <p>Price </p>
          <p>Highest Bid </p>
          <p>Lowest Ask</p> <p>Spread</p>
        </div>
        {!showHistory ? (
          <>
            {!isLoading && data.bids.length > 1 ? (
              data.bids.map((bid) => {
                const { id, name, price, size } = bid;
                const deletePayload = {
                  uid: uid,
                  id: id,
                  name: name,
                  price: price,
                  size: size,
                };

                const editPayload = {
                  uid: uid,
                  id: id,
                  name: name,
                  price: price,
                  editedPrice: editedPrice,
                  size: size,
                };
                const condition = id.length > 0;
                return (
                  <div key={id} className="flex gap-4">
                    {condition && (
                      <>
                        <h1>
                          {name} {size}, ${price}
                        </h1>
                        {!showEditInput && (
                          <>
                            <PencilSquareIcon
                              onClick={() => setShowEditInput(true)}
                              className="h-5 w-5 cursor-pointer"
                            />
                            <MinusCircleIcon
                              onClick={() => deleteBid(deletePayload)}
                              className="h-5 w-5 cursor-pointer"
                            />
                          </>
                        )}
                        {showEditInput && (
                          <>
                            <div className="flex">
                              <input
                                type="number"
                                value={editedPrice}
                                onChange={(e) => setEditedPrice(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              ></input>
                              <div className="flex flex-col">
                                <button
                                  onClick={() => editHandler(editPayload)}
                                >
                                  Save
                                </button>
                                <button onClick={() => setShowEditInput(false)}>
                                  Return
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <h1>--</h1>
            )}
          </>
        ) : (
          <>
            {!isLoading && data.purchases.length > 1 ? (
              data.purchases.map((purchase) => {
                const { id, name, price, size } = purchase;
                const condition = id.length > 0;
                return (
                  <div key={id}>
                    {condition && (
                      <>
                        <h1>
                          {name} {size}, ${price}
                        </h1>
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <h1>--</h1>
            )}
          </>
        )}
      </div>
      <Navbar />
    </>
  );
};

export default Buying;
