import React from "react";

export const PurchaseHistory = ({ userData }: { userData: UserData }) => {
  return (
    <>
      {userData.purchases.length > 1 ? (
        userData.purchases.map((purchase) => {
          const { id, name, price, size, thumbnail } = purchase;
          return (
            <>
              {id.length > 0 && (
                <div key={id} className="flex gap-4">
                  <img src={thumbnail} className="w-24 h-20" />
                  <div className="flex flex-col">
                    <p> {name}</p>

                    <p> Size: {size}</p>
                  </div>
                  <p className="sm:mr-14">${price}</p>
                </div>
              )}
            </>
          );
        })
      ) : (
        <p>--</p>
      )}
    </>
  );
};
